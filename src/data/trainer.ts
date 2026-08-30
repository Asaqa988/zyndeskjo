import type { LocalisedText } from './course/types';

/**
 * Who is teaching the course.
 *
 * A trust page, not a job application: the reader is deciding whether to hand
 * this person 130 dinars and eight weeks of their evenings. So it leads with
 * the two things that answer that — years spent building the thing being
 * taught, and years spent teaching it — and keeps the full history below for
 * anyone who wants to check.
 *
 * Sourced from the CV that also feeds agent-knowledge.ts, so the assistant and
 * this page never describe him differently.
 */

export const trainer = {
  name: { ar: 'عبدالرحيم السقا', en: 'Abdulraheem Alsaka' },
  headline: {
    ar: 'مدير أول لضمان الجودة والأتمتة · مدير مشاريع تقني',
    en: 'Senior Quality Assurance & Automation Manager · Technical Project Manager',
  },
  location: { ar: 'عمّان، الأردن', en: 'Amman, Jordan' },
  /** Under /public/trainer. */
  photo: '/trainer/abdulraheem.jpg',
  cv: '/trainer/Abdulraheem-Alsaka-CV.pdf',

  intro: {
    ar: 'أكثر من ١٢ سنة بهندسة الجودة وأتمتة الاختبار وإدارة المشاريع التقنية، بقطاعات البنوك والتعليم والنقل والملاحة البحرية والأمن السيبراني. شغلي الأخير كله بأتمتة الذكاء الاصطناعي: أنظمة LLM و RAG، ووكلاء ذكاء، وتنسيق Workflows — مع تطوير فعلي بـ Flutter و React و Node.js و Supabase.',
    en: 'More than 12 years across quality engineering, test automation and technical project delivery — in banking, EdTech, ride-hailing, maritime and cybersecurity. Recent work is all AI-driven automation: LLM and RAG systems, AI agents and workflow orchestration, alongside hands-on development in Flutter, React, Node.js and Supabase.',
  },

  /** The numbers someone scans before reading anything. */
  facts: [
    { value: '+12', label: { ar: 'سنة خبرة', en: 'years of experience' } },
    { value: '15', label: { ar: 'مهندس بأكبر فريق قاده', en: 'engineers in his largest team' } },
    { value: '4', label: { ar: 'جامعات ومعاهد درّس فيها', en: 'universities and institutes taught at' } },
    { value: '6', label: { ar: 'شهادات مهنية معتمدة', en: 'professional certifications' } },
  ],

  certifications: [
    'ISTQB Certified Tester',
    'ISTQB Agile Tester',
    'Professional Scrum Master (PSM)',
    'Project Management Professional (PMP)',
    'COBIT 5 — ISACA',
    'Microsoft Azure Fundamentals (AZ-900)',
  ],

  /** Why he is the one teaching this particular course. */
  teaching: {
    title: { ar: 'التدريس', en: 'Teaching' },
    lead: {
      ar: 'التدريس مش إشي جديد عليه — بالتوازي مع شغله، درّس بأربع جامعات ومعاهد بالأردن:',
      en: 'Teaching is not new to him. Alongside the roles below, he has taught at four Jordanian universities and institutes:',
    },
    items: [
      {
        org: { ar: 'جامعة الأميرة سمية للتكنولوجيا', en: 'Princess Sumaya University for Technology' },
        role: { ar: 'محاضر أول — ضمان الجودة', en: 'Senior QA Instructor' },
        period: { ar: '٢٠٢٢ – ٢٠٢٦', en: '2022 – 2026' },
      },
      {
        org: { ar: 'جامعة الحسين التقنية', en: 'Al-Hussein Technical University' },
        role: { ar: 'محاضر أول — ضمان الجودة', en: 'Senior QA Instructor' },
        period: { ar: '٢٠٢٣ – ٢٠٢٥', en: '2023 – 2025' },
      },
      {
        org: { ar: 'كلية لومينوس التقنية الجامعية', en: 'Luminus Technical University College' },
        role: { ar: 'محاضر تقني أول', en: 'Senior Technical Instructor' },
        period: { ar: '٢٠٢٢ – ٢٠٢٤', en: '2022 – 2024' },
      },
      {
        org: { ar: 'مركز Tuned Applications للتدريب', en: 'Tuned Applications Training Center' },
        role: { ar: 'مدرّب أول — ضمان الجودة', en: 'Senior QA Trainer' },
        period: { ar: '٢٠٢١ – ٢٠٢٢', en: '2021 – 2022' },
      },
    ],
  },

  /** Selected roles — the ones that explain why he teaches this course. */
  experience: {
    title: { ar: 'الخبرة العملية', en: 'Experience' },
    items: [
      {
        role: { ar: 'مدير أول للأتمتة', en: 'Senior Automation Manager' },
        org: { ar: 'JO Academy — عمّان', en: 'JO Academy — Amman' },
        period: { ar: 'نيسان ٢٠٢٦ – الآن', en: 'Apr 2026 – present' },
        points: [
          {
            ar: 'بنى نظام CRM لدعم العملاء مدفوعاً بالذكاء الاصطناعي، من التصميم للإنتاج.',
            en: 'Built an AI-driven customer support CRM end to end, from architecture to production.',
          },
          {
            ar: 'مسار تصنيف بـ GPT-4o-mini بوجّه رسائل الدعم لخمس فئات تلقائياً.',
            en: 'A GPT-4o-mini classification pipeline routing support messages into five categories.',
          },
          {
            ar: 'موزّع موظفين حسب الحِمل بتقييم ٠–١٠٠ ومستويات مهارة وحدود لكل موظف.',
            en: 'A load-based agent dispatcher with 0–100 scoring, skill tiers and per-agent caps.',
          },
          {
            ar: 'مقترح ردود عربي مبني على RAG، بيعطي مسودات مستندة لمصادر فعلية.',
            en: 'A RAG-based Arabic reply suggester producing source-grounded drafts.',
          },
          {
            ar: 'مسار Crisp Webhooks بيوحّد واتساب وإنستجرام وفيسبوك بصندوق واحد.',
            en: 'A Crisp webhook pipeline unifying WhatsApp, Instagram and Facebook into one inbox.',
          },
        ],
      },
      {
        role: { ar: 'مطوّر Full Stack ومدير مشروع تقني', en: 'Full Stack Developer & Technical Project Manager' },
        org: { ar: 'CabJordan — عمّان', en: 'CabJordan — Amman' },
        period: { ar: 'كانون الثاني – آب ٢٠٢٦', en: 'Jan – Aug 2026' },
        points: [
          {
            ar: 'تطبيق نقل ركّاب يخدم عمّان وإربد والزرقاء — دورة الرحلة كاملة من الطلب للتسليم.',
            en: 'A ride-hailing app serving Amman, Irbid and Zarqa — the full trip lifecycle.',
          },
          {
            ar: 'Flutter و Riverpod و Supabase و Google Maps، وإشعارات لحظية عبر Firebase.',
            en: 'Flutter, Riverpod, Supabase and Google Maps, with realtime push over Firebase.',
          },
          {
            ar: 'تعريب كامل بدعم RTL، ولوحة تحكّم إدارية بـ Next.js.',
            en: 'Full Arabic localisation with RTL support, and a Next.js admin dashboard.',
          },
        ],
      },
      {
        role: { ar: 'مهندس ذكاء اصطناعي', en: 'AI Engineer' },
        org: { ar: 'NavSeek — عن بُعد', en: 'NavSeek — remote' },
        period: { ar: 'تشرين الأول ٢٠٢٥ – تموز ٢٠٢٦', en: 'Oct 2025 – Jul 2026' },
        points: [
          {
            ar: 'منصة ذكاء قرارات لمشغّلي السفن، مبنية على RAG فوق بيانات بحرية وتشغيلية.',
            en: 'A decision intelligence platform for vessel operators, built on RAG over maritime data.',
          },
          {
            ar: 'محرّك قرار وموجّه أدوات بيختار النموذج والأداة المناسبة لكل استعلام.',
            en: 'A decision engine and tool router selecting the right model and tool per query.',
          },
        ],
      },
      {
        role: { ar: 'مهندس ذكاء اصطناعي', en: 'AI Engineer' },
        org: { ar: 'مجموعة زمزم — عمّان', en: 'Zamzam Group — Amman' },
        period: { ar: 'تشرين الأول ٢٠٢٥ – نيسان ٢٠٢٦', en: 'Oct 2025 – Apr 2026' },
        points: [
          {
            ar: 'وكلاء ذكاء و Workflows بتنفّذ عمليات عمل متعدّدة الخطوات بأقل تدخّل بشري.',
            en: 'AI agents and workflows running multi-step business processes with minimal human input.',
          },
          {
            ar: 'تكاملات APIs وقواعد بيانات ربطت الأنظمة الداخلية بأطراف خارجية.',
            en: 'API and database integrations connecting internal systems to third parties.',
          },
        ],
      },
      {
        role: { ar: 'مدير أول للجودة', en: 'Senior Quality Manager' },
        org: { ar: 'البنك العربي الإسلامي الدولي — عمّان', en: 'Islamic International Arab Bank — Amman' },
        period: { ar: 'كانون الأول ٢٠٢٣ – تشرين الأول ٢٠٢٥', en: 'Dec 2023 – Oct 2025' },
        points: [
          {
            ar: 'أتمتة الاختبار على أنظمة البنك الأساسية، ووسّع تغطية الـ regression.',
            en: 'Test automation across core banking systems, widening regression coverage.',
          },
          {
            ar: 'إدارة الـ UAT مع أصحاب العمل، وبوابات جودة قبل كل إصدار.',
            en: 'Ran UAT with business stakeholders, and quality gates before each release.',
          },
        ],
      },
      {
        role: { ar: 'قائد تقني أول', en: 'Senior Technical Lead' },
        org: { ar: 'Dogan Voyages — عمّان', en: 'Dogan Voyages — Amman' },
        period: { ar: '٢٠٢٣ – ٢٠٢٦', en: '2023 – 2026' },
        points: [
          {
            ar: 'قاد فريقاً من ١٥ شخصاً بين التطوير والعمليات التقنية.',
            en: 'Led a team of 15 across development and technical operations.',
          },
        ],
      },
    ],
  },

  education: {
    title: { ar: 'التعليم', en: 'Education' },
    text: {
      ar: 'بكالوريوس نظم المعلومات الإدارية — الجامعة الأردنية، عمّان (٢٠١٧).',
      en: 'BSc Management Information Systems — University of Jordan, Amman (2017).',
    },
  },
} as const;

export type Trainer = typeof trainer;
export type { LocalisedText };
