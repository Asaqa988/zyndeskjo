import type { LocalisedText } from './course/types';

/**
 * The case for the field, and what comes after the course.
 *
 * Written as image briefs for social posts, and deliberately not built as
 * images: a picture of text is invisible to search, does not reflow on a
 * phone, and cannot be read aloud — and these are exactly the words someone
 * types into Google before they find a course like this. Rendered as markup
 * it stays findable, readable and editable, and a screenshot for LinkedIn is
 * still one keystroke away.
 *
 * Both pages read from this one file. `page` decides which.
 *
 * The Arabic is the author's own copy, dialect intact. The English is a
 * translation of it — change one and change the other.
 */

/** Which of the two pages a section belongs to. */
export type PitchPage = 'why' | 'after';

export type PitchBlock =
  /** A plain paragraph. */
  | { kind: 'text'; text: LocalisedText }
  /** Bullet points. */
  | { kind: 'points'; items: LocalisedText[] }
  /** Two sides set against each other — the old way and the new one. */
  | {
      kind: 'compare';
      sides: {
        tone: 'weak' | 'strong';
        label: LocalisedText;
        caption?: LocalisedText;
        items: LocalisedText[];
      }[];
    }
  /** Who this is for — a card each. */
  | { kind: 'personas'; items: { icon: string; label: LocalisedText; text: LocalisedText }[] }
  /** A sequence that runs top to bottom. */
  | { kind: 'flow'; steps: LocalisedText[] }
  /** Short labels — roles, skills, tools. */
  | { kind: 'chips'; items: string[] };

export interface PitchSection {
  id: string;
  page: PitchPage;
  icon: string;
  title: LocalisedText;
  blocks: PitchBlock[];
  /** The line worth remembering. Rendered last, pulled out. */
  hook?: LocalisedText;
}

