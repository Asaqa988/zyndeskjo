import { NextResponse } from 'next/server';
import { CLINIC_KNOWLEDGE, CLINIC_RULES } from '@/data/examples/clinic';
import { takeToken, clientKey } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OPENAI_BASE = 'https://api.openai.com/v1';
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-5.4-mini';

/** A demo anyone can open, calling a paid model on every turn. */
const DAILY_LIMIT = Number(process.env.CLINIC_DEMO_DAILY_LIMIT ?? 40);
const MAX_TURNS = 16;
const MAX_CHARS = 600;

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

/** Trusts nothing from the client: roles and lengths are both re-imposed. */
function sanitize(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m): m is Turn => !!m && typeof m === 'object')
    .map((m) => ({
      role: (m as Turn).role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: String((m as Turn).content ?? '').slice(0, MAX_CHARS),
    }))
    .filter((m) => m.content.trim().length > 0)
    .slice(-MAX_TURNS);
}

/**
 * The clinic booking demo's assistant.
 *
 * Grounded in a snapshot of the clinic's own pages and nothing else — see
 * src/data/examples/clinic.ts for why the knowledge is deliberately narrow.
 * It answers questions and offers an appointment; it never claims to have
 * made one, because it has not.
 */
export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  const limit = takeToken(`clinic:${clientKey(request)}`, DAILY_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter) } }
    );
  }

  let history: Turn[];
  try {
    history = sanitize(((await request.json()) as { messages?: unknown }).messages);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  if (history.length === 0) {
    return NextResponse.json({ ok: false, error: 'empty_message' }, { status: 400 });
  }

  try {
    const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(45_000),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: `${CLINIC_RULES}\n\n---\n\n${CLINIC_KNOWLEDGE}` },
          ...history,
        ],
      }),
    });

    if (!res.ok) {
      console.error('[clinic] model error:', res.status, (await res.text()).slice(0, 200));
      return NextResponse.json({ ok: false, error: 'model_error' }, { status: 502 });
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error('empty reply');

    return NextResponse.json({ ok: true, reply, remaining: limit.remaining });
  } catch (err) {
    console.error('[clinic] reply failed:', err);
    return NextResponse.json({ ok: false, error: 'model_error' }, { status: 502 });
  }
}
