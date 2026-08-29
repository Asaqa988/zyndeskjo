/**
 * Applies hand corrections to the diacritised narration.
 *
 * Matching ignores existing diacritics: the model's output puts marks in an
 * order that is hard to reproduce by hand, so we match on base letters and
 * replace the whole run. Re-running is safe — a correction already applied
 * simply matches itself.
 *
 *   node scripts/fix-tashkeel.mjs
 *   node scripts/make-narration.mjs   # then re-synthesise
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = resolve(root, 'src/data/tutorials/narration.ar.json');

/** Arabic diacritics and tatweel. */
const MARKS = '[ً-ْٰـ]*';

const strip = (s) => s.replace(new RegExp(MARKS, 'g'), '');

/** A regex matching `phrase` regardless of what diacritics it carries. */
function loose(phrase) {
  const pattern = strip(phrase)
    .split('')
    .map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + MARKS)
    .join('');
  return new RegExp(pattern, 'g');
}

/**
 * Each entry is a real mispronunciation, not a stylistic preference:
 *  - "مساعدتكِ" addresses a woman, and مُساعَدة means "assistance" where we
 *    want مُساعِدة, "the one who helps".
 *  - "يُحَلّها" is passive; the sentence says someone actively solves it.
 */
const CORRECTIONS = [
  // The model kept "correcting" the dialect and, twice, changed the word
  // itself — despite being told not to. Each of these is a real error, not a
  // matter of taste.
  { id: "intro", from: "مساعدتك الذكية", to: "مُساعِدْتَك الذَّكِيَّة" },   // كسرة = تخاطب أنثى
  { id: "intro", from: "أفرجيك", to: "أفَرْجيك" },                          // same
  { id: "dashboard", from: "بتحتاحه", to: "بِتِحْتاجُه" },                   // ح instead of ج
  { id: "lessons", from: "جوا كل واحدة", to: "جَوَّا كُلّ وِحْدَة" },          // "واحدة" is not "وحدة"
  { id: "projects", from: "كل الي تعلمته", to: "كُلّ اللّي تْعَلَّمْتُه" },    // dropped a lam
  { id: "playground", from: "شوف الذكاء", to: "شُوف الذَّكاء" },              // MSA case endings on speech
];

const data = JSON.parse(readFileSync(FILE, 'utf8'));
let applied = 0;

for (const { id, from, to } of CORRECTIONS) {
  const entry = data[id];
  if (!entry) {
    console.warn(`no entry "${id}" — skipped`);
    continue;
  }
  const before = entry.spoken;
  entry.spoken = before.replace(loose(from), to);
  if (entry.spoken === before) {
    console.warn(`no match for "${from}" in ${id}`);
  } else {
    applied++;
    console.log(`fixed ${id}: ${from} → ${to}`);
  }
}

writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`\n${applied} correction(s) applied`);
