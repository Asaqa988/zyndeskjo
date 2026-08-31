import { readFileSync } from 'node:fs';
import { PDFParse } from 'pdf-parse';
import { analyseCv } from '../src/lib/cvAnalysis.ts';

const env = readFileSync('.env.local', 'utf8');
for (const line of env.split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const parser = new PDFParse({ data: new Uint8Array(readFileSync('public/trainer/Abdulraheem-Alsaka-CV.pdf')) });
const cv = (await parser.getText()).text;
await parser.destroy?.();

const jd = `Senior QA Automation Engineer — Amman.
We need someone to own our test automation: Playwright and Cypress suites,
API testing, CI/CD with GitHub Actions, Docker, and Kubernetes. You will lead
two junior engineers, define the test strategy, and work with product on
requirements. Experience with performance testing (k6 or JMeter) and with
AWS is required. ISTQB certification preferred.`;

const t0 = Date.now();
const r = await analyseCv({ cv, jobDescription: jd, locale: 'ar' });
console.log(`الوقت: ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
console.log(`النتيجة: ${r.score}%  — ${r.verdict}\n`);
console.log('التفصيل:', JSON.stringify(r.breakdown));
console.log('\nنقاط القوة:'); r.strengths.forEach((s) => console.log('  • ' + s));
console.log('\nالفجوات:'); r.gaps.forEach((s) => console.log('  • ' + s));
console.log('\nكلمات ناقصة:', r.missingKeywords.join('، '));
console.log('\nتوصيات:'); r.recommendations.forEach((s) => console.log('  • ' + s));
