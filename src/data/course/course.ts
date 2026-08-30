import type { Course, Lab, Module, Project, JourneyNode } from './types';

/**
 * The real syllabus of "AI Automation & n8n".
 *
 * Mirrors src/data/course-curriculum.ts — that file is what the assistant
 * reads when a visitor asks what the course covers; this one is what the
 * platform renders. Both come from the same published index, so a change to
 * the curriculum belongs in both.
 *
 * Lesson durations add up to roughly the 60–80 hours the course is sold as.
 * Keep that true when adding lessons: the platform shows the total, and a
 * student will compare it against what they paid for.
 *
 * Progress is hard-coded partway through Module 3 so the dashboard has
 * something honest to show — things finished, one thing in flight, and things
 * still ahead.
 */

const modules: Module[] = [
  {
    id: 'm1',
    slug: 'getting-started',
    order: 1,
    icon: 'Rocket',
    status: 'completed',
    title: { en: 'Entering the world of AI Automation', ar: 'الدخول إلى عالم الـ AI Automation' },
    summary: {
      en: 'What this field actually is, where the money is, and a working n8n in minutes.',
      ar: 'شو هو هذا المجال فعلاً، وين الربح فيه، و n8n شغّال خلال دقائق.',
    },
    stack: ['n8n', 'VPS'],
    lessons: [
      { id: 'm1l1', slug: 'what-is-ai-automation', kind: 'video', minutes: 36, status: 'completed', title: { en: 'What AI Automation is — and how it pays', ar: 'شو هو AI Automation — وكيف بيرجّع دخل' } },
      { id: 'm1l2', slug: 'vps-with-n8n', kind: 'video', minutes: 43, status: 'completed', title: { en: 'Start without the pain: a VPS with n8n preinstalled', ar: 'ابدأ بدون تعقيد: VPS مع n8n مثبّت مسبقاً' } },
      { id: 'm1l3', slug: 'your-workspace', kind: 'lab', minutes: 50, status: 'completed', title: { en: 'Lab — get your own environment running', ar: 'مختبر — شغّل بيئة عملك' } },
    ],
  },
  {
    id: 'm2',
    slug: 'credentials',
    order: 2,
    icon: 'KeyRound',
    status: 'completed',
    title: { en: 'Connecting your tools — Credentials', ar: 'ربط الأدوات والصلاحيات — Credentials' },
    summary: {
      en: 'Every integration the rest of the course leans on, connected once and connected properly.',
      ar: 'كل تكامل رح يعتمد عليه باقي الكورس، مربوط مرة وحدة وبطريقة صحيحة.',
    },
    stack: ['OpenAI', 'Google', 'OpenRouter', 'Gemini'],
    lessons: [
      { id: 'm2l1', slug: 'openai', kind: 'video', minutes: 31, status: 'completed', title: { en: 'OpenAI, wired into n8n', ar: 'إعداد OpenAI وربطه مع n8n' } },
      { id: 'm2l2', slug: 'google-suite', kind: 'video', minutes: 52, status: 'completed', title: { en: 'Google Sheets, Drive, Gmail and Calendar', ar: 'ربط Google Sheets و Drive و Gmail و Calendar' } },
      { id: 'm2l3', slug: 'openrouter', kind: 'video', minutes: 29, status: 'completed', title: { en: 'OpenRouter — many models, one connection', ar: 'OpenRouter — نماذج كثيرة باتصال واحد' } },
      { id: 'm2l4', slug: 'gemini', kind: 'video', minutes: 27, status: 'completed', title: { en: 'Google Gemini inside your workflows', ar: 'ربط Gemini داخل الـ Workflows' } },
      { id: 'm2l5', slug: 'microsoft', kind: 'video', minutes: 34, status: 'completed', title: { en: 'Outlook and Microsoft services', ar: 'ربط Outlook وخدمات Microsoft' } },
      { id: 'm2l6', slug: 'elevenlabs', kind: 'video', minutes: 30, status: 'completed', title: { en: 'ElevenLabs — real voices in your automations', ar: 'ElevenLabs — أصوات واقعية داخل الأتمتة' } },
    ],
  },
  {
    id: 'm3',
    slug: 'n8n-fundamentals',
    order: 3,
    icon: 'Workflow',
    status: 'in-progress',
    title: { en: 'n8n from zero', ar: 'أساسيات n8n من الصفر' },
    summary: {
      en: 'Triggers, decisions, webhooks and data handling — and your first AI agent with real tools.',
      ar: 'المشغّلات والقرارات والـ webhooks ومعالجة البيانات — وأول AI Agent بأدوات حقيقية.',
    },
    stack: ['n8n', 'Webhooks', 'AI Agent'],
    lessons: [
      { id: 'm3l1', slug: 'what-is-n8n', kind: 'video', minutes: 28, status: 'completed', title: { en: 'n8n simply: what it is and how it works', ar: 'n8n ببساطة: ما هو وكيف يعمل' } },
      { id: 'm3l2', slug: 'interface-tour', kind: 'video', minutes: 38, status: 'completed', title: { en: 'A full tour of the n8n interface', ar: 'جولة كاملة داخل واجهة n8n' } },
      { id: 'm3l3', slug: 'triggers', kind: 'video', minutes: 34, status: 'completed', title: { en: 'Triggers — starting a workflow by itself', ar: 'Triggers — كيف يبدأ الـ Workflow تلقائياً' } },
      { id: 'm3l4', slug: 'form-trigger', kind: 'video', minutes: 27, status: 'completed', title: { en: 'Form Submission Trigger', ar: 'Form Submission Trigger' } },
      { id: 'm3l5', slug: 'first-ai-agent', kind: 'video', minutes: 54, status: 'completed', title: { en: 'On Chat Trigger — build your first AI agent', ar: 'On Chat Trigger — ابنِ أول AI Agent' } },
      { id: 'm3l6', slug: 'agent-tools', kind: 'video', minutes: 49, status: 'in-progress', title: { en: 'Giving the agent real tools', ar: 'إعطاء الـ Agent أدوات حقيقية' } },
      { id: 'm3l7', slug: 'if-node', kind: 'video', minutes: 25, status: 'available', title: { en: 'IF Node — let the workflow decide', ar: 'IF Node — خلّي الـ Workflow يقرّر' } },
      { id: 'm3l8', slug: 'switch-node', kind: 'video', minutes: 27, status: 'available', title: { en: 'Switch Node — more than one path', ar: 'Switch Node — أكثر من مسار' } },
      { id: 'm3l9', slug: 'webhooks', kind: 'video', minutes: 43, status: 'available', title: { en: 'Webhook — receiving data from any system', ar: 'Webhook — استقبال البيانات من أي نظام' } },
      { id: 'm3l10', slug: 'debugging', kind: 'reading', minutes: 31, status: 'available', title: { en: 'Reading errors and fixing broken workflows', ar: 'اكتشاف الأخطاء وحل مشاكل الـ Workflows' } },
      { id: 'm3l11', slug: 'key-nodes', kind: 'video', minutes: 45, status: 'available', title: { en: 'The nodes you will use every day', ar: 'أهم الـ Nodes اللي رح تستخدمها باستمرار' } },
      { id: 'm3l12', slug: 'loop-wait-aggregate', kind: 'video', minutes: 50, status: 'locked', title: { en: 'Loop, Wait, Aggregate and Split Out', ar: 'Loop و Wait و Aggregate و Split Out' } },
      { id: 'm3l13', slug: 'merge-limit-filter', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Merge, Limit and data filtering', ar: 'Merge و Limit و Data Filtering' } },
      { id: 'm3l14', slug: 'sheets-in-n8n', kind: 'video', minutes: 43, status: 'locked', title: { en: 'Google Sheets inside n8n', ar: 'Google Sheets داخل n8n' } },
      { id: 'm3l15', slug: 'first-workflow', kind: 'lab', minutes: 67, status: 'locked', title: { en: 'Lab — form to sheet to inbox', ar: 'مختبر — فورم إلى شيت إلى بريد' } },
    ],
  },
  {
    id: 'm4',
    slug: 'n8n-advanced',
    order: 4,
    icon: 'Settings2',
    status: 'available',
    title: { en: 'Advanced n8n skills', ar: 'مهارات n8n المتقدمة' },
    summary: {
      en: 'From building workflows to running and maintaining them like a professional.',
      ar: 'من بناء الـ Workflows إلى تشغيلها وإدارتها باحتراف.',
    },
    stack: ['n8n'],
    lessons: [
      { id: 'm4l1', slug: 'zero-to-pro', kind: 'video', minutes: 58, status: 'available', title: { en: 'n8n from beginner to professional', ar: 'n8n من البداية إلى الاحتراف' } },
      { id: 'm4l2', slug: 'practical-drills', kind: 'lab', minutes: 62, status: 'locked', title: { en: 'Lab — practical drills on the fundamentals', ar: 'مختبر — تطبيقات عملية على الأساسيات' } },
      { id: 'm4l3', slug: 'publish-unpublish', kind: 'video', minutes: 29, status: 'locked', title: { en: 'Managing workflows in n8n 2026: publish and unpublish', ar: 'إدارة الـ Workflows في n8n 2026: Publish و Unpublish' } },
    ],
  },
  {
    id: 'm5',
    slug: 'email-and-messenger',
    order: 5,
    icon: 'Mail',
    status: 'locked',
    title: { en: 'Real projects — email and Messenger', ar: 'مشاريع حقيقية — البريد و Messenger' },
    summary: {
      en: 'An inbox that answers itself, and a Messenger bot that handles text, voice and images.',
      ar: 'بريد بيرد على حاله، وبوت Messenger بيتعامل مع النص والصوت والصورة.',
    },
    stack: ['Gmail', 'Messenger', 'Meta'],
    lessons: [
      { id: 'm5l1', slug: 'ai-email-assistant', kind: 'video', minutes: 56, status: 'locked', title: { en: 'AI Email Assistant — read and reply automatically', ar: 'AI Email Assistant — يقرأ ويرد تلقائياً' } },
      { id: 'm5l2', slug: 'first-messenger-bot', kind: 'video', minutes: 52, status: 'locked', title: { en: 'Your first Facebook Messenger chatbot', ar: 'أول Chatbot على Facebook Messenger' } },
      { id: 'm5l3', slug: 'meta-developers-2026', kind: 'video', minutes: 34, status: 'locked', title: { en: 'Meta Developers 2026 — what changed', ar: 'Meta Developers 2026 — شو تغيّر' } },
      { id: 'm5l4', slug: 'message-type-detection', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Text, voice or image — knowing what arrived', ar: 'نص أو صوت أو صورة — تعرف شو وصلك' } },
      { id: 'm5l5', slug: 'voice-to-voice', kind: 'video', minutes: 54, status: 'locked', title: { en: 'Voice-to-voice — hear them, answer in voice', ar: 'Voice-to-Voice — تسمعه وترد عليه بصوت' } },
      { id: 'm5l6', slug: 'image-analysis', kind: 'video', minutes: 38, status: 'locked', title: { en: 'Understanding the images a customer sends', ar: 'فهم وتحليل الصور اللي بيبعتها العميل' } },
      { id: 'm5l7', slug: 'image-generation', kind: 'video', minutes: 36, status: 'locked', title: { en: 'Generating images inside the workflow', ar: 'توليد الصور داخل الـ Workflow' } },
      { id: 'm5l8', slug: 'human-handover', kind: 'video', minutes: 43, status: 'locked', title: { en: 'Human handover — stepping aside when asked', ar: 'Human Handover — البوت يتنحّى لما يطلب العميل موظف' } },
      { id: 'm5l9', slug: 'order-automation', kind: 'lab', minutes: 73, status: 'locked', title: { en: 'Lab — turn a conversation into an order', ar: 'مختبر — حوّل المحادثة إلى طلب' } },
    ],
  },
  {
    id: 'm6',
    slug: 'whatsapp-telegram-business',
    order: 6,
    icon: 'MessagesSquare',
    status: 'locked',
    title: { en: 'WhatsApp, Telegram and business automation', ar: 'WhatsApp و Telegram وأتمتة الأعمال' },
    summary: {
      en: 'The channels customers actually use, plus the agent skills that make a bot worth paying for.',
      ar: 'القنوات اللي العملاء فعلاً بيستخدموها، ومهارات الـ Agent اللي بتخلّي البوت يستاهل الدفع.',
    },
    stack: ['WhatsApp', 'Telegram', 'Pinecone', 'MCP'],
    lessons: [
      { id: 'm6l1', slug: 'whatsapp-chatbot', kind: 'video', minutes: 56, status: 'locked', title: { en: 'Build your first WhatsApp AI chatbot', ar: 'ابنِ أول WhatsApp AI Chatbot' } },
      { id: 'm6l2', slug: 'whatsapp-orders', kind: 'video', minutes: 49, status: 'locked', title: { en: 'Taking orders over WhatsApp', ar: 'استقبال الطلبات عبر WhatsApp' } },
      { id: 'm6l3', slug: 'restaurant-receptionist', kind: 'video', minutes: 52, status: 'locked', title: { en: 'A WhatsApp receptionist for restaurants', ar: 'WhatsApp Receptionist للمطاعم' } },
      { id: 'm6l4', slug: 'telegram-bot', kind: 'video', minutes: 47, status: 'locked', title: { en: 'Telegram AI chatbot from scratch', ar: 'Telegram AI Chatbot من الصفر' } },
      { id: 'm6l5', slug: 'clinic-automation', kind: 'video', minutes: 45, status: 'locked', title: { en: 'Clinic automation', ar: 'أتمتة العيادات' } },
      { id: 'm6l6', slug: 'advanced-logic', kind: 'video', minutes: 34, status: 'locked', title: { en: 'IF, ELSE and OR done properly', ar: 'IF و ELSE و OR بشكل احترافي' } },
      { id: 'm6l7', slug: 'customer-data', kind: 'video', minutes: 38, status: 'locked', title: { en: 'Extracting customer data for any business', ar: 'استخراج بيانات العملاء لأي نشاط تجاري' } },
      { id: 'm6l8', slug: 'agent-date-time', kind: 'video', minutes: 22, status: 'locked', title: { en: 'Teaching the agent today’s date and time', ar: 'تعريف الـ Agent بالتاريخ والوقت الحالي' } },
      { id: 'm6l9', slug: 'output-parser', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Output Parser — forcing structured output', ar: 'Output Parser — إجبار المخرجات على الانتظام' } },
      { id: 'm6l10', slug: 'curl-scraping', kind: 'video', minutes: 47, status: 'locked', title: { en: 'cURL and web scraping', ar: 'cURL و Web Scraping' } },
      { id: 'm6l11', slug: 'credentials-auth', kind: 'video', minutes: 34, status: 'locked', title: { en: 'Stored credentials and header auth', ar: 'Store Credentials و Header Auth' } },
      { id: 'm6l12', slug: 'document-analyzer', kind: 'video', minutes: 52, status: 'locked', title: { en: 'AI Document Analyzer — PDF, text and Excel', ar: 'AI Document Analyzer — PDF و Text و Excel' } },
      { id: 'm6l13', slug: 'page-scraping-analysis', kind: 'video', minutes: 43, status: 'locked', title: { en: 'Scraping a page and analysing it automatically', ar: 'استخراج محتوى المواقع وتحليله تلقائياً' } },
      { id: 'm6l14', slug: 'gemini-2026', kind: 'video', minutes: 29, status: 'locked', title: { en: 'Gemini 2026 update', ar: 'تحديثات Gemini 2026' } },
      { id: 'm6l15', slug: 'client-credentials', kind: 'video', minutes: 31, status: 'locked', title: { en: 'Getting the credentials you need from a client', ar: 'كيف تحصل على Credentials العميل' } },
      { id: 'm6l16', slug: 'rag-pinecone', kind: 'lab', minutes: 78, status: 'locked', title: { en: 'Lab — RAG with Pinecone over your own knowledge base', ar: 'مختبر — RAG بـ Pinecone على قاعدة معرفتك' } },
      { id: 'm6l17', slug: 'infinite-loop', kind: 'reading', minutes: 25, status: 'locked', title: { en: 'Catching and stopping infinite loops', ar: 'اكتشاف الـ Infinite Loop وإيقافه' } },
      { id: 'm6l18', slug: 'mcp-server', kind: 'video', minutes: 49, status: 'locked', title: { en: 'MCP Server with n8n', ar: 'MCP Server مع n8n' } },
    ],
  },
  {
    id: 'm7',
    slug: 'saas-multi-client',
    order: 7,
    icon: 'Layers',
    status: 'locked',
    title: { en: 'Going pro — SaaS and multi-client automation', ar: 'كورس الاحتراف — SaaS ومتعدّد العملاء' },
    summary: {
      en: 'Build the system once, sell it to many: your own ManyChat-style platform with per-client limits.',
      ar: 'ابنِ النظام مرة وبِعه لكثيرين: منصتك الشبيهة بـ ManyChat مع حدود لكل عميل.',
    },
    stack: ['Instagram', 'Facebook', 'WhatsApp', 'SaaS'],
    lessons: [
      { id: 'm7l1', slug: 'instagram-comment-platform', kind: 'video', minutes: 62, status: 'locked', title: { en: 'An Instagram comment automation platform', ar: 'منصة أتمتة تعليقات Instagram' } },
      { id: 'm7l2', slug: 'facebook-comments-no-host', kind: 'video', minutes: 45, status: 'locked', title: { en: 'Facebook comment automation with no hosting or domain', ar: 'أتمتة تعليقات Facebook بدون استضافة أو دومين' } },
      { id: 'm7l3', slug: 'fb-messenger-platform', kind: 'video', minutes: 56, status: 'locked', title: { en: 'A Facebook + Messenger automation platform', ar: 'منصة أتمتة Facebook و Messenger' } },
      { id: 'm7l4', slug: 'multi-client-core', kind: 'video', minutes: 67, status: 'locked', title: { en: 'Multi-client SaaS — one system, unlimited clients', ar: 'Multi-Client SaaS — نظام واحد وعملاء بلا حدود' } },
      { id: 'm7l5', slug: 'subscriptions-limits', kind: 'video', minutes: 49, status: 'locked', title: { en: 'Subscriptions and monthly usage limits', ar: 'الاشتراكات والحدود الشهرية' } },
      { id: 'm7l6', slug: 'per-client-config', kind: 'video', minutes: 45, status: 'locked', title: { en: 'Per-client settings and rules', ar: 'إعدادات وقواعد خاصة لكل عميل' } },
      { id: 'm7l7', slug: 'keyword-automation', kind: 'video', minutes: 38, status: 'locked', title: { en: 'Smart keyword automation, per post', ar: 'Smart Keyword Automation لكل منشور' } },
      { id: 'm7l8', slug: 'multi-client-whatsapp', kind: 'video', minutes: 58, status: 'locked', title: { en: 'A multi-client WhatsApp platform', ar: 'منصة WhatsApp متعدّدة العملاء' } },
      { id: 'm7l9', slug: 'whatsapp-web-interface', kind: 'video', minutes: 54, status: 'locked', title: { en: 'A WhatsApp Web-like interface for your agents', ar: 'واجهة شبيهة بـ WhatsApp Web لموظفيك' } },
      { id: 'm7l10', slug: 'auto-like-comments', kind: 'video', minutes: 22, status: 'locked', title: { en: 'Auto-liking a customer’s comment', ar: 'Like تلقائي على تعليق العميل' } },
      { id: 'm7l11', slug: 'dark-ads-replies', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Replying to ad comments — dark ads', ar: 'الرد على تعليقات الإعلانات — Dark Ads' } },
      { id: 'm7l12', slug: 'unified-fb-ig', kind: 'video', minutes: 47, status: 'locked', title: { en: 'One system for a Facebook page and Instagram', ar: 'نظام واحد لصفحة Facebook و Instagram' } },
      { id: 'm7l13', slug: 'bonus-scripts', kind: 'reading', minutes: 34, status: 'locked', title: { en: 'Bonus — two extra scripts and advanced updates', ar: 'هدية — سكريبتان إضافيان وتحديثات متقدمة' } },
    ],
  },
  {
    id: 'm8',
    slug: 'social-publishing',
    order: 8,
    icon: 'Share2',
    status: 'locked',
    title: { en: 'Social media automation', ar: 'أتمتة السوشال ميديا' },
    summary: {
      en: 'Publishing that runs on a schedule instead of on your attention.',
      ar: 'نشر بيمشي على جدول بدل ما يمشي على انتباهك.',
    },
    stack: ['Facebook', 'Instagram', 'YouTube'],
    lessons: [
      { id: 'm8l1', slug: 'facebook-publishing', kind: 'video', minutes: 34, status: 'locked', title: { en: 'Facebook auto publishing', ar: 'نشر تلقائي على Facebook' } },
      { id: 'm8l2', slug: 'instagram-publishing', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Instagram auto publishing', ar: 'نشر تلقائي على Instagram' } },
      { id: 'm8l3', slug: 'youtube-automation', kind: 'video', minutes: 36, status: 'locked', title: { en: 'YouTube automation', ar: 'أتمتة YouTube' } },
      { id: 'm8l4', slug: 'content-automation', kind: 'video', minutes: 45, status: 'locked', title: { en: 'Automating the whole content pipeline', ar: 'أتمتة عملية المحتوى بالكامل' } },
    ],
  },
  {
    id: 'm9',
    slug: 'web-and-ecommerce',
    order: 9,
    icon: 'ShoppingCart',
    status: 'locked',
    title: { en: 'Websites and online stores', ar: 'المواقع والمتاجر الإلكترونية' },
    summary: {
      en: 'Agents that read your real data, answer about products and take orders.',
      ar: 'وكلاء بيقرأوا بياناتك الحقيقية، بيعرّفوا بالمنتجات وبياخدوا الطلبات.',
    },
    stack: ['WordPress', 'WooCommerce', 'Shopify', 'MySQL'],
    lessons: [
      { id: 'm9l1', slug: 'agent-to-database', kind: 'video', minutes: 52, status: 'locked', title: { en: 'Wiring an AI agent straight to your database', ar: 'ربط الـ AI Agent بقاعدة البيانات مباشرة' } },
      { id: 'm9l2', slug: 'website-chatbot', kind: 'video', minutes: 45, status: 'locked', title: { en: 'A chatbot on your own website', ar: 'Chatbot على موقعك' } },
      { id: 'm9l3', slug: 'wordpress', kind: 'video', minutes: 40, status: 'locked', title: { en: 'WordPress — publishing and refreshing old content', ar: 'WordPress — النشر وتحديث المحتوى القديم' } },
      { id: 'm9l4', slug: 'woocommerce-products', kind: 'video', minutes: 43, status: 'locked', title: { en: 'WooCommerce — introducing products, checking orders', ar: 'WooCommerce — التعريف بالمنتجات وحالة الطلبات' } },
      { id: 'm9l5', slug: 'woocommerce-orders', kind: 'video', minutes: 45, status: 'locked', title: { en: 'WooCommerce — creating and querying orders', ar: 'WooCommerce — إنشاء الطلبات والاستعلام عنها' } },
      { id: 'm9l6', slug: 'easyorders', kind: 'video', minutes: 31, status: 'locked', title: { en: 'EasyOrders automation', ar: 'ربط EasyOrders' } },
      { id: 'm9l7', slug: 'shopify', kind: 'video', minutes: 49, status: 'locked', title: { en: 'Shopify AI automation', ar: 'Shopify AI Automation' } },
      { id: 'm9l8', slug: 'shopify-2026', kind: 'video', minutes: 38, status: 'locked', title: { en: 'Shopify 2026 — the new way to connect', ar: 'Shopify 2026 — الطريقة الجديدة للربط' } },
      { id: 'm9l9', slug: 'shopify-real-problem', kind: 'video', minutes: 47, status: 'locked', title: { en: 'A real client Shopify problem, solved step by step', ar: 'مشكلة Shopify حقيقية لعميل، محلولة خطوة بخطوة' } },
    ],
  },
  {
    id: 'm10',
    slug: 'skill-to-client',
    order: 10,
    icon: 'Briefcase',
    status: 'locked',
    title: { en: 'From the skill to the client', ar: 'من المهارة إلى العميل' },
    summary: {
      en: 'Finding the first client, pricing the work, and the advanced systems worth charging for.',
      ar: 'إيجاد أول عميل، وتسعير الشغل، والأنظمة المتقدمة اللي بتستاهل تتقاضى عليها.',
    },
    stack: ['MySQL', 'Multi-Agent', 'SEO', 'Claude'],
    lessons: [
      { id: 'm10l1', slug: 'first-client', kind: 'video', minutes: 52, status: 'locked', title: { en: 'Six ways to land your first client', ar: '٦ طرق للحصول على أول عميل' } },
      { id: 'm10l2', slug: 'pricing', kind: 'video', minutes: 38, status: 'locked', title: { en: 'Pricing an automation service', ar: 'كيف تسعّر خدمة الأتمتة' } },
      { id: 'm10l3', slug: 'chatbot-mysql', kind: 'video', minutes: 54, status: 'locked', title: { en: 'Website chatbot with MySQL behind it', ar: 'Website Chatbot مع MySQL' } },
      { id: 'm10l4', slug: 'image-comparison', kind: 'video', minutes: 38, status: 'locked', title: { en: 'AI image comparison — matching a photo to your catalogue', ar: 'مقارنة الصور — مطابقة صورة مع قاعدة المنتجات' } },
      { id: 'm10l5', slug: 'screenshot-analysis', kind: 'video', minutes: 36, status: 'locked', title: { en: 'Reading a screenshot — an Instapay transfer proof', ar: 'تحليل Screenshot — إثبات تحويل Instapay' } },
      { id: 'm10l6', slug: 'customer-image-check', kind: 'video', minutes: 40, status: 'locked', title: { en: 'Checking customer images and deciding automatically', ar: 'فحص صور العملاء واتخاذ القرار تلقائياً' } },
      { id: 'm10l7', slug: 'whatsapp-templates', kind: 'video', minutes: 31, status: 'locked', title: { en: 'WhatsApp templates for promotional sends', ar: 'WhatsApp Templates للرسائل الترويجية' } },
      { id: 'm10l8', slug: 'messenger-images', kind: 'video', minutes: 22, status: 'locked', title: { en: 'Sending images to customers on Messenger', ar: 'إرسال الصور للعملاء على Messenger' } },
      { id: 'm10l9', slug: 'multi-agent', kind: 'video', minutes: 58, status: 'locked', title: { en: 'Multi-agent systems — a team of agents', ar: 'Multi-Agent System — فريق من الوكلاء' } },
      { id: 'm10l10', slug: 'seo-automation', kind: 'video', minutes: 43, status: 'locked', title: { en: 'An SEO automation workflow', ar: 'SEO Automation Workflow' } },
      { id: 'm10l11', slug: 'sheets-trigger', kind: 'video', minutes: 22, status: 'locked', title: { en: 'Google Sheets Trigger — react to any new row', ar: 'Google Sheets Trigger — عند أي صف جديد' } },
      { id: 'm10l12', slug: 'claude-with-n8n', kind: 'video', minutes: 31, status: 'locked', title: { en: 'Using Claude inside n8n', ar: 'ربط Claude مع n8n' } },
      { id: 'm10l13', slug: 'media-buying', kind: 'video', minutes: 49, status: 'locked', title: { en: 'Media buying automation — reading ad accounts', ar: 'Media Buying Automation — تحليل الحسابات الإعلانية' } },
    ],
  },
];

const labs: Lab[] = [
  { id: 'lab1', slug: 'your-workspace', moduleId: 'm1', difficulty: 'starter', minutes: 50, status: 'completed', stack: ['n8n', 'VPS'], title: { en: 'Get your own environment running', ar: 'شغّل بيئة عملك' }, brief: { en: 'A VPS with n8n preinstalled, your first login, and a workflow that runs.', ar: 'VPS مع n8n مثبّت، أول دخول، و Workflow بيشتغل.' } },
  { id: 'lab2', slug: 'first-workflow', moduleId: 'm3', difficulty: 'starter', minutes: 67, status: 'locked', stack: ['n8n', 'Google Sheets'], title: { en: 'Form to sheet to inbox', ar: 'من فورم إلى شيت إلى بريد' }, brief: { en: 'A form submission lands in a spreadsheet and notifies you — your first end-to-end workflow.', ar: 'فورم بيوصل لشيت وبينبّهك — أول مسار كامل عندك.' } },
  { id: 'lab3', slug: 'practical-drills', moduleId: 'm4', difficulty: 'core', minutes: 62, status: 'locked', stack: ['n8n'], title: { en: 'Drills on the fundamentals', ar: 'تدريبات على الأساسيات' }, brief: { en: 'Small workflows that make triggers, branching and data handling second nature.', ar: 'Workflows صغيرة بتخلّي المشغّلات والتفرّع ومعالجة البيانات تصير بديهية.' } },
  { id: 'lab4', slug: 'order-automation', moduleId: 'm5', difficulty: 'core', minutes: 73, status: 'locked', stack: ['Messenger', 'n8n', 'LLM'], title: { en: 'Turn a conversation into an order', ar: 'حوّل المحادثة إلى طلب' }, brief: { en: 'Collect what you need across a chat, confirm it, and file a real order.', ar: 'اجمع اللي بدك إياه عبر المحادثة، أكّده، وسجّل طلباً حقيقياً.' } },
  { id: 'lab5', slug: 'whatsapp-bot', moduleId: 'm6', difficulty: 'core', minutes: 67, status: 'locked', stack: ['WhatsApp', 'n8n'], title: { en: 'A WhatsApp bot that answers customers', ar: 'بوت WhatsApp بيرد على العملاء' }, brief: { en: 'Receive messages, answer from what you know, and hand over to a human on request.', ar: 'استقبل الرسائل، جاوب من معرفتك، وسلّم لموظف لما يُطلب.' } },
  { id: 'lab6', slug: 'rag-pinecone', moduleId: 'm6', difficulty: 'advanced', minutes: 78, status: 'locked', stack: ['Pinecone', 'RAG'], title: { en: 'RAG over your own knowledge base', ar: 'RAG على قاعدة معرفتك' }, brief: { en: 'Give the agent documents to retrieve from, so it stops guessing and starts citing.', ar: 'أعطِ الـ Agent مستندات يسترجع منها، فيوقف التخمين ويبدأ الاستناد.' } },
  { id: 'lab7', slug: 'multi-client-saas', moduleId: 'm7', difficulty: 'advanced', minutes: 101, status: 'locked', stack: ['SaaS', 'Instagram', 'WhatsApp'], title: { en: 'One system, many clients', ar: 'نظام واحد وعملاء كثر' }, brief: { en: 'Per-client settings, usage limits and subscriptions on a single automation you built once.', ar: 'إعدادات وحدود واشتراكات لكل عميل، على أتمتة بنيتها مرة وحدة.' } },
  { id: 'lab8', slug: 'store-agent', moduleId: 'm9', difficulty: 'advanced', minutes: 84, status: 'locked', stack: ['WooCommerce', 'MySQL'], title: { en: 'A store agent wired to real data', ar: 'وكيل متجر مربوط ببيانات حقيقية' }, brief: { en: 'Answer product questions and order status from the actual database, not a script.', ar: 'جاوب عن المنتجات وحالة الطلب من قاعدة البيانات نفسها، لا من نص جاهز.' } },
];

const projects: Project[] = [
  { id: 'p1', slug: 'ai-email-assistant', capstone: false, status: 'locked', stack: ['Gmail', 'n8n', 'LLM'], title: { en: 'AI email assistant', ar: 'مساعد البريد الذكي' }, brief: { en: 'An inbox that reads what arrives, decides what matters and drafts the reply.', ar: 'بريد بيقرأ اللي بيوصل، بيقرّر شو المهم، وبيكتب الرد.' } },
  { id: 'p2', slug: 'restaurant-receptionist', capstone: false, status: 'locked', stack: ['WhatsApp', 'n8n', 'LLM'], title: { en: 'WhatsApp receptionist for a restaurant', ar: 'موظف استقبال WhatsApp لمطعم' }, brief: { en: 'Takes the order, answers the menu questions, and knows when to fetch a human.', ar: 'بياخد الطلب، بيجاوب عن المنيو، وبيعرف إمتى يجيب موظف.' } },
  { id: 'p3', slug: 'capstone', capstone: true, status: 'locked', stack: ['SaaS', 'WhatsApp', 'Instagram', 'Facebook', 'Pinecone'], title: { en: 'Capstone — your own multi-client automation platform', ar: 'المشروع الختامي — منصّتك متعدّدة العملاء' }, brief: { en: 'Build the ManyChat-style platform end to end: comments, DMs, WhatsApp, per-client limits and subscriptions — a system you can actually sell.', ar: 'ابنِ المنصة الشبيهة بـ ManyChat كاملة: تعليقات ورسائل وواتساب وحدود واشتراكات لكل عميل — نظام تقدر تبيعه فعلاً.' } },
];

const journey: JourneyNode[] = [
  { id: 'j1', icon: 'Target', label: { en: 'A business that needs it', ar: 'شغل محتاج أتمتة' }, note: { en: 'Everything starts with work someone is doing by hand.', ar: 'كل شي بيبدأ بشغل حدا عم يعمله بإيده.' } },
  { id: 'j2', icon: 'Server', label: { en: 'n8n on your VPS', ar: 'n8n على سيرفرك' }, note: { en: 'Your own instance, running in minutes.', ar: 'نسختك الخاصة، شغّالة خلال دقائق.' } },
  { id: 'j3', icon: 'KeyRound', label: { en: 'Credentials', ar: 'الصلاحيات' }, note: { en: 'Connect the tools once, properly.', ar: 'اربط الأدوات مرة وحدة وصح.' } },
  { id: 'j4', icon: 'Workflow', label: { en: 'Your first workflow', ar: 'أول Workflow' }, note: { en: 'A trigger, a decision, a result.', ar: 'مشغّل، وقرار، ونتيجة.' } },
  { id: 'j5', icon: 'Bot', label: { en: 'An AI agent with tools', ar: 'وكيل ذكي بأدوات' }, note: { en: 'Where judgement is needed, the model decides — and acts.', ar: 'حيث يلزم الحكم، النموذج يقرّر — وينفّذ.' } },
  { id: 'j6', icon: 'MessagesSquare', label: { en: 'WhatsApp, Messenger, Telegram', ar: 'واتساب وماسنجر وتيليجرام' }, note: { en: 'Meet customers on the channels they already use.', ar: 'قابل العملاء على القنوات اللي أصلاً بيستخدموها.' } },
  { id: 'j7', icon: 'Database', label: { en: 'Knowledge and data', ar: 'المعرفة والبيانات' }, note: { en: 'RAG and real databases, so answers are grounded.', ar: 'RAG وقواعد بيانات حقيقية، فالأجوبة مستندة.' } },
  { id: 'j8', icon: 'ShoppingCart', label: { en: 'Stores and websites', ar: 'المتاجر والمواقع' }, note: { en: 'Products, orders and status — answered automatically.', ar: 'منتجات وطلبات وحالات — مجاوَب عليها تلقائياً.' } },
  { id: 'j9', icon: 'Layers', label: { en: 'Multi-client SaaS', ar: 'SaaS متعدّد العملاء' }, note: { en: 'Build it once, sell it to many.', ar: 'ابنِه مرة، وبِعه لكثيرين.' } },
  { id: 'j10', icon: 'HandCoins', label: { en: 'Your first paying client', ar: 'أول عميل بيدفع' }, note: { en: 'The skill becomes a service someone pays for.', ar: 'المهارة بتصير خدمة حدا بيدفع فيها.' } },
];

export const course: Course = {
  id: 'ai-automation-n8n',
  title: { en: 'AI Automation & n8n', ar: 'AI Automation و n8n' },
  subtitle: {
    en: 'Build real AI automations for businesses — WhatsApp, Messenger, Instagram, stores and databases — and turn them into a service you sell.',
    ar: 'ابنِ أتمتة ذكاء اصطناعي حقيقية للشركات — واتساب وماسنجر وإنستجرام ومتاجر وقواعد بيانات — وحوّلها لخدمة بتبيعها.',
  },
  instructor: { en: 'Abdulraheem Alsaka', ar: 'عبدالرحيم السقا' },
  level: { en: 'Beginner to professional', ar: 'من الصفر إلى الاحتراف' },
  totalMinutes: modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0), 0),
  modules,
  labs,
  projects,
  journey,
};

/* ── derived helpers ─────────────────────────────────────────────────────── */

export const allLessons = modules.flatMap((m) => m.lessons);

export const completedLessons = allLessons.filter((l) => l.status === 'completed').length;

export const progressPercent = Math.round((completedLessons / allLessons.length) * 100);

/** The lesson the dashboard's "continue" card points at. */
export const currentLesson = allLessons.find((l) => l.status === 'in-progress') ?? allLessons[0];

export const currentModule =
  modules.find((m) => m.lessons.some((l) => l.id === currentLesson.id)) ?? modules[0];

export const minutesLearned = allLessons
  .filter((l) => l.status === 'completed')
  .reduce((sum, l) => sum + l.minutes, 0);
