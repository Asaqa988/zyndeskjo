/**
 * The full syllabus of the AI Automation & n8n course.
 *
 * Kept apart from `course-facts.ts` on purpose: the facts file holds the
 * commercial terms (fee, dates, refund policy) that must never drift between
 * the website and the WhatsApp agent, while this is the teaching content. It
 * changes on a different schedule and for different reasons.
 *
 * The assistant quotes from this when someone asks what the course actually
 * covers — previously listed as something it did not know, which meant the
 * most natural follow-up to "how much is it?" had no answer.
 */

export const COURSE_CURRICULUM = `
## منهاج الكورس

### البداية ودخول عالم الـ AI Automation
- تعريف بالمجال وفرص الربح منه
- تجهيز n8n على VPS جاهز خلال دقائق (بدون تعقيد)

### ربط الأدوات والصلاحيات — Credentials
- إعداد OpenAI وربطه مع n8n
- ربط Google Sheets و Drive و Gmail و Calendar
- إعداد OpenRouter للوصول لنماذج متعددة من منصة واحدة
- ربط Google Gemini
- ربط خدمات Microsoft و Outlook
- ربط ElevenLabs لتحويل النص إلى صوت

### أساسيات n8n من الصفر
- ما هو n8n وكيف يعمل، وجولة كاملة داخل الواجهة
- الـ Triggers: Manual و Scheduling و Form Submission
- On Chat Trigger — بناء أول AI Agent
- إعطاء الـ Agent أدوات حقيقية (Using Tools) لينفّذ مهام لا أن يحادث فقط
- IF Node و Switch Node لاتخاذ القرارات وتعدّد المسارات
- Webhook — استقبال البيانات من أي نظام خارجي
- قراءة الأخطاء وحل مشاكل الـ Workflows
- جولة على أهم الـ Nodes
- Loop و Wait و Aggregate و Split Out
- Merge و Limit و Data Filtering
- Google Sheets داخل n8n: قراءة وإضافة وتعديل

### مهارات n8n المتقدمة
- بناء وإدارة الـ Automations باحتراف
- تطبيقات عملية لترسيخ المفاهيم
- إدارة الـ Workflows في n8n 2026 (Publish / Unpublish)

### مشاريع حقيقية — البريد والمحادثات
- AI Email Assistant يقرأ الرسائل ويرد تلقائياً
- أول Chatbot على Facebook Messenger، وتحديثات Meta Developers 2026
- تمييز الرسائل نصاً وصوتاً وصورة والتعامل مع كلٍّ حسب نوعه
- Voice-to-Voice — استلام رسالة صوتية والرد بصوت
- تحليل الصور وتوليدها داخل الـ Workflow
- Human Handover — إيقاف البوت عند طلب العميل موظفاً
- نظام متكامل لاستقبال طلبات العملاء (Order Automation)

### WhatsApp و Telegram وأتمتة الأعمال
- أول WhatsApp AI Chatbot، وتطويره لاستقبال الطلبات
- WhatsApp Receptionist للمطاعم
- Telegram AI Chatbot من الصفر
- Clinic Automation للعيادات والخدمات الطبية
- Logic متقدم: IF + ELSE + OR
- استخراج بيانات العملاء لأي نشاط تجاري
- تعريف الـ Agent بالتاريخ والوقت الحالي
- Output Parser — إجبار الـ Agent على مخرجات منظّمة
- cURL و Web Scraping والتعامل مع الـ APIs
- Store Credentials و Header Auth
- AI Document Analyzer لملفات PDF و Text و Excel
- استخراج محتوى المواقع وتحليله تلقائياً
- تحديثات Gemini 2026
- كيف تحصل على Credentials العميل بالطريقة الصحيحة
- RAG باستخدام Pinecone — استرجاع من قاعدة معرفة خاصة
- حل مشكلة الـ Infinite Loop
- MCP Server مع n8n

### كورس الاحتراف — SaaS ومتعدّد العملاء
- بناء منصة تشبه ManyChat للتعليقات والرسائل على Instagram و Facebook
- Facebook Comment Automation بدون استضافة أو دومين
- Multi-Client SaaS — ابنِ النظام مرة واربطه بعدد غير محدود من العملاء
- إدارة اشتراكات العملاء والحدود الشهرية، وتخصيص الإعدادات لكل عميل
- Smart Keyword Automation — شروط مختلفة لكل منشور
- Multi-Client WhatsApp Platform + واجهة شبيهة بواتساب ويب
- أتمتة متقدمة لـ Facebook و Instagram: Like تلقائي، والرد على تعليقات الإعلانات (Dark Ads)
- **هدية:** تحديثات متقدمة للنظام وسكريبتان برمجيان إضافيان

### أتمتة السوشال ميديا
- نشر تلقائي على Facebook و Instagram و YouTube
- أتمتة عملية إنتاج ونشر المحتوى بالكامل

### المواقع والمتاجر الإلكترونية
- ربط AI Agent بقاعدة البيانات مباشرة
- Website AI Chatbot مربوط بموقعك
- WordPress — النشر التلقائي وتحديث المحتوى القديم
- WooCommerce — التعريف بالمنتجات وإنشاء الطلبات والاستعلام عنها
- EasyOrders
- Shopify AI Automation وتحديث 2026، مع حل مشكلة حقيقية لعميل خطوة بخطوة

### من المهارة إلى العميل
- ٦ طرق للحصول على أول عميل، وكيف تسعّر خدمة الأتمتة
- Website Chatbot مع MySQL لمتابعة المحادثات
- AI Image Comparison — مطابقة صورة منتج مع قاعدة المنتجات
- تحليل Screenshot بالذكاء الاصطناعي (مثال: إثبات تحويل Instapay)
- WhatsApp Templates للرسائل الترويجية
- Multi-Agent System — فريق من الـ Agents يعملون معاً
- SEO Automation Workflow
- Google Sheets Trigger
- ربط Claude مع n8n
- Media Buying Automation — تحليل الحسابات الإعلانية واستخراج النتائج

### النتيجة النهائية

بنهاية الكورس يكون الطالب قادراً على بناء AI Automations حقيقية للشركات
والعملاء، وربط WhatsApp و Facebook و Instagram و Telegram والمواقع والمتاجر
وقواعد البيانات ونماذج الذكاء الاصطناعي في أنظمة متكاملة — وعلى تحويل هذه
المهارات إلى خدمات قابلة للبيع، والعمل مع أكثر من عميل، وبناء أنظمة SaaS خاصة.

### إذا سُئلت عن شيء ليس في المنهاج

قل بوضوح إنه **غير مشمول في هذا الكورس** قبل أي شيء آخر. لا تبدأ بـ«نعم»
ولا تحوّل الحديث إلى خبرة عبدالرحيم أو خدمات Zyndesk بطريقة توحي أن الكورس
يغطّيه — الطالب سيسجّل بناءً على جوابك، ولا يوجد استرجاع للرسوم بعد الدفع.

بعد أن توضّح أنه غير مشمول، لك أن تذكر ما يغطّيه الكورس فعلاً في المجال نفسه.
`.trim();
