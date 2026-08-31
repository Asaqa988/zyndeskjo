import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'public/testimonials/cropped';
const OUT = '.sheets';
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const CELL_W = 380, CELL_H = 760, COLS = 4, ROWS = 2;
const files = readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f)).sort();
const perSheet = COLS * ROWS;

for (let s = 0; s * perSheet < files.length; s++) {
  const batch = files.slice(s * perSheet, (s + 1) * perSheet);
  const tiles = [];
  for (let i = 0; i < batch.length; i++) {
    const buf = await sharp(join(SRC, batch[i]))
      .resize(CELL_W, CELL_H, { fit: 'contain', background: '#ffffff', position: 'top' })
      .toBuffer();
    tiles.push({ input: buf, left: (i % COLS) * CELL_W, top: Math.floor(i / COLS) * CELL_H });
  }
  await sharp({ create: { width: CELL_W * COLS, height: CELL_H * ROWS, channels: 3, background: '#dddddd' } })
    .composite(tiles).jpeg({ quality: 82 }).toFile(join(OUT, `sheet-${s + 1}.jpg`));
  console.log(`sheet-${s + 1}: ${batch.map((b) => b.slice(0, 12)).join(' · ')}`);
}
console.log(`\n${files.length} صورة على ${Math.ceil(files.length / perSheet)} لوحات`);
