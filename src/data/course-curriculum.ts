/**
 * The syllabus of the QA Manual & Automation course, as the assistants read it.
 *
 * Kept apart from `course-facts.ts` on purpose: the facts file holds the
 * commercial terms (fee, dates) that must never drift between the website and
 * the WhatsApp agent, while this is the teaching content. It changes on a
 * different schedule and for different reasons.
 *
 * It is a self-contained string rather than being generated from
 * `qa-course.ts`, because `scripts/make-agent-kb.mjs` loads this file directly
 * with Node, which cannot resolve the `@/` alias. The hours and module titles
 * must match `qa-course.ts` and the syllabus
 * (public/qa-course-syllabus.docx) — 86 hours in total.
 *
 * This replaces the earlier course's curriculum. That course's lesson list
 * still lives in `src/data/course/course.ts`, which the student platform reads.
 */

export const COURSE_CURRICULUM = `
## منهاج الكورس

تسع وحدات، ٢٩ محاضرة، ٨٦ ساعة. كل وحدة تنتهي بمهمة عملية مُقيّمة، وأربع وحدات
تنتهي بنقطة تحقّق (checkpoint).

### الوحدة ١ — أساسيات الجودة والاختبار اليدوي (١٥ ساعة)
مبادئ الاختبار، SDLC وSTLC، الجودة في فرق Agile، تحليل المتطلبات والاختبار
الساكن، تقنيات تصميم الاختبارات (تقسيم التكافؤ، القيم الحدّية، جداول القرار،
انتقال الحالات)، سيناريوهات وحالات الاختبار، خطة اختبار مبنية على المخاطر، Jira،
الاختبار الاستكشافي، تقارير الأخطاء، Chrome DevTools، واختبار API يدوياً عبر Postman.

### الوحدة ٢ — أساسيات TypeScript وGit (٩ ساعات)
البرمجة اللي تحتاجها للأتمتة وبس: الأنواع، الدوال، async/await، JSON، سكربتات npm،
Git وGitHub. لا يلزم خبرة برمجة سابقة.

### الوحدة ٣ — أساسيات Playwright (١٢ ساعة)
الـ Locators، التحققات (web-first assertions)، النماذج والإطارات ورفع الملفات،
UI mode، codegen، وتتبع الأخطاء عبر Trace Viewer.

### الوحدة ٤ — بناء إطار اختبار موثوق (٩ ساعات)
نمط Page Object، الـ fixtures، حالة تسجيل الدخول، عزل بيانات الاختبار، التشغيل
المتوازي، وحل الاختبارات غير المستقرة (flaky tests).

### الوحدة ٥ — اختبار API والواجهات وإمكانية الوصول (٩ ساعات)
اختبارات API عبر Playwright، التحقق من الـ schema، محاكاة الشبكة، الاختبار البصري
(visual regression)، وفحص إمكانية الوصول آلياً.

### الوحدة ٦ — الاختبار بمساعدة الذكاء الاصطناعي (٦ ساعات)
متى يفيد الذكاء الاصطناعي في الـ QA ومتى لا يفيد، استخراج أفكار اختبار من
المتطلبات، توليد بيانات اختبار، كتابة كود Playwright بمساعدة المساعدات الذكية
ثم مراجعته وتصحيحه، Playwright MCP ووكلاء الاختبار، وخصوصية البيانات وإبقاء
الأسرار خارج الـ prompts.

### الوحدة ٧ — Docker وCI/CD (٩ ساعات)
تشغيل الاختبارات داخل containers ومع كل push عبر GitHub Actions: Dockerfile،
Docker Compose، صورة Playwright الرسمية، حفظ التقارير، الأسرار (secrets)،
وشارة الحالة (status badge).

### الوحدة ٨ — أتمتة n8n وفرز الأخطاء بالذكاء الاصطناعي (٩ ساعات)
تشغيل n8n بـ Docker، تشغيل الاختبارات تلقائياً من webhook أو جدول زمني، التفرّع
حسب النتيجة، التنبيهات عبر Telegram أو Slack أو الإيميل، وتسجيل النتائج في Google
Sheets، وخطوة ذكاء اصطناعي تصنّف الفشل (خطأ في المنتج / اختبار غير مستقر / مشكلة
بيئة) وتكتب مسودة تقرير خطأ يراجعها إنسان قبل رفعها.

### الوحدة ٩ — المشروع النهائي والتجهيز للشغل (٨ ساعات)
دمج كل المكونات، توثيق المشروع وعرضه مباشرة، مراجعة الكود بين الزملاء، تجهيز
السيرة الذاتية وملف LinkedIn، أسئلة المقابلات الشائعة، والخطوات التالية نحو
ISTQB Foundation.

## ماذا سيبني الطالب

- خطة اختبار وحالات اختبار وتقارير أخطاء حقيقية (٢٠ حالة يدوية على الأقل و٣ تقارير)
- إطار Playwright وTypeScript فيه ٢٠ اختباراً آلياً على الأقل (١٤ واجهة و٦ API)
- إعداد Docker وGitHub Actions pipeline شغّال
- Workflow على n8n يشغّل الاختبارات ويفرز الأخطاء بالذكاء الاصطناعي وينبّه الفريق
- مستودع GitHub عام وعرض مباشر للمقابلات

## التقييم

- المهام العملية ونقاط التحقق: ٤٠٪
- المشروع النهائي: ٤٠٪
- اختبارات المعرفة القصيرة: ١٠٪
- العرض المباشر للمشروع: ١٠٪
`.trim();
