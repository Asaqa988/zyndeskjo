/**
 * QA Manual & Automation — the second course on the site.
 *
 * Kept separate from course-facts.ts on purpose: that file is the AI
 * Automation & n8n course, and the WhatsApp agent and Zyn quote it word for
 * word. This course has its own dates, hours and schedule, and mixing the two
 * in one object is how a student ends up told the wrong start date.
 *
 * Numbers here must match the syllabus (public/qa-course-syllabus.docx):
 * 86 hours = 28 sessions × 3 h + a final 2-hour demo session.
 */

type L = { en: string; ar: string };

export const QA_COURSE = {
  id: 'qa-manual-automation',
  /** First session, Amman time. */
  startsAt: '2026-10-22T18:00:00+03:00',
  feeJod: 130,
  hours: 86,
  sessions: 29,
  weeks: 15,
  practiceHours: 58,
  days: { en: 'Thursday & Saturday', ar: 'الخميس والسبت' } as L,
  time: { en: '6:00 – 9:00 pm', ar: '٦:٠٠ – ٩:٠٠ مساءً' } as L,
  startLabel: { en: '22 October 2026', ar: '٢٢ تشرين الأول ٢٠٢٦' } as L,
  syllabusUrl: '/qa-course-syllabus.docx',
} as const;

export const QA_COPY = {
  badge: { en: 'New course · Live online on Zoom', ar: 'كورس جديد · أونلاين مباشر عبر Zoom' },
  title: { en: 'QA Manual & Automation with AI', ar: 'اختبار البرمجيات اليدوي والآلي مع الذكاء الاصطناعي' },
  subtitle: {
    en: 'From zero testing experience to a job-ready QA automation engineer. Manual testing, Playwright, Docker, CI/CD, n8n and AI — learned hands-on, ending with a portfolio project employers can open.',
    ar: 'من الصفر لمهندس أتمتة اختبار جاهز لسوق العمل. اختبار يدوي، Playwright، Docker، CI/CD، n8n وذكاء اصطناعي — كله عملي، وبتطلع بمشروع حقيقي بتعرضه على أي شركة.',
  },
  ctaRegister: { en: 'Reserve my seat', ar: 'احجز مقعدي' },
  startsIn: { en: 'Starts in', ar: 'يبدأ بعد' },
  startsToday: { en: 'Starts today', ar: 'يبدأ اليوم' },
  trainerTitle: { en: 'Your trainer', ar: 'مدربك' },
  trainerSubtitle: {
    en: 'Taught by someone who has done this job and taught it at university level.',
    ar: 'بيدرّبك شخص اشتغل بالمجال وعلّمه على مستوى الجامعات.',
  },
  navCurriculum: { en: 'Curriculum', ar: 'المنهاج' },
  navTrainer: { en: 'Trainer', ar: 'المدرب' },
  navFaq: { en: 'FAQ', ar: 'الأسئلة' },
  ctaSyllabus: { en: 'Download the syllabus', ar: 'حمّل المنهاج' },
  facts: {
    start: { en: 'Start date', ar: 'تاريخ البداية' },
    days: { en: 'Days', ar: 'الأيام' },
    time: { en: 'Jordan time', ar: 'بتوقيت الأردن' },
    hours: { en: 'training hours', ar: 'ساعة تدريب' },
    format: { en: 'Live online', ar: 'أونلاين مباشر' },
    fee: { en: 'Jordanian dinars', ar: 'ديناراً أردنياً' },
  },
  whyTitle: { en: 'Not just theory', ar: 'مش مجرد نظري' },
  whySubtitle: {
    en: 'What sets this course apart from a typical QA course.',
    ar: 'شو اللي بيميّز هالكورس عن أي كورس QA عادي.',
  },
  curriculumTitle: { en: 'Curriculum', ar: 'المنهاج' },
  curriculumSubtitle: {
    en: '9 modules, 29 live sessions. Every module ends with a graded deliverable.',
    ar: '٩ وحدات و٢٩ محاضرة مباشرة. كل وحدة بتنتهي بمهمة عملية مُقيّمة.',
  },
  buildTitle: { en: 'What you will build', ar: 'شو رح تبني' },
  forTitle: { en: 'Who it is for', ar: 'لمين هالكورس' },
  registerTitle: { en: 'Reserve your seat', ar: 'احجز مقعدك' },
  registerSubtitle: {
    en: 'Leave your name, phone and email, and Abdulraheem will contact you on WhatsApp to confirm the seat and arrange payment.',
    ar: 'اترك اسمك ورقمك وإيميلك، وبتواصل معك عبدالرحيم على الواتساب يأكّدلك المقعد ويرتّب معك الدفع.',
  },
  faqTitle: { en: 'Common questions', ar: 'أسئلة شائعة' },
  hoursUnit: { en: 'h', ar: 'س' },
} satisfies Record<string, L | Record<string, L>>;

