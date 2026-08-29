import type { Course, Lab, Module, Project, JourneyNode } from './types';

/**
 * Mock content for "Business Automation with AI".
 *
 * Written as if it were real: the module order is the actual dependency order a
 * student would follow, the lab briefs describe work someone could sit down and
 * do, and the durations are plausible. A demo full of "Lesson 1 / Lesson 2"
 * placeholders would not tell us whether the platform feels right, which is the
 * only thing this phase is meant to prove.
 *
 * Progress is hard-coded mid-course — partway through Module 3 — so the
 * dashboard has something honest to show: things finished, one thing in flight,
 * and things still locked.
 */

const modules: Module[] = [
  {
    id: 'm1',
    slug: 'automation-foundations',
    order: 1,
    icon: 'Workflow',
    status: 'completed',
    title: {
      en: 'Foundations of Business Process Automation',
      ar: 'أساسيات أتمتة العمليات',
    },
    summary: {
      en: 'How to read a business process, find what is worth automating, and measure what you saved.',
      ar: 'كيف تقرأ عملية عمل، تحدّد اللي يستاهل أتمتة، وتقيس اللي وفّرته.',
    },
    stack: ['Process mapping', 'ROI'],
    lessons: [
      { id: 'm1l1', slug: 'why-automate', kind: 'video', minutes: 9, status: 'completed', title: { en: 'What actually deserves automating', ar: 'شو اللي فعلاً يستاهل أتمتة' } },
      { id: 'm1l2', slug: 'mapping-a-process', kind: 'video', minutes: 14, status: 'completed', title: { en: 'Mapping a process end to end', ar: 'رسم العملية من البداية للنهاية' } },
      { id: 'm1l3', slug: 'cost-of-manual-work', kind: 'reading', minutes: 7, status: 'completed', title: { en: 'Putting a number on manual work', ar: 'تحويل الشغل اليدوي لرقم' } },
      { id: 'm1l4', slug: 'first-map', kind: 'lab', minutes: 25, status: 'completed', title: { en: 'Lab — map your own process', ar: 'مختبر — ارسم عمليتك' } },
    ],
  },
  {
    id: 'm2',
    slug: 'n8n-fundamentals',
    order: 2,
    icon: 'GitBranch',
    status: 'completed',
    title: { en: 'n8n Fundamentals', ar: 'أساسيات n8n' },
    summary: {
      en: 'Nodes, connections and the shape of data as it moves. Build your first working automation.',
      ar: 'العقد والاتصالات وشكل البيانات وهي تتحرك. ابنِ أول أتمتة شغّالة.',
    },
    stack: ['n8n'],
    lessons: [
      { id: 'm2l1', slug: 'n8n-tour', kind: 'video', minutes: 11, status: 'completed', title: { en: 'The n8n editor, properly', ar: 'محرّر n8n كما يجب' } },
      { id: 'm2l2', slug: 'nodes-and-data', kind: 'video', minutes: 16, status: 'completed', title: { en: 'Nodes, items and how data flows', ar: 'العقد والعناصر وتدفّق البيانات' } },
      { id: 'm2l3', slug: 'expressions', kind: 'video', minutes: 13, status: 'completed', title: { en: 'Expressions without guesswork', ar: 'التعابير بدون تخمين' } },
      { id: 'm2l4', slug: 'error-handling', kind: 'reading', minutes: 8, status: 'completed', title: { en: 'When a workflow fails at 3am', ar: 'لما يفشل الـ workflow الساعة ٣ فجراً' } },
      { id: 'm2l5', slug: 'first-workflow', kind: 'lab', minutes: 35, status: 'completed', title: { en: 'Lab — form to spreadsheet to email', ar: 'مختبر — فورم إلى شيت إلى إيميل' } },
    ],
  },
  {
    id: 'm3',
    slug: 'apis-and-webhooks',
    order: 3,
    icon: 'Webhook',
    status: 'in-progress',
    title: { en: 'APIs & Webhooks', ar: 'الـ APIs والـ Webhooks' },
    summary: {
      en: 'Connect anything to anything. Read documentation, authenticate, and receive events safely.',
      ar: 'اربط أي شي بأي شي. اقرأ التوثيق، وثّق الهوية، واستقبل الأحداث بأمان.',
    },
    stack: ['REST', 'Webhooks', 'OAuth'],
    lessons: [
      { id: 'm3l1', slug: 'read-any-api-doc', kind: 'video', minutes: 12, status: 'completed', title: { en: 'How to read any API documentation', ar: 'كيف تقرأ أي توثيق API' } },
      { id: 'm3l2', slug: 'auth-that-holds', kind: 'video', minutes: 15, status: 'completed', title: { en: 'Auth that holds up: keys, tokens, OAuth', ar: 'مصادقة تصمد: مفاتيح، توكنات، OAuth' } },
      { id: 'm3l3', slug: 'receiving-webhooks', kind: 'video', minutes: 14, status: 'in-progress', title: { en: 'Receiving webhooks you can trust', ar: 'استقبال webhooks تقدر تثق فيها' } },
      { id: 'm3l4', slug: 'rate-limits', kind: 'reading', minutes: 9, status: 'available', title: { en: 'Rate limits, retries and idempotency', ar: 'حدود المعدّل وإعادة المحاولة' } },
      { id: 'm3l5', slug: 'crm-sync', kind: 'lab', minutes: 40, status: 'locked', title: { en: 'Lab — two-way CRM sync', ar: 'مختبر — مزامنة CRM باتجاهين' } },
    ],
  },
  {
    id: 'm4',
    slug: 'ai-agents',
    order: 4,
    icon: 'Bot',
    status: 'locked',
    title: { en: 'AI Agents in Your Workflows', ar: 'وكلاء الذكاء الاصطناعي داخل مساراتك' },
    summary: {
      en: 'Put a model where judgement is needed: classify, extract, decide, draft — with guardrails.',
      ar: 'ضع النموذج حيث يلزم الحكم: تصنيف واستخلاص وقرار وصياغة — مع حواجز.',
    },
    stack: ['LLMs', 'Prompting', 'RAG'],
    lessons: [
      { id: 'm4l1', slug: 'where-ai-belongs', kind: 'video', minutes: 11, status: 'locked', title: { en: 'Where AI belongs in a pipeline', ar: 'أين يوضع الذكاء الاصطناعي بالمسار' } },
      { id: 'm4l2', slug: 'classification', kind: 'video', minutes: 17, status: 'locked', title: { en: 'Routing and classification that works', ar: 'توجيه وتصنيف يشتغل فعلاً' } },
      { id: 'm4l3', slug: 'structured-output', kind: 'video', minutes: 15, status: 'locked', title: { en: 'Forcing structured output', ar: 'إجبار المخرجات على بنية' } },
      { id: 'm4l4', slug: 'grounding', kind: 'video', minutes: 18, status: 'locked', title: { en: 'Grounding answers in your own data', ar: 'إسناد الإجابات لبياناتك' } },
      { id: 'm4l5', slug: 'support-triage', kind: 'lab', minutes: 45, status: 'locked', title: { en: 'Lab — AI support triage agent', ar: 'مختبر — وكيل فرز دعم' } },
    ],
  },
  {
    id: 'm5',
    slug: 'playwright',
    order: 5,
    icon: 'MousePointerClick',
    status: 'locked',
    title: { en: 'Browser Automation with Playwright', ar: 'أتمتة المتصفح بـ Playwright' },
    summary: {
      en: 'Drive real browsers for systems that have no API — and to test everything you have built.',
      ar: 'قُد متصفحات حقيقية للأنظمة اللي بلا API — ولاختبار كل اللي بنيته.',
    },
    stack: ['Playwright', 'TypeScript'],
    lessons: [
      { id: 'm5l1', slug: 'first-script', kind: 'video', minutes: 13, status: 'locked', title: { en: 'Your first reliable script', ar: 'أول سكربت موثوق' } },
      { id: 'm5l2', slug: 'selectors', kind: 'video', minutes: 16, status: 'locked', title: { en: 'Selectors that survive a redesign', ar: 'محدّدات تصمد أمام إعادة التصميم' } },
      { id: 'm5l3', slug: 'flakiness', kind: 'video', minutes: 14, status: 'locked', title: { en: 'Killing flakiness for good', ar: 'القضاء على التذبذب نهائياً' } },
      { id: 'm5l4', slug: 'login-suite', kind: 'lab', minutes: 40, status: 'locked', title: { en: 'Lab — test a login flow end to end', ar: 'مختبر — اختبر تدفّق تسجيل دخول' } },
    ],
  },
  {
    id: 'm6',
    slug: 'docker',
    order: 6,
    icon: 'Container',
    status: 'locked',
    title: { en: 'Packaging with Docker', ar: 'التغليف بـ Docker' },
    summary: {
      en: 'Make it run the same on your machine and on the server. Images, volumes, compose.',
      ar: 'خلّيه يشتغل بنفس الطريقة على جهازك وعلى السيرفر. صور، volumes، compose.',
    },
    stack: ['Docker', 'Compose'],
    lessons: [
      { id: 'm6l1', slug: 'images', kind: 'video', minutes: 12, status: 'locked', title: { en: 'Images, layers and why builds break', ar: 'الصور والطبقات ولماذا تفشل البناءات' } },
      { id: 'm6l2', slug: 'compose', kind: 'video', minutes: 15, status: 'locked', title: { en: 'Compose for multi-service stacks', ar: 'Compose لعدة خدمات' } },
      { id: 'm6l3', slug: 'volumes', kind: 'video', minutes: 11, status: 'locked', title: { en: 'Volumes — where your data actually lives', ar: 'الـ volumes — أين تعيش بياناتك فعلاً' } },
      { id: 'm6l4', slug: 'containerise-n8n', kind: 'lab', minutes: 35, status: 'locked', title: { en: 'Lab — containerise your automation', ar: 'مختبر — غلّف أتمتتك بحاوية' } },
    ],
  },
  {
    id: 'm7',
    slug: 'github',
    order: 7,
    icon: 'GitPullRequest',
    status: 'locked',
    title: { en: 'Version Control & Collaboration', ar: 'إدارة الإصدارات والتعاون' },
    summary: {
      en: 'Track every change, review safely, and let a push deploy for you.',
      ar: 'تتبّع كل تغيير، راجع بأمان، وخلّي الـ push ينشر عنك.',
    },
    stack: ['Git', 'GitHub', 'CI/CD'],
    lessons: [
      { id: 'm7l1', slug: 'git-that-sticks', kind: 'video', minutes: 14, status: 'locked', title: { en: 'The Git you will actually use', ar: 'الـ Git اللي رح تستخدمه فعلاً' } },
      { id: 'm7l2', slug: 'reviews', kind: 'video', minutes: 12, status: 'locked', title: { en: 'Pull requests and useful reviews', ar: 'طلبات الدمج والمراجعات المفيدة' } },
      { id: 'm7l3', slug: 'actions', kind: 'video', minutes: 16, status: 'locked', title: { en: 'GitHub Actions: push to deploy', ar: 'GitHub Actions: ادفع لينشر' } },
      { id: 'm7l4', slug: 'ci-pipeline', kind: 'lab', minutes: 40, status: 'locked', title: { en: 'Lab — CI that runs your Playwright suite', ar: 'مختبر — CI يشغّل اختباراتك' } },
    ],
  },
  {
    id: 'm8',
    slug: 'hostinger-production',
    order: 8,
    icon: 'Server',
    status: 'locked',
    title: { en: 'Going to Production on Hostinger', ar: 'الإطلاق للإنتاج على Hostinger' },
    summary: {
      en: 'A VPS, a domain, real HTTPS, backups and the discipline to keep it running.',
      ar: 'سيرفر ودومين وHTTPS حقيقي ونسخ احتياطي والانضباط اللي يبقيه شغّالاً.',
    },
    stack: ['Hostinger', 'VPS', 'Traefik'],
    lessons: [
      { id: 'm8l1', slug: 'vps-setup', kind: 'video', minutes: 15, status: 'locked', title: { en: 'From bare VPS to running service', ar: 'من سيرفر خام إلى خدمة شغّالة' } },
      { id: 'm8l2', slug: 'domains-tls', kind: 'video', minutes: 13, status: 'locked', title: { en: 'Domains, DNS and certificates', ar: 'الدومينات والـ DNS والشهادات' } },
      { id: 'm8l3', slug: 'secrets', kind: 'video', minutes: 12, status: 'locked', title: { en: 'Secrets, keys and not leaking them', ar: 'الأسرار والمفاتيح وكيف لا تتسرّب' } },
      { id: 'm8l4', slug: 'backups', kind: 'reading', minutes: 9, status: 'locked', title: { en: 'Backups you have actually tested', ar: 'نسخ احتياطية جرّبتها فعلاً' } },
      { id: 'm8l5', slug: 'deploy-it', kind: 'lab', minutes: 45, status: 'locked', title: { en: 'Lab — deploy your automation for real', ar: 'مختبر — انشر أتمتتك فعلياً' } },
    ],
  },
];

