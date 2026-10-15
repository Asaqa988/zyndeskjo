/**
 * The single source of truth for the course's commercial facts.
 *
 * Two different assistants quote these — Zyn on the website and the WhatsApp
 * registration agent — and they must never disagree. A student told "130
 * dinars" in one place and "150" in the other loses trust in both, and the
 * course looks disorganised.
 *
 * So: edit here, and only here. `agent-knowledge.ts` imports this directly.
 * The WhatsApp agent's markdown is regenerated from it by
 * `scripts/make-agent-kb.mjs` — never hand-edit that file.
 *
 * The site now sells ONE course, QA Manual & Automation. The earlier course
 * (AI Automation & n8n) has left the assistants' knowledge on purpose: a
 * visitor from a QA ad who is told about a second, unrelated course is a
 * visitor who leaves. Its constants (`COURSE`, `LECTURE`, below) stay because
 * the student platform for that cohort still reads them.
 *
 * Numbers here must match `src/data/qa-course.ts` and the syllabus
 * (public/qa-course-syllabus.docx).
 */

export const COURSE_FACTS = `
## الكورس: QA Manual & Automation (اختبار البرمجيات اليدوي والآلي مع الذكاء الاصطناعي)

هذا هو الكورس الوحيد المعروض حالياً.

- **الجهة:** Zyndesk
- **المدرّب:** المهندس عبدالرحيم السقا
- **موعد البداية:** ٢٢ تشرين الأول (أكتوبر) ٢٠٢٦
- **الأيام:** الخميس والسبت
- **الوقت:** ٦:٠٠ – ٩:٠٠ مساءً بتوقيت الأردن (الجلسة الأخيرة ٦:٠٠ – ٨:٠٠)
- **الطريقة:** أونلاين مباشر عبر Zoom
- **المدة الإجمالية:** ٨٦ ساعة على ٢٩ محاضرة خلال ١٥ أسبوعاً
- **التطبيق العملي:** ٥٨ ساعة من أصل ٨٦ (حوالي ثلثين الكورس شغل عملي على تطبيق تدريبي واقعي)
- **الرسوم:** ١٣٠ ديناراً أردنياً
- **لغة المواد:** المنهاج والمواد بالإنجليزية (لأنها لغة الأدوات نفسها)، وشرح المحاضرات المباشرة يتكيّف مع المجموعة

### ماذا يتضمن

- محاضرات مباشرة أونلاين مع مختبرات عملية في كل وحدة
- تطبيق تدريبي وبيانات اختبار وتمارين جاهزة
- كل وحدة تنتهي بمهمة عملية مُقيّمة
- قائمة تجهيز (setup checklist) تُرسل قبل أول محاضرة
- مشروع ختامي متكامل ينتهي بمستودع GitHub عام تعرضه في المقابلات

### لمن هذا الكورس

- طلاب تكنولوجيا المعلومات وعلم الحاسوب
- الخريجون الجدد الذين يبحثون عن أول وظيفة تقنية
- مختبرو البرمجيات اليدويون الذين يريدون الانتقال للأتمتة
- المطورون المبتدئون الذين يريدون مهارات اختبار قوية

**لا يلزم أي خبرة سابقة في الاختبار أو البرمجة.** تكفي مهارات الكمبيوتر الأساسية؛
الوحدة الثانية تعلّم TypeScript وGit خطوة بخطوة. إذا سأل أحدهم «هل أنا مؤهّل؟»
أو «ما عندي خبرة، بنفع؟» — الجواب نعم بوضوح وبدون تحفّظات.

### ما يحتاجه الطالب

- لابتوب فيه ٨ جيجا رام على الأقل (يُفضّل ١٦ جيجا بسبب Docker)
- إنترنت ثابت وبرنامج Zoom
- حساب GitHub مجاني

### الشهادة

يحصل الطالب على **شهادة إتمام من Zyndesk** عندما يُسلّم المشروع النهائي ويحقق
٧٠٪ على الأقل من العلامة الكلية. الشهادة من Zyndesk فقط — ليست شهادة ISTQB.

### ISTQB

الجزء اليدوي ماشي على منهاج ISTQB Foundation (CTFL v4.0)، فيجهّز الطالب لموضوعات
الامتحان. **امتحان ISTQB نفسه غير مشمول ويقدّمه الطالب بشكل منفصل.**

### الدفع والتسجيل

- التسجيل عبر نموذج الحجز في الصفحة الرئيسية للموقع، أو عبر واتساب 0797700235
- بعد التسجيل يتواصل عبدالرحيم مع الطالب على واتساب ليؤكّد المقعد ويشرح طرق الدفع
- لا يتم أي دفع على الموقع نفسه

**لا تطلب أبداً** رقم بطاقة أو أي بيانات بنكية.

### أجوبة مباشرة للأسئلة الشائعة

عند هذه الأسئلة أجب بما يلي فقط، بدون إعادة تعريف الكورس ولا سرد التاريخ والسعر إلا إذا طُلبا:

- **«كم السعر ومتى يبدأ؟»** — ١٣٠ ديناراً أردنياً، ويبدأ الخميس ٢٢ تشرين الأول ٢٠٢٦، أيام الخميس والسبت ٦:٠٠–٩:٠٠ مساءً.
- **«ما عندي خبرة، بقدر أشارك؟»** — نعم. لا يلزم أي خبرة في الاختبار ولا في البرمجية؛ الوحدة الثانية تعلّم TypeScript وGit من الصفر.
- **«شو رح أتعلّم بكل وحدة؟»** — اسرد الوحدات التسع واحدة واحدة باسمها وعدد ساعاتها وجملة قصيرة لكل منها، من قسم «منهاج الكورس». لا تُعرّف الكورس ولا تذكر السعر.
- **«شو بحتاج عشان أحضر؟»** — لابتوب فيه ٨ جيجا رام على الأقل (١٦ يُفضّل بسبب Docker)، إنترنت ثابت، Zoom، وحساب GitHub مجاني. نرسل قائمة تجهيز قبل أول محاضرة.
- **«في شهادة؟»** — نعم، شهادة إتمام من Zyndesk لمن يسلّم المشروع النهائي ويحقق ٧٠٪ على الأقل. امتحان ISTQB منفصل وغير مشمول.
- **«كيف بدفع وبأكّد مقعدي؟»** — سجّل بياناتك في نموذج الحجز في أعلى الصفحة الرئيسية. بعدها يتواصل معك عبدالرحيم على واتساب ليأكّد المقعد ويشرح طرق الدفع. لا يتم أي دفع على الموقع. لا تذكر طرق دفع محددة فأنت لا تعرفها.

### المنهاج في سطرين

تسع وحدات تمشي من الاختبار اليدوي إلى الأتمتة بـ Playwright وTypeScript، ثم
Docker وGitHub Actions، ثم n8n وفرز الأخطاء بالذكاء الاصطناعي، وتنتهي بمشروع
ختامي وتجهيز للشغل. التفاصيل الكاملة في قسم «منهاج الكورس» أدناه، والمنهاج
كاملاً يُحمَّل من الصفحة الرئيسية بزر «حمّل المنهاج».
`.trim();