export const QA_WHY: { icon: string; title: L; body: L }[] = [
  {
    icon: 'Route',
    title: { en: 'Manual → automation → AI', ar: 'يدوي ← آلي ← ذكاء اصطناعي' },
    body: {
      en: 'One path from test design and bug reports to Playwright, Docker, CI/CD, n8n and AI-assisted testing.',
      ar: 'مسار واحد من تصميم الاختبارات وتقارير الأخطاء لـ Playwright وDocker وCI/CD وn8n والاختبار بمساعدة الذكاء الاصطناعي.',
    },
  },
  {
    icon: 'FlaskConical',
    title: { en: '58 hours of practice', ar: '٥٨ ساعة تطبيق' },
    body: {
      en: 'Two-thirds of every session is hands-on work on a realistic training app — not slides.',
      ar: 'ثلثين كل محاضرة شغل عملي على تطبيق تدريبي واقعي — مش شرائح عرض.',
    },
  },
  {
    icon: 'GitBranch',
    title: { en: 'A portfolio, not a quiz', ar: 'مشروع حقيقي، مش امتحان' },
    body: {
      en: 'You finish with a public GitHub project: tests, Docker, a CI pipeline and an n8n workflow you can demo in interviews.',
      ar: 'بتطلع بمشروع عام على GitHub: اختبارات وDocker وCI pipeline وworkflow على n8n بتعرضه بالمقابلات.',
    },
  },
  {
    icon: 'Award',
    title: { en: 'Aligned to ISTQB', ar: 'متوافق مع ISTQB' },
    body: {
      en: 'Manual testing follows the ISTQB Foundation (CTFL v4.0) syllabus, so you are ready to sit the exam next.',
      ar: 'الجزء اليدوي ماشي على منهاج ISTQB Foundation (CTFL v4.0)، فبتكون جاهز تقدّم الامتحان بعدها.',
    },
  },
];

