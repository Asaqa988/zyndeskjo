import { NextResponse } from 'next/server';
import { REALTIME_MODEL, openAiKey } from '@/lib/agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Mints a SHORT-LIVED realtime session token for the browser.
 *
 * The permanent OPENAI_API_KEY never leaves the server. The browser gets an
 * ephemeral client secret (valid for about a minute) and uses it to open the
 * WebRTC connection directly to OpenAI.
 *
 * The realtime model is configured here as ears + mouth only: it is instructed
 * to answer nothing itself and to route every question through the
 * `answer_from_knowledge` tool, which the client resolves via /api/agent/answer.
 */
export async function POST(request: Request) {
  const key = openAiKey();
  if (!key) {
    return NextResponse.json({ ok: false, error: 'agent_unconfigured' }, { status: 503 });
  }

  let locale: 'en' | 'ar' = 'en';
  try {
    const body = (await request.json()) as { locale?: unknown };
    if (body.locale === 'ar') locale = 'ar';
  } catch {
    /* body is optional — default to English */
  }

  const spokenLanguage =
    locale === 'ar'
      ? 'Speak Arabic with a natural Jordanian tone.'
      : 'Speak English.';

  const instructions = `You are Zyn, the voice assistant on Abdulraheem Alsaka's company website (Zyndesk Jo).

CRITICAL: You do NOT know anything about Abdulraheem or Zyndesk yourself.
For EVERY question about him, his experience, his skills, his certifications,
his projects, or about Zyndesk's services, you MUST call the
\`answer_from_knowledge\` tool with the visitor's question, then speak the
answer it returns. Never answer such a question from your own knowledge and
never embellish what the tool returns.

You may respond directly ONLY to greetings, small talk, and requests to repeat
or slow down.

${spokenLanguage} Keep replies short and natural — this is a spoken
conversation, not a document. Never read out URLs character by character; say
"the contact page on the website" instead.`;

  try {
    const res = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: REALTIME_MODEL,
        modalities: ['audio', 'text'],
        voice: 'alloy',
        instructions,
        tools: [
          {
            type: 'function',
            name: 'answer_from_knowledge',
            description:
              "Answer any question about Abdulraheem Alsaka or Zyndesk Jo. Always use this — it is the only source of truth.",
            parameters: {
              type: 'object',
              properties: {
                question: {
                  type: 'string',
                  description: "The visitor's question, verbatim.",
                },
              },
              required: ['question'],
            },
          },
        ],
        tool_choice: 'auto',
      }),
    });

    if (!res.ok) {
      console.error('[agent/session] upstream error:', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'session_failed' }, { status: 502 });
    }

    const session = (await res.json()) as {
      client_secret?: { value?: string; expires_at?: number };
    };
    const token = session.client_secret?.value;
    if (!token) {
      return NextResponse.json({ ok: false, error: 'no_token' }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      token,
      model: REALTIME_MODEL,
      expiresAt: session.client_secret?.expires_at ?? null,
    });
  } catch (err) {
    console.error('[agent/session] failed:', err);
    return NextResponse.json({ ok: false, error: 'session_failed' }, { status: 502 });
  }
}
