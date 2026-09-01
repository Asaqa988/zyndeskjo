/**
 * Takes a snapshot of the clinic's public pages for the booking demo.
 *
 *   node scripts/scrape-clinic.mjs
 *
 * Run once, commit the result. The demo answers from the snapshot rather than
 * fetching live, for three reasons: a lecture demo cannot afford to wait on
 * someone else's server, the answers stay identical every time it is shown,
 * and a page that anybody can load must not turn into traffic against a real
 * clinic's site.
 *
 * Only pages the site itself lists in its sitemap, and robots.txt allows all
 * of them. The doctor gave permission for this demonstration.
 */
import { writeFileSync } from 'node:fs';

const PAGES = [
  'https://khaledalsayed.com/ar/',
  'https://khaledalsayed.com/',
  'https://khaledalsayed.com/dental-cases-gallery/',
];

/** Readable text from a WordPress page: no chrome, no scripts, no styles. */
function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<\/(p|div|section|li|h[1-6]|tr|br)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/[ \t ]+/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 1)
    .filter((l, i, a) => l !== a[i - 1])
    .join('\n');
}

const parts = [];
for (const url of PAGES) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'ZyndeskDemoSnapshot/1.0 (+https://www.zyndeskjo.com)' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    console.warn(`skipped ${url} — HTTP ${res.status}`);
    continue;
  }
  const text = textOf(await res.text());
  parts.push(`## ${url}\n\n${text}`);
  console.log(`${url} → ${text.length} chars`);
}

const snapshot = parts.join('\n\n---\n\n');
console.log(`\ntotal ${snapshot.length} chars`);
writeFileSync('scripts/_clinic-raw.md', snapshot, 'utf8');
console.log('wrote scripts/_clinic-raw.md — review it, then curate into src/data/examples/clinic.ts');