export const QA_MODULES: { n: number; hours: number; title: L; body: L; tags: string[] }[] = [
  {
    n: 1, hours: 15,
    title: { en: 'QA foundations & manual testing', ar: 'أساسيات الجودة والاختبار اليدوي' },
    body: {
      en: 'Testing principles, SDLC and STLC, test design techniques, test cases and plans, bug reports, Jira, Chrome DevTools and manual API testing with Postman.',
      ar: 'مبادئ الاختبار، SDLC وSTLC، تقنيات تصميم الاختبارات، حالات وخطط الاختبار، تقارير الأخطاء، Jira، Chrome DevTools واختبار API يدوياً عبر Postman.',
    },
    tags: ['Test design', 'Jira', 'DevTools', 'Postman'],
  },
  {
    n: 2, hours: 9,
    title: { en: 'TypeScript & Git essentials', ar: 'أساسيات TypeScript وGit' },
    body: {
      en: 'Just enough programming for automation: types, functions, async/await, JSON, npm scripts, Git and GitHub.',
      ar: 'البرمجة اللي بتحتاجها للأتمتة وبس: الأنواع، الدوال، async/await، JSON، سكربتات npm، Git وGitHub.',
    },
    tags: ['TypeScript', 'Node.js', 'Git'],
  },
  {
    n: 3, hours: 12,
    title: { en: 'Playwright foundations', ar: 'أساسيات Playwright' },
    body: {
      en: 'Locators, web-first assertions, forms, frames and uploads, UI mode, codegen and debugging with Trace Viewer.',
      ar: 'الـ Locators، التحققات، النماذج والإطارات ورفع الملفات، UI mode، codegen وتتبع الأخطاء عبر Trace Viewer.',
    },
    tags: ['Playwright', 'Locators', 'Trace Viewer'],
  },
  {
    n: 4, hours: 9,
    title: { en: 'Reliable test frameworks', ar: 'بناء إطار اختبار موثوق' },
    body: {
      en: 'Page Object Model, fixtures, authentication state, isolated test data, parallel runs and fixing flaky tests.',
      ar: 'نمط Page Object، الـ fixtures، حالة تسجيل الدخول، عزل بيانات الاختبار، التشغيل المتوازي وحل الاختبارات غير المستقرة.',
    },
    tags: ['POM', 'Fixtures', 'Parallel'],
  },
  {
    n: 5, hours: 9,
    title: { en: 'API, visual & accessibility testing', ar: 'اختبار API والواجهات وإمكانية الوصول' },
    body: {
      en: 'API tests with Playwright, schema checks, network mocking, visual regression and automated accessibility scans.',
      ar: 'اختبارات API عبر Playwright، التحقق من الـ schema، محاكاة الشبكة، الاختبار البصري وفحص إمكانية الوصول آلياً.',
    },
    tags: ['API', 'Visual', 'Accessibility'],
  },
  {
    n: 6, hours: 6,
    title: { en: 'AI-assisted testing', ar: 'الاختبار بمساعدة الذكاء الاصطناعي' },
    body: {
      en: 'Use AI to design tests, generate data and draft code — then verify it properly. Playwright MCP, test agents, limits and privacy.',
      ar: 'استخدم الذكاء الاصطناعي لتصميم الاختبارات وتوليد البيانات وكتابة الكود — وبعدها تحقق منه صح. Playwright MCP، وكلاء الاختبار، الحدود والخصوصية.',
    },
    tags: ['AI', 'Playwright MCP', 'Prompting'],
  },
  {
    n: 7, hours: 9,
    title: { en: 'Docker & CI/CD', ar: 'Docker وCI/CD' },
    body: {
      en: 'Run your tests in containers and on every push with GitHub Actions: Dockerfiles, Compose, artifacts and secrets.',
      ar: 'شغّل اختباراتك داخل containers ومع كل push عبر GitHub Actions: Dockerfile وCompose والتقارير والأسرار.',
    },
    tags: ['Docker', 'GitHub Actions'],
  },
  {
    n: 8, hours: 9,
    title: { en: 'n8n orchestration & AI triage', ar: 'أتمتة n8n وفرز الأخطاء بالذكاء الاصطناعي' },
    body: {
      en: 'Trigger test runs, branch on results, send alerts, and let AI classify failures and draft bug reports.',
      ar: 'شغّل الاختبارات تلقائياً، تفرّع حسب النتيجة، ابعث تنبيهات، وخلّي الذكاء الاصطناعي يصنّف الأخطاء ويكتب مسودة التقرير.',
    },
    tags: ['n8n', 'Webhooks', 'AI triage'],
  },
  {
    n: 9, hours: 8,
    title: { en: 'Capstone & career', ar: 'المشروع النهائي والتجهيز للشغل' },
    body: {
      en: 'Build and present a complete portfolio project, then prepare your CV, LinkedIn profile and interview answers.',
      ar: 'ابنِ مشروع متكامل واعرضه مباشرة، وبعدها جهّز سيرتك الذاتية وملف LinkedIn وإجابات المقابلات.',
    },
    tags: ['Portfolio', 'CV', 'Interviews'],
  },
];

export const QA_BUILD: L[] = [
  { en: 'A test plan, test cases and real bug reports', ar: 'خطة اختبار وحالات اختبار وتقارير أخطاء حقيقية' },
  { en: 'A Playwright + TypeScript framework with 20+ UI and API tests', ar: 'إطار Playwright وTypeScript فيه أكثر من ٢٠ اختبار واجهة وAPI' },
  { en: 'A Docker setup and a green GitHub Actions pipeline', ar: 'إعداد Docker وGitHub Actions pipeline شغّال' },
  { en: 'An n8n workflow that runs tests, triages failures with AI and alerts the team', ar: 'Workflow على n8n بيشغّل الاختبارات ويفرز الأخطاء بالذكاء الاصطناعي وينبّه الفريق' },
  { en: 'A public GitHub portfolio and a live demo for interviews', ar: 'ملف أعمال عام على GitHub وعرض مباشر للمقابلات' },
];

export const QA_FOR: L[] = [
  { en: 'IT and computer science students', ar: 'طلاب تكنولوجيا المعلومات وعلم الحاسوب' },
  { en: 'Fresh graduates looking for their first tech job', ar: 'الخريجين الجدد اللي بدوّروا على أول شغل تقني' },
  { en: 'Manual testers moving into automation', ar: 'مختبري البرمجيات اليدويين اللي بدهم ينتقلوا للأتمتة' },
  { en: 'Junior developers who want strong testing skills', ar: 'المطورين المبتدئين اللي بدهم مهارات اختبار قوية' },
];