const labs: Lab[] = [
  { id: 'lab1', slug: 'map-a-process', moduleId: 'm1', difficulty: 'starter', minutes: 25, status: 'completed', stack: ['Process mapping'], title: { en: 'Map a real process', ar: 'ارسم عملية حقيقية' }, brief: { en: 'Take a task your team repeats weekly and map every step, handoff and wait.', ar: 'خذ مهمة يكرّرها فريقك أسبوعياً وارسم كل خطوة وتسليم وانتظار.' } },
  { id: 'lab2', slug: 'form-to-sheet', moduleId: 'm2', difficulty: 'starter', minutes: 35, status: 'completed', stack: ['n8n', 'Google Sheets'], title: { en: 'Form to spreadsheet to inbox', ar: 'من فورم إلى شيت إلى بريد' }, brief: { en: 'A website form lands in a sheet and notifies the team — your first end-to-end workflow.', ar: 'فورم يصل لشيت ويُنبّه الفريق — أول مسار كامل عندك.' } },
  { id: 'lab3', slug: 'crm-sync', moduleId: 'm3', difficulty: 'core', minutes: 40, status: 'locked', stack: ['n8n', 'REST', 'Webhooks'], title: { en: 'Two-way CRM sync', ar: 'مزامنة CRM باتجاهين' }, brief: { en: 'Keep two systems in step without loops, duplicates or lost updates.', ar: 'خلّي نظامين متزامنين بدون حلقات أو تكرار أو ضياع.' } },
  { id: 'lab4', slug: 'support-triage', moduleId: 'm4', difficulty: 'core', minutes: 45, status: 'locked', stack: ['n8n', 'LLM'], title: { en: 'AI support triage agent', ar: 'وكيل فرز الدعم' }, brief: { en: 'Classify incoming messages into five categories and route each to the right owner.', ar: 'صنّف الرسائل لخمس فئات ووجّه كل وحدة لصاحبها.' } },
  { id: 'lab5', slug: 'login-suite', moduleId: 'm5', difficulty: 'core', minutes: 40, status: 'locked', stack: ['Playwright'], title: { en: 'Test a login flow end to end', ar: 'اختبر تدفّق تسجيل الدخول' }, brief: { en: 'Cover the happy path, the wrong password, the locked account and the slow network.', ar: 'غطِّ المسار السليم وكلمة السر الخطأ والحساب المقفل والشبكة البطيئة.' } },
  { id: 'lab6', slug: 'containerise', moduleId: 'm6', difficulty: 'advanced', minutes: 35, status: 'locked', stack: ['Docker'], title: { en: 'Containerise your automation', ar: 'غلّف أتمتتك بحاوية' }, brief: { en: 'Package the whole stack so a colleague can run it with one command.', ar: 'غلّف كل شي بحيث زميلك يشغّله بأمر واحد.' } },
  { id: 'lab7', slug: 'ci-pipeline', moduleId: 'm7', difficulty: 'advanced', minutes: 40, status: 'locked', stack: ['GitHub Actions', 'Playwright'], title: { en: 'CI that runs your test suite', ar: 'CI يشغّل اختباراتك' }, brief: { en: 'Every push runs the suite and blocks the merge when something breaks.', ar: 'كل دفعة تشغّل الاختبارات وتمنع الدمج لو انكسر شي.' } },
  { id: 'lab8', slug: 'deploy-it', moduleId: 'm8', difficulty: 'advanced', minutes: 45, status: 'locked', stack: ['Hostinger', 'Docker', 'Traefik'], title: { en: 'Deploy your automation for real', ar: 'انشر أتمتتك فعلياً' }, brief: { en: 'Your own VPS, your own domain, real certificates — running without you watching.', ar: 'سيرفرك ودومينك وشهادات حقيقية — شغّال بدون ما تراقبه.' } },
];

