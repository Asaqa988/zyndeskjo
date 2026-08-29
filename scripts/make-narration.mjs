/**
 * Pre-renders the tour narration to static MP3s in public/audio/tutorial.
 *
 * Reads the tutorial data itself rather than a copy of the wording, so the
 * spoken line and the line in the speech bubble can never drift apart. One TTS
 * call per step per locale, done once here — not once per student per visit.
 *
 *   node scripts/make-narration.mjs            # only what changed
 *   node scripts/make-narration.mjs --force    # re-synthesise everything
 *
 * A hash of each line is kept beside the audio, so editing one step re-renders
 * one file instead of the whole tour.
 *
 * Reads OPENAI_API_KEY from .env.local. The key is never printed.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');

// pathToFileURL: on Windows a bare absolute path is not a valid ESM specifier.
const { onboardingTutorial: tutorial } = await import(
  pathToFileURL(resolve(root, "src/data/tutorials/onboarding.ts")).href
);

// Spoken wording, authored separately from the on-screen text — see
// narration-lines.ts for why the two differ.
const { NARRATION_AR } = await import(
  pathToFileURL(resolve(root, "src/data/tutorials/narration-lines.ts")).href
);

/** Must match the realtime + greeting voice, or the tutor changes person. */
const VOICE = process.env.OPENAI_TTS_VOICE ?? 'marin';
const MODEL = process.env.OPENAI_TTS_MODEL ?? 'gpt-4o-mini-tts';

const INSTRUCTIONS = {
  ar: 'Speak warm, clear Jordanian Arabic. You are a teacher walking a new student through a platform — unhurried, encouraging, never salesy.',
  en: 'Speak warmly and clearly. You are a teacher walking a new student through a platform — unhurried, encouraging, never salesy.',
};

function keyFromEnvLocal() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  const env = readFileSync(resolve(root, '.env.local'), 'utf8');
  const line = env.split(/\r?\n/).find((l) => l.startsWith('OPENAI_API_KEY='));
  if (!line) throw new Error('OPENAI_API_KEY not found in .env.local');
  return line.slice('OPENAI_API_KEY='.length).trim();
}

/**
 * Diacritised Arabic, produced by make-tashkeel.mjs and corrected by hand.
 * Without the marks the TTS guesses the vowels and mispronounces words.
 */
const TASHKEEL_FILE = resolve(root, 'src/data/tutorials/narration.ar.json');
const tashkeel = existsSync(TASHKEEL_FILE)
  ? JSON.parse(readFileSync(TASHKEEL_FILE, 'utf8'))
  : {};

/** Every line the tour speaks: intro, each step, outro. */
function lines(locale) {
  const spoken = (step) => (step.narration ?? step.message)[locale];
  const raw =
    locale === "ar"
      ? [
          { id: "intro", text: NARRATION_AR.intro },
          ...tutorial.steps.map((s) => ({ id: s.id, text: NARRATION_AR[s.id] })),
          { id: "outro", text: NARRATION_AR.outro },
        ]
      : [
          { id: "intro", text: `${tutorial.intro.title[locale]}. ${tutorial.intro.message[locale]}` },
          ...tutorial.steps.map((s) => ({ id: s.id, text: `${s.title[locale]}. ${spoken(s)}` })),
          { id: "outro", text: `${tutorial.outro.title[locale]}. ${tutorial.outro.message[locale]}` },
        ];

  if (locale !== 'ar') return raw;

  // Speak the diacritised version when we have one for this exact line; a stale
  // entry (the wording changed since) falls back to the bare text rather than
  // saying something the tour no longer shows.
  return raw.map(({ id, text }) => {
    const entry = tashkeel[id];
    return { id, text: entry?.source === text ? entry.spoken : text };
  });
}

const key = keyFromEnvLocal();
let written = 0;
let skipped = 0;

for (const locale of ['ar', 'en']) {
  const dir = resolve(root, `public/audio/tutorial/${locale}`);
  mkdirSync(dir, { recursive: true });

  for (const { id, text } of lines(locale)) {
    const mp3 = resolve(dir, `${id}.mp3`);
    const stamp = resolve(dir, `${id}.hash`);
    const hash = createHash('sha256').update(`${MODEL}|${VOICE}|${text}`).digest('hex').slice(0, 16);

    if (!force && existsSync(mp3) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash) {
      skipped++;
      continue;
    }

    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        voice: VOICE,
        input: text,
        instructions: INSTRUCTIONS[locale],
        format: 'mp3',
      }),
    });

    if (!res.ok) {
      console.error(`${locale}/${id}: OpenAI responded ${res.status}`);
      console.error((await res.text()).slice(0, 200));
      process.exitCode = 1;
      continue;
    }

    writeFileSync(mp3, Buffer.from(await res.arrayBuffer()));
    writeFileSync(stamp, hash);
    written++;
    console.log(`wrote ${locale}/${id}.mp3`);
  }
}

console.log(`\ndone — ${written} written, ${skipped} unchanged`);
