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
  /** A short name for the automation, e.g. "بائع واتساب بيعرف مخزونك". */
  title: string;
  /** The line that sells it: what this saves, concretely. */
  payoff: string;
  /** Three steps, each a single line. */
  steps: string[];
  /** The tools it would be built from, n8n first. */
  tools: string[];
}

const SYSTEM = `أنت في محاضرة تعريفية عن الأتمتة، أمام ٥٠٠ شخص. كل واحد بيكتب لك
شو بيشتغل، ولازم ترجعله أتوميشن يخليه يقول **"ما كنت أعرف إنه هذا ممكن"**.

أعد JSON فقط:

{
  "category": "واحدة من: موظف | صاحب مشروع | طالب | فريلانسر | مبيعات وتسويق | تقني | أخرى",
  "title": "اسم الأتوميشن، ٣ إلى ٦ كلمات، ملموس",
  "payoff": "سطر واحد: شو بيوفّر عليه بالضبط — وقت أو مصاري أو مبيعات ضايعة",
  "steps": ["الأولى", "الثانية", "الثالثة"],
  "tools": ["n8n", "أداة", "أداة"]
}

## الفرق بين رد ممتاز ورد ممل

الرد الممل بيوصف **ترتيب معلومات**. الرد الممتاز بيوصف **شغلة كان لازم إنسان
يعملها وصارت تصير لحالها**.

مثال — "تاجر سيارات":

❌ ممل: "متابعة استفسارات السيارات — تجي الاستفسارات، n8n يرتبها، تنحفظ بشيت."
   هاد مجرد ترتيب. أي حدا بيفكر فيه، وما بينبهر فيه أحد.

✅ ممتاز:
   title: "بائع واتساب بيعرف مخزونك"
   payoff: "بدل ما ترد ٤٠ مرة باليوم على 'في كامري ٢٠١٨؟'، بيرد هو بثانية — وإنت
            بتشوف بس الزبون الجاد"
   steps:
     - "الزبون بيسأل على الواتساب: 'بدي كامري ٢٠١٨ أوتوماتيك تحت ١٥ ألف'"
     - "الذكاء الاصطناعي بيفهم الطلب ويدوّر بجدول مخزونك، وبيرد بالسعر والممشى والصور"
     - "إذا حكى 'بدي أشوفها'، بيحجزله معاينة بتقويمك وبينبهك — والباقي ما بيوصلك"

## القواعد

- ابدأ من **أكثر شغلة متكررة ومملة** بمهنته، مش من "تنظيم البيانات".
- خطوة رقم ١ لازم تكون مشهد حقيقي: جملة الزبون، أو الورقة الي بتوصله، أو الرسالة
  الي بتيجي. اكتبها بين علامتَي تنصيص إذا كانت كلام إنسان.
- خطوة رقم ٣ لازم تخلص بنتيجة يشوفها هو، مش بـ"تنحفظ بشيت". حجز، رد انبعت، تنبيه
  بس على المهم، فاتورة انعملت، تقرير وصل قبل الاجتماع.
- \`payoff\` هي أهم حقل. رقم أو مقارنة ملموسة. مش "بيوفر وقت" — بل "بدل ساعتين
  كل مسا، صفر".
- **ممنوع** تبدأ العنوان بـ"تنظيم" أو "متابعة" أو "إدارة". هدول أسماء ملفات مش
  أتوميشن.
- ممنوع الأتوميشن يكون "اجمع رسائل واحفظها". لازم يقرر، أو يرد، أو يحجز، أو يحسب،
  أو يفلتر، أو ينبّه على الشاذ بس.
- الأدوات حقيقية وبتنربط بـ n8n: WhatsApp، Gmail، Google Sheets، Telegram، Drive،
  OpenAI، Webhook، Airtable، Calendar، Slack، Notion. أول وحدة دايماً n8n.
- عربي بلهجة أردنية. بلا مبالغة وبلا كلام تسويقي. جمل قصيرة.
- إذا ما كتب شغلة واضحة، اختر "أخرى" وأعطِ أتوميشن قوي بيفيد أي حدا، ولا تسأله
  سؤال — هو ما رح يرد.`;

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
    payoff: clean(o.payoff, 200),
    steps: list(o.steps, 3, 160),
    tools: ['n8n', ...list(o.tools, 3, 30).filter((t) => t.toLowerCase() !== 'n8n')],
  };
}

/** The answer when the model is unavailable — still useful, never a dead end. */
export function fallbackIdea(job: string): Idea {
  return {
    job,
    category: 'أخرى',
    title: 'ردّاد الواتساب الي بيفلتر إلك',
    payoff: 'بدل ما تفتح كل رسالة بنفسك، بيوصلك بس الي فيه زبون جاد',
    steps: [
      'الزبون بيكتب على الواتساب: "مهتم، شو التفاصيل؟"',
      'الذكاء الاصطناعي بيرد عليه بالمعلومات ويسأله السؤالين الي بيحددوا إذا هو جاد.',
      'إذا طلع جاد، بيوصلك تنبيه باسمه ورقمه وملخص كلامه — والباقي ما بيزعجك.',
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
