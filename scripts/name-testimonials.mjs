/**
 * Renames the testimonial screenshots to a stable, meaningless sequence.
 *
 * The originals carry Facebook CDN ids in their filenames — long, unreadable,
 * and traceable back to wherever they were downloaded from. A plain sequence
 * keeps the public URLs clean and says nothing about the people in them.
 */
import { readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/testimonials';
const files = readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f)).sort();

files.forEach((f, i) => {
  const to = `feedback-${String(i + 1).padStart(2, '0')}.jpg`;
  if (f !== to) renameSync(join(DIR, f), join(DIR, to));
});

console.log(`أُعيدت تسمية ${files.length} صورة → feedback-01.jpg … feedback-${String(files.length).padStart(2, '0')}.jpg`);
