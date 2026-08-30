/**
 * Regenerates the WhatsApp agent's knowledge base from the shared course facts.
 *
 * `src/data/course-facts.ts` is the single source of truth — the website
 * assistant imports it directly, and this script writes the markdown that gets
 * pasted into the n8n "Build prompt" node. That keeps the fee, the dates and
 * the refund policy identical on both channels.
 *
 *   node scripts/make-agent-kb.mjs
 *
 * Do not hand-edit n8n/course-agent-knowledge.md — this overwrites it.
 */

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { COURSE_FACTS, COURSE_RULES_WHATSAPP } = await import(
  pathToFileURL(resolve(root, 'src/data/course-facts.ts')).href
);

const { COURSE_CURRICULUM } = await import(
  pathToFileURL(resolve(root, 'src/data/course-curriculum.ts')).href
);

const OUT = resolve(root, 'n8n/course-agent-knowledge.md');

// The shared block is written for both channels, so its heading is generic.
// WhatsApp wants the course named up front — it is the whole conversation.
const facts = COURSE_FACTS.replace(
  '## الكورس: AI Automation & n8n',
  '## الكورس\n\n- **الاسم:** AI Automation & n8n'
);

const doc = `<!-- مُولَّد من src/data/course-facts.ts — لا تعدّل هنا.
     عدّل هناك ثم: node scripts/make-agent-kb.mjs -->

# قاعدة معرفة وكيل واتساب — كورس AI Automation & n8n

هذه هي المعلومات الوحيدة المسموح للوكيل أن يجيب منها. أي شيء غير مذكور هنا،
يقول إنه لا يعرفه ويحوّل للتواصل المباشر — ولا يخمّن أبداً.

---

${facts}

---

${COURSE_CURRICULUM}

---

${COURSE_RULES_WHATSAPP}
`;

writeFileSync(OUT, doc, 'utf8');
console.log(`كُتب ${OUT}`);
console.log(`${doc.length} حرفاً`);