const projects: Project[] = [
  { id: 'p1', slug: 'lead-pipeline', capstone: false, status: 'completed', stack: ['n8n', 'Webhooks', 'Sheets'], title: { en: 'Lead capture pipeline', ar: 'مسار التقاط العملاء' }, brief: { en: 'Website enquiry to logged record to notified team, with nothing typed by hand.', ar: 'استفسار من الموقع إلى سجل مُدوَّن إلى فريق مُنبَّه، بدون كتابة يدوية.' } },
  { id: 'p2', slug: 'invoice-extraction', capstone: false, status: 'locked', stack: ['LLM', 'n8n', 'APIs'], title: { en: 'Invoice reading agent', ar: 'وكيل قراءة الفواتير' }, brief: { en: 'Pull structured fields out of messy supplier PDFs and file them correctly.', ar: 'استخرج حقولاً منظّمة من فواتير PDF فوضوية ورتّبها.' } },
  { id: 'p3', slug: 'capstone', capstone: true, status: 'locked', stack: ['n8n', 'AI Agent', 'Playwright', 'Docker', 'GitHub', 'Hostinger'], title: { en: 'Capstone — automate a real business process', ar: 'المشروع الختامي — أتمتة عملية عمل حقيقية' }, brief: { en: 'Take a process from your own work, automate it with everything in this course, and ship it to production on your own server.', ar: 'خذ عملية من شغلك، أتمتها بكل ما في هذا الكورس، وانشرها على سيرفرك بالإنتاج.' } },
];

