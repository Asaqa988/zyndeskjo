/**
 * Pre-renders the spoken welcome to static MP3s in public/audio.
 *
 * Done once, offline, rather than at request time: the greeting never changes
 * per visitor, so paying for a TTS call on every page load would be waste, and
 * a static file starts playing instantly instead of after a round trip.
 *
 * Re-run after editing GREETINGS:
 *   node scripts/make-greeting.mjs
 *
 * Reads OPENAI_API_KEY from .env.local. The key is never printed.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const GREETINGS = {
  ar: {
    text:
      'أهلا وسهلا فيك! أنا ليلى، مساعدة عبدالرحيم السقا. شو رأيك نعمل مكالمة صوتية عشان أقدر أساعدك بشكل أوضح وأسرع؟ بس رح يطلب منك المتصفح السماح بخيار المايك عشان أقدر أسمعك.',
    instructions:
      'Speak in a warm, welcoming Jordanian Arabic dialect. Friendly and unhurried, like greeting a guest.',
  },
  en: {
    text:
      "Welcome! I'm Zyn, Abdulraheem Alsaka's assistant. How about we start a voice call so I can help you faster and more clearly? Your browser will just ask for microphone permission so I can hear you.",
    instructions: 'Speak warmly and welcoming, friendly and unhurried.',
  },
};

// Must match the realtime voice used on calls (see api/agent/session), or the
// visitor hears one woman greet them and a different one answer.
const VOICE = process.env.OPENAI_TTS_VOICE ?? 'marin';
const MODEL = process.env.OPENAI_TTS_MODEL ?? 'gpt-4o-mini-tts';

function keyFromEnvLocal() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  const env = readFileSync(resolve(root, '.env.local'), 'utf8');
  const line = env.split(/\r?\n/).find((l) => l.startsWith('OPENAI_API_KEY='));
  if (!line) throw new Error('OPENAI_API_KEY not found in .env.local');
  return line.slice('OPENAI_API_KEY='.length).trim();
}

const key = keyFromEnvLocal();
mkdirSync(resolve(root, 'public/audio'), { recursive: true });

for (const [locale, { text, instructions }] of Object.entries(GREETINGS)) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: MODEL, voice: VOICE, input: text, instructions, format: 'mp3' }),
  });

  if (!res.ok) {
    console.error(`${locale}: OpenAI responded ${res.status}`);
    console.error((await res.text()).slice(0, 300));
    process.exitCode = 1;
    continue;
  }

  const out = resolve(root, `public/audio/greeting-${locale}.mp3`);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`wrote public/audio/greeting-${locale}.mp3`);
}
