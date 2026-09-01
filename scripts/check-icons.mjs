/**
 * Lists icon names the app asks for that Icon.tsx does not register.
 *
 * Icon falls back to a generic <Boxes /> for anything unknown, so a typo or a
 * name someone forgot to import does not throw — it just quietly renders the
 * wrong picture on a page nobody re-reads. Run this after adding icons:
 *
 *   node scripts/check-icons.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const registry = new Set(
  [...readFileSync('src/components/ui/Icon.tsx', 'utf8').matchAll(/^ {2}([A-Z][A-Za-z0-9]*),?$/gm)]
    .map((m) => m[1])
);

const used = new Map();
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry)) {
      const text = readFileSync(full, 'utf8');
      for (const m of text.matchAll(/(?:name=["']|icon:\s*["'])([A-Z][A-Za-z0-9]*)["']/g)) {
        if (!used.has(m[1])) used.set(m[1], full.split('\\').join('/'));
      }
    }
  }
}
walk('src');

const missing = [...used].filter(([n]) => !registry.has(n));
console.log(`registered ${registry.size} · used ${used.size} · missing ${missing.length}`);
for (const [name, where] of missing) console.log(`  ${name.padEnd(18)} ${where}`);
process.exitCode = missing.length ? 1 : 0;