const journey: JourneyNode[] = [
  { id: 'j1', icon: 'Target', label: { en: 'Business problem', ar: 'مشكلة عمل' }, note: { en: 'Everything starts with work someone is doing by hand.', ar: 'كل شي بيبدأ بشغل حدا عم يعمله بإيده.' } },
  { id: 'j2', icon: 'Workflow', label: { en: 'Process analysis', ar: 'تحليل العملية' }, note: { en: 'You map it before you automate it.', ar: 'ترسمها قبل ما تأتمتها.' } },
  { id: 'j3', icon: 'GitBranch', label: { en: 'n8n automation', ar: 'أتمتة n8n' }, note: { en: 'The backbone that moves the work along.', ar: 'العمود اللي بيحرّك الشغل.' } },
  { id: 'j4', icon: 'Bot', label: { en: 'AI agent', ar: 'وكيل ذكي' }, note: { en: 'Where judgement is needed, a model decides.', ar: 'حيث يلزم الحكم، النموذج يقرّر.' } },
  { id: 'j5', icon: 'Webhook', label: { en: 'API integration', ar: 'تكامل APIs' }, note: { en: 'Your other systems join in.', ar: 'أنظمتك الثانية بتنضم.' } },
  { id: 'j6', icon: 'MousePointerClick', label: { en: 'Playwright', ar: 'Playwright' }, note: { en: 'For anything without an API — and to test it all.', ar: 'لأي شي بلا API — ولاختبار كل شي.' } },
  { id: 'j7', icon: 'Container', label: { en: 'Docker', ar: 'Docker' }, note: { en: 'It runs the same everywhere.', ar: 'بيشتغل بنفس الطريقة بكل مكان.' } },
  { id: 'j8', icon: 'GitPullRequest', label: { en: 'GitHub', ar: 'GitHub' }, note: { en: 'Every change tracked, every push deploys.', ar: 'كل تغيير متتبَّع، وكل دفعة بتنشر.' } },
  { id: 'j9', icon: 'Server', label: { en: 'Hostinger', ar: 'Hostinger' }, note: { en: 'Your own server, your own domain.', ar: 'سيرفرك ودومينك.' } },
  { id: 'j10', icon: 'CircleCheck', label: { en: 'Production automation', ar: 'أتمتة بالإنتاج' }, note: { en: 'Running without you watching it.', ar: 'شغّالة بدون ما تراقبها.' } },
];

export const course: Course = {
  id: 'business-automation-ai',
  title: { en: 'Business Automation with AI', ar: 'أتمتة الأعمال بالذكاء الاصطناعي' },
  subtitle: {
    en: 'Build automations that survive production — n8n, AI agents, Playwright, Docker, GitHub and your own server.',
    ar: 'ابنِ أتمتة تصمد بالإنتاج — n8n ووكلاء ذكاء وPlaywright وDocker وGitHub وسيرفرك الخاص.',
  },
  instructor: { en: 'Abdulraheem Alsaqqa', ar: 'عبدالرحيم السقا' },
  level: { en: 'Intermediate', ar: 'متوسط' },
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
