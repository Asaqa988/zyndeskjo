/**
 * Pre-renders the testimonial thumbnails.
 *
 * Next.js converts images the first time someone asks for a given size, which
 * on a small container took six seconds per image and started over every time
 * the container restarted — the first visitor after each deploy paid for all
 * 43. Doing it here instead means the file is already sitting on disk and is
 * served as bytes, with no conversion in the request path.
 *
 * The full-size JPEG stays where it is: it is what opens when you click.
 *
 *   node scripts/optimise-testimonials.mjs
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'public/testimonials';
const OUT = 'public/testimonials/thumb';
/** Wide enough to stay sharp in a four-column grid on a 2× screen. */
const WIDTH = 650;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /^feedback-\d+\.jpg$/.test(f)).sort();
let before = 0, avif = 0, webp = 0;

for (const f of files) {
  const src = join(SRC, f);
  before += statSync(src).size;
  const base = f.replace(/\.jpg$/, '');

  await sharp(src).resize({ width: WIDTH, withoutEnlargement: true })
    .avif({ quality: 55 }).toFile(join(OUT, `${base}.avif`));
  await sharp(src).resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(join(OUT, `${base}.webp`));

  avif += statSync(join(OUT, `${base}.avif`)).size;
  webp += statSync(join(OUT, `${base}.webp`)).size;
}

const mb = (n) => (n / 1048576).toFixed(2) + ' MB';
console.log(`الصور: ${files.length}`);
console.log(`الأصل (JPEG كامل): ${mb(before)}`);
console.log(`AVIF بعرض ${WIDTH}: ${mb(avif)}  (متوسط ${Math.round(avif / files.length / 1024)} KB)`);
console.log(`WebP بعرض ${WIDTH}: ${mb(webp)}  (متوسط ${Math.round(webp / files.length / 1024)} KB)`);
