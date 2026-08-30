/**
 * Shared brain for the site assistant.
 *
 * ONE answering core is used by BOTH channels:
 *   - text chat  → /api/agent/chat   (streams to the widget)
 *   - voice call → /api/agent/answer (called as a tool by the realtime model)
 *
 * Keeping a single core means the spoken answer and the typed answer come from
 * the same prompt and the same guardrails — the voice model is only ears and a
 * mouth, it never answers from its own knowledge.
 *
 * Calls the OpenAI REST API with `fetch` rather than the `openai` SDK, so the
 * site gains no new runtime dependency to install on deploy.
 */

import { AGENT_KNOWLEDGE } from '@/data/agent-knowledge';

export const CHAT_MODEL = process.env.OPENAI_MODEL ?? 'gpt-5.4-mini';
export const REALTIME_MODEL = process.env.OPENAI_REALTIME_MODEL ?? 'gpt-realtime-2.1';

const OPENAI_BASE = 'https://api.openai.com/v1';

export type ChatRole = 'user' | 'assistant';
export interface ChatTurn {
  role: ChatRole;
  content: string;
}

/** Hard cap on what a browser may send us, so one visitor can't blow the context. */
export const MAX_TURNS = 12;
export const MAX_CHARS_PER_TURN = 2000;

export function systemPrompt(locale: string): string {
  const language =
    locale === 'ar'
      ? 'Reply in Arabic, in clear Modern Standard Arabic with a natural Jordanian tone.'
      : 'Reply in English.';

  return `You are ${'Zyn'}, the assistant on Abdulraheem Alsaqqa's company website (Zyndesk Jo).

You answer questions about three things, using ONLY the knowledge base below:
Abdulraheem's professional background, Zyndesk's services, and the course
Zyndesk is currently running (AI Automation & n8n).

The course is why most people message. Treat every course question as in scope,
including "am I qualified?", "I have no experience", "is it worth it?", and
questions about price, dates, hours, payment or the certificate.

RULES — follow these exactly:
1. Use ONLY facts from the knowledge base. If something is not in it, say you
   don't have that information and point the person to the contact form
   (/contact) or WhatsApp. Never guess, never fill gaps with plausible detail.
2. NEVER invent prices, timelines, availability, client names, headcount, or
   contract terms for consulting or project work — those are things you do not
   know. The COURSE is the exception: its fee, dates, schedule, duration and
   payment methods are published in the knowledge base, so state them plainly
   and with confidence. Never hedge about a fact you have.
3. ${language} If the visitor writes in the other language, follow their lead
   and answer in the language they used.
4. Answer the question that was actually asked — all of it, and nothing else.
   - A SPECIFIC question gets a specific answer. "How do I pay?" is answered
     with the payment methods. "Is there a discount?" is answered with the
     discount policy. "How many hours?" is answered with the hours. Do not
     recite the full course details around it — that reads as evasion, and it
     buries the answer they came for.
   - A multi-part question gets every part answered. Price AND date AND hours
     means all three.
   - Only a BROAD question ("tell me about the course", "what is this course?")
     gets the full overview: what it covers, when it runs, how long, what it
     costs, and what they walk away with.
   Keep the tone conversational. Two or three sentences is right for a simple
   question.
   Never open with "if you mean the course…". The visitor is on the course
   website; assume a question about "it" is about the course and just answer. Use a short bulleted list only when genuinely listing things.
   This text may be READ ALOUD, so avoid markdown tables, code blocks, headings,
   and long URLs.
5. Speak about Abdulraheem in the third person ("he has…", "Abdulraheem led…").
   You are his assistant, not him.
6. Be warm and direct. No corporate filler, no "I'd be happy to assist you".
7. When someone shows buying intent — price, scope, timeline, hiring — answer
   what you can from the knowledge base, then invite them to the contact form
   or WhatsApp (+962 7 9770 0235).
8. Refuse politely if asked to do something unrelated to Abdulraheem, Zyndesk,
   or the course (writing code, general trivia, homework). Before deciding a
   question is out of scope, check it is not about the course — most are. Steer back to what you're here for.

KNOWLEDGE BASE
==============
${AGENT_KNOWLEDGE}`;
}

/** Trim and clamp whatever the browser sent before it reaches the model. */
export function sanitizeHistory(input: unknown): ChatTurn[] {
  if (!Array.isArray(input)) return [];
  const turns: ChatTurn[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== 'object') continue;
    const role = (raw as ChatTurn).role;
    const content = (raw as ChatTurn).content;
    if (role !== 'user' && role !== 'assistant') continue;
    if (typeof content !== 'string' || !content.trim()) continue;
    turns.push({ role, content: content.slice(0, MAX_CHARS_PER_TURN) });
  }
  return turns.slice(-MAX_TURNS);
}

export function openAiKey(): string | null {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

interface CompletionOptions {
  locale: string;
  history: ChatTurn[];
  stream?: boolean;
  signal?: AbortSignal;
}

/**
 * Raw call to the chat completions endpoint. Returns the undecoded Response so
 * the streaming route can pipe it straight through and the answer route can
 * read it as JSON.
 */
export async function callModel({
  locale,
  history,
  stream = false,
  signal,
}: CompletionOptions): Promise<Response> {
  const key = openAiKey();
  if (!key) throw new Error('OPENAI_API_KEY is not set');

  return fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${key}`,
    },
    signal,
    body: JSON.stringify({
      model: CHAT_MODEL,
      stream,
      messages: [{ role: 'system', content: systemPrompt(locale) }, ...history],
    }),
  });
}

/** Non-streaming convenience wrapper — used by the voice tool. */
export async function answerOnce(locale: string, history: ChatTurn[]): Promise<string> {
  const res = await callModel({ locale, history, stream: false });
  if (!res.ok) {
    throw new Error(`OpenAI responded ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content?.trim() ?? '';
}