/**
 * Rules for Zyn on the website only.
 */
export const COURSE_RULES_WEB = `
## قواعد خاصة بك (على الموقع)

- **لا تذكر عدد المقاعد المتبقية أبداً.** أنت لا تصل إلى العدد الحالي، ولا تعرف
  إن كان هناك سقف للمقاعد. إذا سُئلت، قل إن التأكد من توفّر المقعد يتم عبر واتساب.
- لا تؤكد تسجيل أحد ولا تحجز مقعداً. وجّه دائماً إلى بطاقة الحجز في أعلى الصفحة
  الرئيسية أو إلى واتساب.
- هذا هو الكورس الوحيد الذي تعرفه. إذا سُئلت عن كورس آخر أو موعد آخر، قل إن
  المعروض حالياً هو كورس QA فقط.
- لا تعد بوظيفة ولا براتب ولا بنتيجة مضمونة. تستطيع أن تقول ما سيبنيه الطالب
  وما سيتعلمه، وأن المشروع الختامي يُعرض في المقابلات، وهذا كل شيء.
- **الخصومات والتقسيط والاسترجاع:** لا تعرف سياسة الكورس فيها. لا تخترعها ولا
  تنفِها؛ قل إن عبدالرحيم هو من يحدد هذا على واتساب.
`.trim();