export const pitchSections: PitchSection[] = [
  /* ── page: why ──────────────────────────────────────────────────────── */
  {
    id: 'why-now',
    page: 'why',
    icon: 'Rocket',
    title: {
      ar: 'ليش تتعلم AI Automation في ٢٠٢٦؟',
      en: 'Why learn AI Automation in 2026?',
    },
    blocks: [
      {
        kind: 'points',
        items: [
          {
            ar: 'الشركات بدها تقلل الشغل اليدوي المتكرر.',
            en: 'Businesses want less repetitive manual work.',
          },
          {
            ar: 'الـ AI لحاله بعطي إجابة، لكن Automation بخليه ينفذ.',
            en: 'AI on its own gives you an answer. Automation makes it act.',
          },
          {
            ar: 'بتقدر تربط WhatsApp، Email، CRM، Sheets، APIs وغيرها.',
            en: 'You can connect WhatsApp, email, a CRM, Sheets, APIs and more.',
          },
          {
            ar: 'المهارة قابلة للاستخدام بوظيفة، Freelancing أو مشروعك الخاص.',
            en: 'The skill works in a job, in freelancing, or in your own business.',
          },
          {
            ar: 'مش لازم تكون Software Engineer عشان تبدأ.',
            en: 'You do not need to be a software engineer to start.',
          },
          {
            ar: 'بتتعلم كيف تحول مشكلة Business إلى System فعلي.',
            en: 'You learn how to turn a business problem into a working system.',
          },
        ],
      },
    ],
    hook: {
      ar: 'المستقبل مش بس للي بعرف يستخدم AI… للي بعرف يخليه يشتغل وينفذ عنه.',
      en: 'The future is not only for people who can use AI — it is for people who can put it to work.',
    },
  },
  {
    id: 'use-vs-build',
    page: 'why',
    icon: 'Brain',
    title: {
      ar: 'الفرق بين استخدام ChatGPT وبناء AI Automation',
      en: 'Using ChatGPT versus building AI automation',
    },
    blocks: [
      {
        kind: 'compare',
        sides: [
          {
            tone: 'weak',
            label: { ar: 'استخدام الـ AI', en: 'Using AI' },
            items: [
              { ar: 'إنت بتسأل', en: 'You ask' },
              { ar: 'الـ AI بجاوب', en: 'AI answers' },
              { ar: 'وإنت بتنفذ', en: 'and you do the work' },
            ],
          },
          {
            tone: 'strong',
            label: { ar: 'AI Automation', en: 'AI automation' },
            items: [
              { ar: 'العميل بيرسل', en: 'The customer writes in' },
              { ar: 'الـ AI بفهم', en: 'AI understands' },
              { ar: 'بدوّر', en: 'looks things up' },
              { ar: 'بقرّر', en: 'decides' },
              { ar: 'بحدّث الـ CRM', en: 'updates the CRM' },
              { ar: 'ببعت Email', en: 'sends an email' },
              { ar: 'بحجز موعد', en: 'books an appointment' },
              { ar: 'وببلّغ الفريق', en: 'and tells the team' },
            ],
          },
        ],
      },
    ],
    hook: {
      ar: 'Don’t just use AI. Make AI work for you.',
      en: 'Don’t just use AI. Make AI work for you.',
    },
  },
  {
    id: 'old-vs-new',
    page: 'why',
    icon: 'GitCompare',
    title: {
      ar: 'الفرق بين الأتمتة القديمة و AI Automation',
      en: 'Traditional automation versus AI automation',
    },
    blocks: [
      {
        kind: 'compare',
        sides: [
          {
            tone: 'weak',
            label: { ar: 'Traditional Automation', en: 'Traditional automation' },
            caption: { ar: 'ممتازة للقواعد الثابتة.', en: 'Excellent for fixed rules.' },
            items: [
              { ar: 'IF X', en: 'IF X' },
              { ar: '→ DO Y', en: '→ DO Y' },
            ],
          },
          {
            tone: 'strong',
            label: { ar: 'AI Automation', en: 'AI automation' },
            caption: {
              ar: 'بتفهم البيانات غير المنظّمة كمان.',
              en: 'It also understands unstructured data.',
            },
            items: [
              { ar: 'Receive — بستقبل', en: 'Receive' },
              { ar: 'Understand — بفهم', en: 'Understand' },
              { ar: 'Reason — بحلّل', en: 'Reason' },
              { ar: 'Choose Tool — بختار الأداة', en: 'Choose a tool' },
              { ar: 'Take Action — بنفّذ', en: 'Take action' },
            ],
          },
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'يعني الـ AI بضيف فهم للبيانات غير المنظّمة، زي الإيميلات والـ CVs والرسائل الصوتية والصور — واللي الأتمتة القديمة ما بتعرف تتعامل معها.',
          en: 'AI adds an understanding of unstructured data — emails, CVs, voice notes, images — the kind of thing rule-based automation cannot handle.',
        },
      },
    ],
  },
  {
    id: 'a-day',
    page: 'why',
    icon: 'Clock',
    title: {
      ar: 'يوم كامل بدون أتمتة، ويوم معها',
      en: 'A full day without automation, and one with it',
    },
    blocks: [
      {
        kind: 'compare',
        sides: [
          {
            tone: 'weak',
            label: { ar: 'بدون Automation', en: 'Without automation' },
            items: [
              { ar: '📧 افتح الإيميل', en: '📧 Open the email' },
              { ar: '📋 انسخ البيانات', en: '📋 Copy the data out' },
              { ar: '📊 حطها بالشيت', en: '📊 Paste it into a sheet' },
              { ar: '💬 رد على العميل', en: '💬 Reply to the customer' },
              { ar: '📞 بلّغ المبيعات', en: '📞 Tell sales' },
              { ar: '🗂️ حدّث الـ CRM', en: '🗂️ Update the CRM' },
              { ar: '📅 احجز الموعد', en: '📅 Book the appointment' },
            ],
          },
          {
            tone: 'strong',
            label: { ar: 'مع n8n + AI', en: 'With n8n + AI' },
            items: [
              { ar: '☕ إنت بتشرب قهوتك…', en: '☕ You drink your coffee…' },
              { ar: 'والـ Workflow عملهم كلهم.', en: 'and the workflow did all of it.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'who-for',
    page: 'why',
    icon: 'Users',
    title: { ar: 'لمين هذا المجال؟', en: 'Who is this field for?' },
    blocks: [
      {
        kind: 'personas',
        items: [
          {
            icon: 'GraduationCap',
            label: { ar: 'طالب جامعة', en: 'A university student' },
            text: {
              ar: 'بدك مهارة جديدة ومشاريع تحطها بالـ Portfolio.',
              en: 'You want a new skill and projects for your portfolio.',
            },
          },
          {
            icon: 'Briefcase',
            label: { ar: 'خريج جديد', en: 'A new graduate' },
            text: {
              ar: 'بدك تدخل سوق العمل بإشي مختلف.',
              en: 'You want to enter the job market with something different.',
            },
          },
          {
            icon: 'Building2',
            label: { ar: 'موظف', en: 'An employee' },
            text: {
              ar: 'بدك تختصر الشغل المتكرر باستخدام الـ AI.',
              en: 'You want to cut the repetitive part of your job using AI.',
            },
          },
          {
            icon: 'Laptop',
            label: { ar: 'Freelancer', en: 'A freelancer' },
            text: {
              ar: 'بدك تقدّم خدمات أتمتة لعملائك.',
              en: 'You want to offer automation services to your clients.',
            },
          },
          {
            icon: 'Store',
            label: { ar: 'صاحب Business', en: 'A business owner' },
            text: {
              ar: 'بدك تأتمت المبيعات والدعم والعمليات.',
              en: 'You want to automate sales, support and operations.',
            },
          },
          {
            icon: 'Compass',
            label: { ar: 'حتى لو تخصصك مش IT', en: 'Even if your field is not IT' },
            text: {
              ar: 'بتقدر تبدأ من الأساسيات وتتدرّج معنا.',
              en: 'You can start from the basics and build up with us.',
            },
          },
        ],
      },
    ],
    hook: { ar: 'AI Automation مش بس للمبرمجين.', en: 'AI automation is not just for programmers.' },
  },
  {
    id: 'need-to-code',
    page: 'why',
    icon: 'Code2',
    title: {
      ar: 'لازم أكون مبرمج عشان أتعلم n8n + AI؟',
      en: 'Do I need to be a programmer to learn n8n and AI?',
    },
    blocks: [
      {
        kind: 'text',
        text: {
          ar: 'لا. لكن رح تتعلم بالتدريج:',
          en: 'No. But you will pick these up along the way:',
        },
      },
      {
        kind: 'chips',
        items: [
          'APIs',
          'Webhooks',
          'JSON',
          'AI Models',
          'Prompts',
          'Logic',
          'Databases',
          'Integrations',
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'وهذا بحد ذاته بخليك تفهم كيف الأنظمة الحديثة بتتواصل مع بعض.',
          en: 'And that on its own teaches you how modern systems talk to each other.',
        },
      },
    ],
  },

  /* ── page: after ────────────────────────────────────────────────────── */
  {
    id: 'before-after',
    page: 'after',
    icon: 'Sparkles',
    title: {
      ar: 'شو رح تكون قادر تعمل بعد الكورس؟',
      en: 'What will you be able to do after the course?',
    },
    blocks: [
      {
        kind: 'compare',
        sides: [
          {
            tone: 'weak',
            label: { ar: 'قبل', en: 'Before' },
            items: [{ ar: 'بعرف أستخدم ChatGPT.', en: 'I know how to use ChatGPT.' }],
          },
          {
            tone: 'strong',
            label: { ar: 'بعد', en: 'After' },
            items: [{ ar: 'بعرف أبني System يستخدم الـ AI.', en: 'I know how to build a system that uses AI.' }],
          },
        ],
      },
      {
        kind: 'chips',
        items: ['WhatsApp', 'n8n', 'AI', 'CRM', 'Email', 'Calendar', 'Database'],
      },
    ],
  },
  {
    id: 'idea-to-system',
    page: 'after',
    icon: 'Workflow',
    title: { ar: 'من فكرة إلى AI System', en: 'From an idea to an AI system' },
    blocks: [
      {
        kind: 'flow',
        steps: [
          { ar: '💡 عندك فكرة', en: '💡 You have an idea' },
          { ar: 'حدّد المشكلة', en: 'Define the problem' },
          { ar: 'صمّم الـ Workflow', en: 'Design the workflow' },
          { ar: 'اربط الـ APIs', en: 'Connect the APIs' },
          { ar: 'أضف AI Agent', en: 'Add an AI agent' },
          { ar: 'أضف الأدوات', en: 'Give it tools' },
          { ar: 'Automation', en: 'Automation' },
          { ar: '🚀 Deploy', en: '🚀 Deploy' },
        ],
      },
    ],
    hook: {
      ar: 'بالكورس مش رح نحفظ Nodes… رح نتعلم كيف نفكّر ونبني Automation من الصفر.',
      en: 'The course is not about memorising nodes — it is about learning to think, and to build automation from nothing.',
    },
  },
  {
    id: 'roles',
    page: 'after',
    icon: 'BriefcaseBusiness',
    title: { ar: 'تعلّمت n8n + AI… وبعدين؟', en: 'You have learned n8n and AI — what then?' },
    blocks: [
      {
        kind: 'text',
        text: {
          ar: 'هاي مسارات بيشتغل فيها الناس بهذا المجال — مش وعود توظيف:',
          en: 'These are the paths people work in — not job guarantees:',
        },
      },
      {
        kind: 'chips',
        items: [
          'AI Automation Specialist',
          'Automation Developer',
          'AI Workflow Builder',
          'AI Integration Specialist',
          'Freelance Automation Consultant',
          'AI Solutions Builder',
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'أو تستخدم المهارة جوّا مجالك الحالي، بدون ما تغيّر شغلك.',
          en: 'Or you use the skill inside the field you are already in, without changing job at all.',
        },
      },
    ],
  },
  {
    id: 'income',
    page: 'after',
    icon: 'Coins',
    title: { ar: 'كيف ممكن تعمل دخل من المهارة؟', en: 'How can the skill earn you money?' },
    blocks: [
      {
        kind: 'flow',
        steps: [
          { ar: 'تعلّم', en: 'Learn' },
          { ar: 'ابنِ', en: 'Build' },
          { ar: 'حلّ مشكلة', en: 'Solve a problem' },
          { ar: 'قدّم خدمة', en: 'Offer a service' },
        ],
      },
      {
        kind: 'text',
        text: { ar: 'أمثلة على خدمات فعلية:', en: 'Examples of services people actually sell:' },
      },
      {
        kind: 'points',
        items: [
          { ar: 'بناء WhatsApp AI Agent لشركة.', en: 'Building a WhatsApp AI agent for a company.' },
          { ar: 'أتمتة الـ Leads وربطهم مع الـ CRM.', en: 'Automating leads and wiring them into a CRM.' },
          { ar: 'بناء Customer Support Automation.', en: 'Building customer support automation.' },
          { ar: 'أتمتة الفواتير والتقارير.', en: 'Automating invoices and reports.' },
          { ar: 'بناء Internal AI Agent للشركات.', en: 'Building an internal AI agent for a business.' },
        ],
      },
    ],
    hook: {
      ar: 'بدل ما تبيع ساعات عملك… بيع Solution لمشكلة.',
      en: 'Instead of selling your hours, sell the solution to a problem.',
    },
  },
];

export const sectionsFor = (page: PitchPage) => pitchSections.filter((s) => s.page === page);
