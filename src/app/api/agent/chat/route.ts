import { NextResponse } from 'next/server';
import { callModel, openAiKey, sanitizeHistory } from '@/lib/agent';

export const runtime = 'nodejs';
/** Never cache an assistant reply. */
export const dynamic = 'force-dynamic';

/**
 * Text chat endpoint for the site assistant widget.
 *
 * Streams OpenAI's SSE response straight through to the browser so the reply
 * appears token by token. The widget parses the `data:` lines itself.
 */
export async function POST(request: Request) {
  if (!openAiKey()) {
    // Not configured — the widget hides itself rather than showing a broken box.
    return NextResponse.json({ ok: false, error: 'agent_unconfigured' }, { status: 503 });
  }

  let body: { messages?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const history = sanitizeHistory(body.messages);
  if (history.length === 0) {
    return NextResponse.json({ ok: false, error: 'empty_message' }, { status: 400 });
  }

  const locale = body.locale === 'ar' ? 'ar' : 'en';

  let upstream: Response;
  try {
    upstream = await callModel({ locale, history, stream: true, signal: request.signal });
  } catch (err) {
    console.error('[agent] model call failed:', err);
    return NextResponse.json({ ok: false, error: 'model_unavailable' }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    console.error('[agent] upstream error:', upstream.status, await upstream.text());
    return NextResponse.json({ ok: false, error: 'model_error' }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
    },
  });
}