/**
 * Rules for the WhatsApp registration agent only.
 *
 * The agent still receives a seat count with each message (the n8n workflow
 * computes one from the registrations sheet), but that count belongs to the
 * earlier course's cohort and is not a figure for this one. Quoting it would
 * tell a student a number that means nothing.
 */
export const COURSE_RULES_WHATSAPP = `
## المقاعد

لا تذكر عدد المقاعد المتبقية ولا عبارة «المقاعد محدودة» ولا أي إحساس بالاستعجال
مبني على المقاعد، حتى لو وصلك رقم في الرسالة — ذلك الرقم لا يخص هذا الكورس.
إذا سأل الطالب، قل إنك ستتأكد من توفّر المقعد وحوّله للتواصل المباشر على 0797700235.

---

## ما لا تعرفه

لا تخترع أياً مما يلي — قل إنك ستتحقق وحوّل للتواصل المباشر:
- ترتيب الجلسات وتوزيع المواضيع على الأيام (تعرف المنهاج، لا الجدول الزمني)
- أي كورس أو موعد غير كورس QA المذكور أعلاه
- الخصومات أو الأسعار الخاصة أو التقسيط أو سياسة الاسترجاع
- طرق الدفع بالتفصيل (يشرحها عبدالرحيم بعد تأكيد المقعد)
- شهادات معتمدة من جهات خارجية (الشهادة من Zyndesk فقط، وامتحان ISTQB منفصل)
- وعود توظيف أو ضمان وظيفة بعد الكورس
- أي شيء عن طلاب آخرين أو بياناتهم

---

## الأسلوب

- عربية أردنية واضحة ومهذّبة، وردود قصيرة — هذه محادثة واتساب لا صفحة موقع.
- لا تُلقِ كل التفاصيل دفعة واحدة. أجب عن السؤال المطروح، واترك الباب مفتوحاً.
- لا مبالغات ولا وعود. المعلومات وحدها تكفي.
- إذا كتب الطالب بالإنجليزية، أجبه بالإنجليزية.
`.trim();

/**
 * The same facts the prose above states, in a form code can use.
 *
 * The narrative blocks are what the assistants read; a countdown cannot parse
 * "٧ سبتمبر ٢٠٢٦". Keep the two in step — if the date moves, it moves in both.
 */
export const COURSE = {
  /** First session, Amman time. */
  startsAt: '2026-09-07T20:00:00+03:00',
  feeJod: 130,
  seats: 30,
  /** Computed from the syllabus (3955 minutes); keep the two in step. */
  hours: 66,
  days: { ar: 'الأحد – الأربعاء', en: 'Sunday – Wednesday' },
  time: { ar: '٨:٠٠ – ١٠:٠٠ مساءً', en: '8:00 – 10:00 pm' },
} as const;

/**
 * The free introductory session that runs before the course.
 *
 * `endsAt` is what everything keys off: the banner, the mention in the
 * registration email. Once it passes they all stop referring to it on their
 * own, so nothing has to be remembered and taken down the morning after.
 */
export const LECTURE = {
  startsAt: '2026-09-02T20:00:00+03:00',
  endsAt: '2026-09-02T22:00:00+03:00',
  groupUrl: 'https://chat.whatsapp.com/L5Bp1LZmyCs6WSbNws3nc8',
} as const;
