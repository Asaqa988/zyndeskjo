import { NextResponse } from 'next/server';
import { buildIdea, fallbackIdea, type Idea } from '@/lib/examples/automationIdea';
import { record } from '@/lib/examples/liveWall';
import { COURSE } from '@/data/course-facts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Five hundred people press send inside the same minute.
 *
 * The cap is on concurrent model calls, not on people: past it, callers queue
 * rather than being turned away, and anyone still waiting after the deadline
 * gets the fallback idea instead of silence. A demonstration in front of a
 * room fails badly if it fails slowly.
 */
const MAX_INFLIGHT = Number(process.env.TELEGRAM_MAX_INFLIGHT ?? 12);
const IDEA_TIMEOUT_MS = 20_000;

let inflight = 0;
const waiting: (() => void)[] = [];

async function withSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (inflight >= MAX_INFLIGHT) await new Promise<void>((r) => waiting.push(r));
  inflight += 1;
  try {
    return await fn();
  } finally {
    inflight -= 1;
    waiting.shift()?.();
  }
}

/** What the bot sends back, ready for Telegram's Markdown. */
function render(idea: Idea): string {
  const steps = idea.steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
  const tools = idea.tools.join(' · ');

  return `*${idea.title}*

${steps}

🔧 ${tools}

هاد أتوميشن تقدر تبنيه بنفسك. بالكورس بنبني زيّه من الصفر، خطوة خطوة.

📅 يبدأ ${COURSE.startsAt.slice(8, 10)}-${COURSE.startsAt.slice(5, 7)}-${COURSE.startsAt.slice(0, 4)} · ${COURSE.hours} ساعة · ${COURSE.feeJod} ديناراً · ${COURSE.seats} مقعد

احجز مقعدك 👇
https://www.zyndeskjo.com/register?utm_source=telegram&utm_medium=bot&utm_campaign=intro-lecture`;
}

/**
 * The lecture bot's brain.
 *
 * n8n receives the Telegram message and posts it here; this returns the reply
 * text for n8n to send back. The heavy part lives here rather than in n8n
 * because this scales with the site and n8n runs on a single small server —
 * but n8n stays in the path, which is the point of demonstrating it.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const secret = process.env.TELEGRAM_DEMO_SECRET;
  if (secret && String(body.secret ?? '') !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 });
  }

  const job = String(body.text ?? '').trim().slice(0, 400);
  // Telegram's own id, so one person counts once. Never stored, only hashed
  // into a key — the wall has no idea who anybody is.
  const personKey = String(body.chatId ?? body.from ?? '').slice(0, 60) || `anon:${Math.random()}`;

  if (job.length < 2 || job.startsWith('/')) {
    return NextResponse.json({
      ok: true,
      reply: `أهلاً فيك 👋

اكتبلي *شو بتشتغل* بجملة وحدة — مثلاً "محاسب" أو "عندي محل ملابس" أو "طالب هندسة".

وأنا بقترحلك أتوميشن تقدر تبنيه لشغلك إنت.`,
      counted: false,
    });
  }

  let idea: Idea;
  try {
    idea = await withSlot(() =>
      buildIdea(job, AbortSignal.timeout(IDEA_TIMEOUT_MS))
    );
  } catch (err) {
    console.error('[telegram] idea failed, using the fallback:', err);
    idea = fallbackIdea(job);
  }

  const { counted } = record(idea, personKey);
  return NextResponse.json({ ok: true, reply: render(idea), counted });
}
