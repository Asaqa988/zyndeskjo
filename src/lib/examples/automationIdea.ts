/**
 * Turns "I'm an accountant" into one automation that person could actually
 * build, named in the tools the course teaches.
 *
 * This is the demo's whole argument. A room of five hundred people has five
 * hundred different jobs, and the question none of them say out loud is "yes
 * but what would *I* automate?". A generic answer loses them; a specific one
 * about their own week does not.
 */

const OPENAI_BASE = 'https://api.openai.com/v1';
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-5.4-mini';

/** Fixed so the live wall can total them. The model picks one, never invents. */
export const CATEGORIES = [
  'موظف',
  'صاحب مشروع',
  'طالب',
  'فريلانسر',
  'مبيعات وتسويق',
  'تقني',
  'أخرى',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Idea {
  /** What they said they do, trimmed — shown on the wall, never their name. */
  job: string;
  category: Category;
  /** A short name for the automation, e.g. "فواتير الإيميل إلى شيت". */
  title: string;
  /** Three steps, each a single line. */
  steps: string[];
  /** The tools it would be built from, n8n first. */
  tools: string[];
}

const SYSTEM = `أنت مساعد في محاضرة تعريفية عن الأتمتة والذكاء الاصطناعي، يقدّمها
المهندس عبدالرحيم السقا من Zyndesk. الحضور يكتبون لك ماذا يعملون، ووظيفتك أن
تعطي كل واحد **أتوميشن واحد محدّد** يمكنه بناؤه لشغله هو.

أعد JSON فقط بهذا الشكل:

{
  "category": "واحدة من: موظف | صاحب مشروع | طالب | فريلانسر | مبيعات وتسويق | تقني | أخرى",
  "title": "اسم قصير للأتوميشن، ٣ إلى ٦ كلمات",
  "steps": ["الخطوة الأولى", "الخطوة الثانية", "الخطوة الثالثة"],
  "tools": ["n8n", "أداة", "أداة"]
}

القواعد:
- الأتوميشن لازم يكون لشغله هو تحديداً، مش نصيحة عامة. محاسب ≠ معلّم ≠ صاحب مطعم.
- ثلاث خطوات بالضبط، كل وحدة سطر قصير: من وين تجي البيانات، شو يصير فيها، ووين تروح.
- الأدوات حقيقية ويمكن ربطها بـ n8n: Gmail، Google Sheets، WhatsApp، Telegram،
  Drive، OpenAI، Webhook، Airtable، Slack، Notion. أول أداة دائماً n8n.
- اكتب بالعربية بلهجة أردنية بسيطة. بلا مبالغة وبلا كلام تسويقي.
- إذا ما كتب شغلة واضحة، اختر "أخرى" واعطِ أتوميشن مفيد لأي حدا (تنظيم الإيميل أو
  المهام)، ولا تسأله سؤال — هو ما رح يرد.`;

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '';

const list = (v: unknown, count: number, max: number) =>
  Array.isArray(v)
    ? v.map((x) => clean(x, max)).filter(Boolean).slice(0, count)
    : [];

/** Anything the model returns is coerced into something safe to display. */
function normalise(raw: unknown, job: string): Idea {
  const o = (raw ?? {}) as Record<string, unknown>;
  const category = CATEGORIES.includes(o.category as Category)
    ? (o.category as Category)
    : 'أخرى';

  return {
    job,
    category,
    title: clean(o.title, 80) || 'أتوميشن لشغلك',
    steps: list(o.steps, 3, 160),
    tools: ['n8n', ...list(o.tools, 3, 30).filter((t) => t.toLowerCase() !== 'n8n')],
  };
}

/** The answer when the model is unavailable — still useful, never a dead end. */
export function fallbackIdea(job: string): Idea {
  return {
    job,
    category: 'أخرى',
    title: 'من الرسايل إلى شيت منظّم',
    steps: [
      'كل رسالة بتوصلك على الإيميل أو الواتساب بتنمسك أول ما تجي.',
      'الذكاء الاصطناعي بيقرأها ويطلّع منها الاسم والرقم والطلب.',
      'بتنكتب لحالها بصف جديد بشيت، وبيوصلك تنبيه.',
    ],
    tools: ['n8n', 'Gmail', 'Google Sheets', 'OpenAI'],
  };
}

export async function buildIdea(job: string, signal?: AbortSignal): Promise<Idea> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return fallbackIdea(job);

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    signal,
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: job.slice(0, 400) },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI responded ${res.status}`);

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('empty response');

  return normalise(JSON.parse(content), job);
}
