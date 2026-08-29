import { NextResponse } from 'next/server';
import { REALTIME_MODEL, openAiKey } from '@/lib/agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Female voice, to match the avatar (the same character and voice the
 * JoAcademy assistant uses). Override with OPENAI_REALTIME_VOICE.
 * Realtime-optimised options: marin (f), cedar (m); classic: coral, sage,
 * shimmer (f) / ash, ballad, verse, echo (m).
 */
const REALTIME_VOICE = process.env.OPENAI_REALTIME_VOICE ?? 'marin';

/**
 * Mints a SHORT-LIVED realtime client secret for the browser.
 *
 * The permanent OPENAI_API_KEY never leaves the server — the browser only ever
 * holds an ephemeral key, which it uses to open WebRTC directly to OpenAI.
 *
 * Session behaviour (instructions, transcription, turn detection) is NOT set
 * here — the browser sends it as a `session.update` once the data channel is
 * open. See useVoiceCall.ts.
 */
export async function POST() {
  const key = openAiKey();
  if (!key) {
    return NextResponse.json({ ok: false, error: 'agent_unconfigured' }, { status: 503 });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        session: {
          type: 'realtime',
          model: REALTIME_MODEL,
          audio: { output: { voice: REALTIME_VOICE } },
        },
      }),
    });

    const raw = (await res.json()) as {
      value?: string;
      client_secret?: { value?: string };
      error?: { message?: string };
    };

    if (!res.ok) {
      console.error('[agent/session] OpenAI rejected:', res.status, raw?.error?.message);
      return NextResponse.json({ ok: false, error: 'session_failed' }, { status: 502 });
    }

    const token = raw.value ?? raw.client_secret?.value;
    if (!token) {
      console.error('[agent/session] no ephemeral key in response');
      return NextResponse.json({ ok: false, error: 'no_token' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, token, voice: REALTIME_VOICE });
  } catch (err) {
    console.error('[agent/session] failed:', err);
    return NextResponse.json({ ok: false, error: 'session_failed' }, { status: 502 });
  }
}