export const QA_TRAINER = {
  name: { en: 'Abdulraheem Alsaka', ar: 'عبدالرحيم السقا' } as L,
  role: {
    en: 'Senior Quality Assurance & Automation Manager',
    ar: 'مدير أول للجودة والأتمتة (Senior QA & Automation Manager)',
  } as L,
  points: [
    {
      en: '12+ years in quality engineering and test automation across banking, EdTech, ride-hailing, maritime and cybersecurity.',
      ar: 'أكثر من ١٢ سنة في هندسة الجودة وأتمتة الاختبار في البنوك والتعليم الإلكتروني وتطبيقات التوصيل والملاحة البحرية والأمن السيبراني.',
    },
    {
      en: 'Senior QA Instructor at Al-Hussein Technical University and Princess Sumaya University for Technology.',
      ar: 'مدرّب أول لمادة الـ QA في جامعة الحسين التقنية وجامعة الأميرة سمية للتكنولوجيا.',
    },
    {
      en: 'Built QA teams from the ground up and led engineering teams of up to 15 people.',
      ar: 'بنى فرق QA من الصفر وقاد فرق هندسية وصل عددها لـ ١٥ شخص.',
    },
    {
      en: 'ISTQB Certified Tester, ISTQB Agile Tester, PMP and Professional Scrum Master.',
      ar: 'حاصل على ISTQB Certified Tester وISTQB Agile Tester وPMP وProfessional Scrum Master.',
    },
  ] as L[],
} as const;

export const QA_FAQ: { q: L; a: L }[] = [
  {
    q: { en: 'Is the course online or in person?', ar: 'الكورس أونلاين ولا حضوري؟' },
    a: {
      en: 'Fully online, live on Zoom — Thursdays and Saturdays, 6:00–9:00 pm Jordan time. You can join from anywhere.',
      ar: 'أونلاين بالكامل ومباشر عبر Zoom — الخميس والسبت من ٦:٠٠ لـ ٩:٠٠ مساءً بتوقيت الأردن. بتقدر تحضر من أي مكان.',
    },
  },
  {
    q: { en: 'Do I need programming experience?', ar: 'بحتاج خبرة برمجة؟' },
    a: {
      en: 'No. Module 2 teaches the TypeScript and Git you need for automation, step by step. Basic computer skills are enough to start.',
      ar: 'لا. الوحدة الثانية بتعلّمك TypeScript وGit اللي بتحتاجهم للأتمتة خطوة بخطوة. بتكفي مهارات الكمبيوتر الأساسية.',
    },
  },
  {
    q: { en: 'What do I need to join?', ar: 'شو بحتاج عشان أشارك؟' },
    a: {
      en: 'A laptop with at least 8 GB of RAM (16 GB recommended for Docker), a stable internet connection and Zoom. We send a setup checklist before the first session.',
      ar: 'لابتوب فيه ٨ جيجا رام على الأقل (يُفضّل ١٦ عشان Docker)، إنترنت ثابت، وZoom. بنبعتلك قائمة تجهيز قبل أول محاضرة.',
    },
  },
  {
    q: { en: 'What language is the course taught in?', ar: 'بأي لغة بيندرّس الكورس؟' },
    a: {
      en: 'The syllabus and learning materials are in English, which is the language of the tools themselves. Explanations during the live sessions can be adapted to the cohort.',
      ar: 'المنهاج والمواد بالإنجليزي لأنها لغة الأدوات نفسها، وشرح المحاضرات المباشرة بيتكيّف مع المجموعة.',
    },
  },
  {
    q: { en: 'Will I get a certificate?', ar: 'في شهادة؟' },
    a: {
      en: 'Yes. Learners who complete the final project and score at least 70% receive a Zyndesk certificate of completion.',
      ar: 'أكيد. اللي بيخلّص المشروع النهائي وبجيب ٧٠٪ على الأقل بياخذ شهادة إتمام من Zyndesk.',
    },
  },
  {
    q: { en: 'Does it prepare me for ISTQB?', ar: 'بجهّزني لامتحان ISTQB؟' },
    a: {
      en: 'The manual testing content is aligned to the ISTQB Foundation (CTFL v4.0) syllabus. The exam itself is taken separately.',
      ar: 'محتوى الاختبار اليدوي متوافق مع منهاج ISTQB Foundation (CTFL v4.0)، أما الامتحان نفسه فبتقدّمه لحالك.',
    },
  },
  {
    q: { en: 'How do I pay?', ar: 'كيف بدفع؟' },
    a: {
      en: 'After you reserve, Abdulraheem contacts you on WhatsApp to confirm your seat and share the payment options.',
      ar: 'بعد ما تحجز، بتواصل معك عبدالرحيم على الواتساب يأكّدلك المقعد ويحكيلك طرق الدفع.',
    },
  },
];
