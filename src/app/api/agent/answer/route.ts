import { NextResponse } from 'next/server';
import { answerOnce, openAiKey, sanitizeHistory } from '@/lib/agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The voice channel's answering core.
 *
 * The realtime model does NOT answer from its own knowledge — it hears the
 * question, calls its `answer_from_knowledge` tool, and speaks whatever comes
 * back from here. That keeps spoken answers identical to typed ones and under
 * the same guardrails.
 */
export async function POST(request: Request) {
  if (!openAiKey()) {
    return NextResponse.json({ ok: false, error: 'agent_unconfigured' }, { status: 503 });
  }

  let body: { question?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!question) {
    return NextResponse.json({ ok: false, error: 'empty_question' }, { status: 400 });
  }

  const locale = body.locale === 'ar' ? 'ar' : 'en';
  const history = sanitizeHistory([{ role: 'user', content: question }]);

  try {
    const answer = await answerOnce(locale, history);
    return NextResponse.json({ ok: true, answer });
  } catch (err) {
    console.error('[agent/answer] failed:', err);
    return NextResponse.json({ ok: false, error: 'model_error' }, { status: 502 });
  }
}
