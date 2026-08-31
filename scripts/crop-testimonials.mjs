import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'public/testimonials';
const OUT = 'public/testimonials/cropped';
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

/** WhatsApp's header green, both the dark and the lighter variant. */
const isHeaderGreen = (r, g, b) =>
  g > r + 18 && g > b + 18 && g > 55 && g < 175 && r < 110 && b < 130;

const files = readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
const report = [];

for (const f of files) {
  const img = sharp(join(SRC, f));
  const { width, height } = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  // Walk down the middle column; the header ends at the last green row.
  let lastGreen = -1;
  const x = Math.floor(width / 2);
  const limit = Math.floor(height * 0.25);
  for (let y = 0; y < limit; y++) {
    const i = (y * width + x) * ch;
    if (isHeaderGreen(data[i], data[i + 1], data[i + 2])) lastGreen = y;
  }

  const cut = lastGreen >= 0 ? lastGreen + 2 : 0;
  if (cut > 0 && cut < height - 40) {
    await sharp(join(SRC, f))
      .extract({ left: 0, top: cut, width, height: height - cut })
      .jpeg({ quality: 88 })
      .toFile(join(OUT, f));
    report.push({ f, cut, status: 'قُصّت الترويسة' });
  } else {
    await sharp(join(SRC, f)).jpeg({ quality: 88 }).toFile(join(OUT, f));
    report.push({ f, cut: 0, status: 'ما لقيت ترويسة خضراء — نُسخت كما هي' });
  }
}

const cropped = report.filter((r) => r.cut > 0).length;
console.log(`المعالَجة: ${report.length}`);
console.log(`قُصّت ترويسة: ${cropped}`);
console.log(`بلا ترويسة خضراء: ${report.length - cropped}`);
console.log('\nاللي ما انقصّت (لازم فحص يدوي):');
report.filter((r) => r.cut === 0).forEach((r) => console.log('  ' + r.f.slice(0, 40)));
