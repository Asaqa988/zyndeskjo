/**
 * Adds Arabic diacritics to the tour narration.
 *
 * Arabic TTS guesses the vowels when the text is bare, and guesses wrong often
 * enough to be distracting — a tutor who mispronounces the course's own words
 * undermines the whole thing. Writing the diacritics into the text removes the
 * guess.
 *
 * The output lands in a plain, reviewable JSON file that is committed with the
 * code. The model produces the first draft; anything it gets wrong you fix by
 * hand once, and it stays fixed — re-runs never overwrite an existing entry
 * unless you pass --force.
 *
 *   node scripts/make-tashkeel.mjs           # fill in what's missing
 *   node scripts/make-tashkeel.mjs --force   # redo everything (discards edits)
 *
 * Then re-run make-narration.mjs to re-synthesise the audio.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');

const { onboardingTutorial: tutorial } = await import(
  pathToFileURL(resolve(root, "src/data/tutorials/onboarding.ts")).href
);

// Spoken wording, authored separately from the on-screen text — see
// narration-lines.ts for why the two differ.
const { NARRATION_AR } = await import(
  pathToFileURL(resolve(root, "src/data/tutorials/narration-lines.ts")).href
);

const OUT = resolve(root, 'src/data/tutorials/narration.ar.json');
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-5.4-mini';

const SYSTEM = `You add Arabic diacritics (tashkeel) to text so a text-to-speech engine pronounces it correctly.

Rules:
- Return ONLY the diacritised text. No explanation, no quotes, no markdown.
- Add fatha, damma, kasra, sukun, shadda and tanween wherever they remove ambiguity.
- The text is Jordanian spoken Arabic, not formal MSA. Diacritise it the way a Jordanian would SAY it, not the way it would be written in a newspaper. Do not "correct" the dialect into MSA.
- Do NOT change any wording, add words, or remove words.
- Leave Latin-script words (n8n, Playwright, Docker, GitHub, Hostinger, API, Zyndesk) exactly as they are, untouched.
- Keep all punctuation exactly as it is.`;

function keyFromEnvLocal() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  const env = readFileSync(resolve(root, '.env.local'), 'utf8');
  const line = env.split(/\r?\n/).find((l) => l.startsWith('OPENAI_API_KEY='));
  if (!line) throw new Error('OPENAI_API_KEY not found in .env.local');
  return line.slice('OPENAI_API_KEY='.length).trim();
}

/** The same lines make-narration.mjs speaks, so the two can never diverge. */
function lines() {
  const line = (id, fallback) => ({ id, text: NARRATION_AR[id] ?? fallback });
  return [
    line("intro", tutorial.intro.title.ar + ". " + tutorial.intro.message.ar),
    ...tutorial.steps.map((s) =>
      line(s.id, s.title.ar + ". " + (s.narration ?? s.message).ar)
    ),
    line("outro", tutorial.outro.title.ar + ". " + tutorial.outro.message.ar),
  ];
}

const key = keyFromEnvLocal();
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const out = { ...existing };
let added = 0;
let kept = 0;

for (const { id, text } of lines()) {
  // An entry whose source text has not changed is left alone — including any
  // corrections you made by hand.
  if (!force && existing[id]?.source === text) {
    kept++;
    continue;
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: text },
      ],
    }),
  });

  if (!res.ok) {
    console.error(`${id}: OpenAI responded ${res.status}`);
    console.error((await res.text()).slice(0, 200));
    process.exitCode = 1;
    continue;
  }

  const json = await res.json();
  const spoken = json.choices?.[0]?.message?.content?.trim();
  if (!spoken) {
    console.error(`${id}: empty response`);
    continue;
  }

  // `source` is kept so a later edit to the tour invalidates just that entry.
  out[id] = { source: text, spoken };
  added++;
  console.log(`tashkeel: ${id}`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');

console.log(`\ndone — ${added} diacritised, ${kept} unchanged`);
console.log(`review and edit: src/data/tutorials/narration.ar.json`);
console.log('then: node scripts/make-narration.mjs');
