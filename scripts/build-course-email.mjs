/**
 * Regenerates the "Prepare" Code node of the Course info workflow.
 *
 * The email lives in n8n/course-info.email.js. n8n Code nodes cannot import,
 * so that file has to be inlined into the node — which is exactly the kind of
 * copy that drifts. Run this instead:
 *
 *   node scripts/build-course-email.mjs
 *
 * It rebuilds n8n/course-info.workflow.json and writes scripts/_prepare.js,
 * which is what gets pasted into the Code node in the n8n editor.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const builder = readFileSync('n8n/course-info.email.js', 'utf8')
  .replace(/^export \{ buildEmail \};\s*$/m, '')
  .trim();

const jsCode = `${builder}

// ---------------------------------------------------------------------------

// Everything the branches below need, in one place.
const b = $json.body ?? $json;

const covered = Array.isArray(b.covered) ? b.covered : [];

// What the CV was missing that the course actually covers. Used to open the
// email with their situation instead of a form letter.
const gapLine = covered.length
  ? \`لاحظنا إنك بتدوّر على: \${covered.join('، ')} — وهدول من صميم الكورس.\`
  : '';

// Days until the first session. Past the date it is 0 and the bar is hidden,
// so an email sent after the course has started does not count backwards.
const START = new Date('2026-09-07T20:00:00+03:00').getTime();
const days = Math.max(0, Math.ceil((START - Date.now()) / 86400000));

return {
  json: {
    email: String(b.email || '').trim(),
    locale: b.locale === 'en' ? 'en' : 'ar',
    covered,
    gapLine,
    days,
    html: buildEmail({ gapLine, days }),
    receivedAt: b.receivedAt || new Date().toISOString(),
    source: b.source || 'cv-check',
  },
};
`;

// Run it the way n8n will, so a syntax error surfaces here and not in production.
const out = new Function('$json', jsCode)({ body: { email: 'test@example.com', covered: ['n8n'] } });
if (!out.json.html.includes('<table')) throw new Error('the builder produced no HTML');

const path = 'n8n/course-info.workflow.json';
const wf = JSON.parse(readFileSync(path, 'utf8'));
wf.nodes.find((n) => n.name === 'Prepare').parameters.jsCode = jsCode;
const gmail = wf.nodes.find((n) => n.name === 'Email the visitor').parameters;
gmail.emailType = 'html';
gmail.message = '={{ $json.html }}';
writeFileSync(path, `${JSON.stringify(wf, null, 2)}\n`, 'utf8');
writeFileSync('scripts/_prepare.js', jsCode, 'utf8');

console.log(`html ${(out.json.html.length / 1024).toFixed(1)} KB · wrote ${path} and scripts/_prepare.js`);
