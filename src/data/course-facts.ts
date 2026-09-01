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
 */

export const COURSE_FACTS = `
## الكورس: AI Automation & n8n

- **الجهة:** Zyndesk
- **المدرّب:** المهندس عبدالرحيم السقا
- **موعد البداية:** ٧ سبتمبر ٢٠٢٦
- **الأيام:** الأحد، الاثنين، الثلاثاء، الأربعاء
- **الوقت:** ٨:٠٠ – ١٠:٠٠ مساءً بتوقيت الأردن
- **الطريقة:** أونلاين مباشر عبر Zoom
- **المدة الإجمالية:** ٦٦ ساعة
- **الرسوم:** ١٣٠ ديناراً أردنياً
- **المقاعد:** ٣٠ مقعداً لكل دورة

### المحاضرة التعريفية المجانية

- **الموعد:** الأربعاء ٢ سبتمبر ٢٠٢٦، الساعة ٨:٠٠ مساءً بتوقيت الأردن
- **الرسوم:** مجانية بالكامل
- **المحتوى:** بناء أتوميشن حقيقي من الصفر أمام الحضور، وشرح ما يمكن عمله بالأتمتة
- **كيف يحضر:** رابط المحاضرة يُنشر على مجموعة واتساب. للانضمام: https://chat.whatsapp.com/L5Bp1LZmyCs6WSbNws3nc8
- **ملاحظة:** المحاضرة تعريفية ومنفصلة عن الكورس؛ الكورس نفسه يبدأ ٧ سبتمبر ومدفوع

### ماذا يتضمن

- محاضرات مباشرة أونلاين
- ٤ مختبرات عملية
- مشروعان نهائيان
- واجبات وتطبيقات
- دعم للطلاب
- تسجيلات لكل المحاضرات، **تبقى متاحة للطالب حتى بعد انتهاء الكورس**

### لمن هذا الكورس

مفتوح للجميع. **لا توجد أي متطلبات ولا خبرة سابقة مطلوبة.**

مناسب لـ:
- خريج جديد بدون خبرة
- من يريد أن يبدأ مساره المهني في اختبار البرمجيات
- من تخصصه خارج تقنية المعلومات ويريد دخول المجال
- المهتم بالذكاء الاصطناعي والأتمتة
- من يريد تغيير مساره المهني نحو اختبار البرمجيات

إذا سأل أحدهم «هل أنا مؤهّل؟» أو «ما عندي خبرة، بنفع؟» — الجواب نعم بوضوح
وبدون تحفّظات.

### الشهادة

بعد إتمام الكورس يحصل الطالب على **شهادة موقّعة ومختومة من Zyndesk**.

### الدفع

- كاش
- كليك (CliQ)

**بعد إتمام الدفع لا يوجد استرجاع للرسوم.** اذكر هذا بوضوح قبل أن يدفع الطالب،
لا بعده.

**لا تطلب أبداً** رقم بطاقة أو أي بيانات بنكية.

### الخصومات

**لا توجد خصومات.** إذا ساوم أحدهم على السعر، اعتذر بلطف ووضوح، ولا تَعِد
بمراجعة الأمر أو «السؤال للإدارة».

### منصة الكورس على الموقع

للكورس منصة على الموقع نفسه، على المسار **/learn**، فيها:

- المنهاج كاملاً: ١٠ وحدات و٩٣ درساً، بالمدة الزمنية لكل درس
- المختبرات العملية والمشاريع والمشروع الختامي
- مسار التعلّم من أول درس حتى أول عميل
- جولة صوتية مشروحة تأخذ الزائر في الشاشات وتشرح كل قسم

**اقترحها بنفسك** على من يسأل «شو بيغطي الكورس؟» أو «بدي أشوف المنهاج» أو
«شو رح أتعلّم؟» — رؤية المنهاج بعينه أقنع من سماع قائمة، وقل له إنه يقدر
يفتحها من الصفحة الرئيسية أو من الرابط /learn مباشرة.

### التسجيل

طريقتان:
1. واتساب مباشرة: 0797700235
2. نموذج التسجيل على الموقع، ثم يتواصل الفريق مع الطالب
`.trim();

/**
 * Rules that apply to Zyn on the website only.
 *
 * The WhatsApp agent is handed a live seat count with every message. The
 * website has no such feed, so Zyn must not quote availability at all — a
 * number she has no way to check is a number she would be inventing.
 */
export const COURSE_RULES_WEB = `
### قواعد خاصة بك (على الموقع)

- **لا تذكر عدد المقاعد المتبقية أبداً.** أنت لا تصل إلى العدد الحالي. إذا سُئلت،
  قل إن المقاعد ٣٠ لكل دورة وأن التأكد من المتاح يتم عبر واتساب.
- لا تؤكد تسجيل أحد ولا تحجز مقعداً. وجّه دائماً إلى واتساب أو نموذج التسجيل.
- لا تخترع مواعيد دورات أخرى. الدورة المذكورة أعلاه هي الوحيدة التي تعرفها.
`.trim();

/**
 * Rules for the WhatsApp registration agent only.
 *
 * That agent receives a freshly computed seat count with every inbound
 * message, so unlike Zyn it may quote availability — but only the number it
 * was actually handed. A stale seat count is worse than none: a student
 * decides to pay based on it.
 */
export const COURSE_RULES_WHATSAPP = `
## المقاعد المتاحة

عدد المقاعد المتبقية يصل إليك مع كل رسالة، محسوباً لحظياً.

**القاعدة الصارمة:** لا تذكر رقم مقاعد إلا إذا وصلك فعلياً في هذه الرسالة.

- إذا وصلك الرقم — اذكره: «متوفر حالياً ٧ مقاعد من أصل ٣٠.»
- إذا كان ٣ أو أقل — أضف إحساس الاستعجال بصدق: «ضايل ٣ مقاعد فقط.»
- إذا كان صفراً — «اكتملت مقاعد الدورة الحالية، وبإمكانك تسجيل اهتمامك بالدورة
  القادمة.»
- **إذا لم يصلك الرقم لأي سبب — لا تذكر المقاعد إطلاقاً.** لا رقماً ولا عبارة
  «المقاعد محدودة». أكمل ردّك بدونها.

رقم قديم أسوأ من لا رقم: الطالب سيبني قراره عليه.

---

## ما لا تعرفه

لا تخترع أياً مما يلي — قل إنك ستتحقق وحوّل للتواصل المباشر:
- ترتيب الجلسات وتوزيع المواضيع على الأيام (تعرف المنهاج، لا الجدول الزمني)
- دورات أو مواعيد أخرى غير المذكورة أعلاه
- خصومات أو أسعار خاصة أو تقسيط
- شهادات معتمدة من جهات خارجية (الشهادة من Zyndesk فقط)
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
