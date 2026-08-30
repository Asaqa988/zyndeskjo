import type { LocalisedText } from './course/types';

/**
 * The systems a student builds during the course.
 *
 * This is sales material, not curriculum: someone deciding whether to pay
 * reads it to see what they walk away owning. So each entry leads with the
 * finished thing, walks the pipeline that produces it, and closes on what the
 * skill is worth outside the classroom.
 *
 * The Arabic is the author's own wording, kept as written — including the
 * dialect. The English is a translation, not a separate pitch: if one side
 * changes, change the other.
 *
 * Images are dense workflow diagrams with small labels inside them, which is
 * why the page renders them at full width and lets them open larger. A
 * thumbnail grid would show three unreadable rectangles.
 */

/** A paragraph, a numbered stage, or a plain list — enough for this content. */
export type BuildBlock =
  | { kind: 'text'; text: LocalisedText }
  | { kind: 'step'; heading: LocalisedText; text: LocalisedText }
  | { kind: 'list'; items: LocalisedText[] }
  /** The line worth remembering — rendered as a pulled-out card. */
  | { kind: 'note'; text: LocalisedText };

export interface Build {
  id: string;
  /** Under /public/builds. */
  image: string;
  /** Intrinsic size, so the layout reserves the right box before it loads. */
  width: number;
  height: number;
  title: LocalisedText;
  /** One line under the title, before the detail. */
  lead: LocalisedText;
  blocks: BuildBlock[];
}

export const builds: Build[] = [
  {
    id: 'product-photo-enhancer',
    image: '/builds/product-photo-enhancer.png',
    width: 1774,
    height: 887,
    title: {
      ar: 'تحويل صورة المنتج العادية لصورة احترافية',
      en: 'Turning an ordinary product photo into a professional one',
    },
    lead: {
      ar: 'تخيّل إنك عندك صورة عادية لمنتج، مثلاً صورة شنطة مصوّرة بالمحل أو بالبيت، والخلفية مش مرتبة والإضاءة مش أفضل إشي. هون بيجي دور n8n + AI.',
      en: 'Picture an ordinary product photo — a bag shot in the shop or at home, cluttered background, poor lighting. This is where n8n and AI come in.',
    },
    blocks: [
      {
        kind: 'text',
        text: {
          ar: 'أول إشي، المستخدم ببعت صورة المنتج للـ Workflow، سواء عن طريق WhatsApp أو Webhook أو أي مصدر ثاني. بعدها الـ n8n بستلم الصورة وببدأ يمررها على مجموعة من خطوات الـ AI بشكل أوتوماتيكي:',
          en: 'The user sends the product photo into the workflow — over WhatsApp, a webhook, or any other source. n8n picks it up and passes it through a series of AI steps automatically:',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'استلام صورة المنتج 📸', en: 'Receive the product photo 📸' },
        text: {
          ar: 'الـ Workflow بستقبل الصورة ومعها ممكن معلومات إضافية عن المنتج، زي اسمه، نوع الصورة المطلوبة، والـ Style أو الخلفية اللي بدنا إياها.',
          en: 'The workflow takes the image along with anything else you want to pass: the product name, the kind of shot you need, the style or background you are after.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'تنظيف الصورة ✨', en: 'Clean the image ✨' },
        text: {
          ar: 'الـ AI بفصل المنتج عن الخلفية الأصلية، وبشيل الأشياء اللي مش ضرورية، بحيث يضل المنتج واضح ونظيف.',
          en: 'The AI separates the product from its original background and removes everything that does not belong, leaving the product clean and clear.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'تحسين جودة الصورة 🎨', en: 'Improve the quality 🎨' },
        text: {
          ar: 'بعدها بنعمل تحسين للإضاءة، الـ Contrast، الـ Sharpness والتفاصيل، عشان المنتج يطلع أوضح وأكثر احترافية.',
          en: 'Lighting, contrast, sharpness and detail are all lifted, so the product reads as sharper and more professional.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'إنشاء خلفية جديدة بالـ AI 🪄', en: 'Generate a new background with AI 🪄' },
        text: {
          ar: 'هون الجزء الممتع. بدل الخلفية العادية، بنخلي الـ AI ينشئ خلفية مناسبة للمنتج. مثلاً إذا المنتج شنطة، ممكن نطلب منه يحطها داخل ستوديو فاخر، أو على طاولة رخام، أو بمشهد Lifestyle مناسب للبراند.',
          en: 'This is the fun part. Instead of the background it came with, the AI creates one that suits the product. A bag can be placed in a high-end studio, on a marble table, or in a lifestyle scene that matches the brand.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'رفع الدقة — Upscaling 🚀', en: 'Upscaling 🚀' },
        text: {
          ar: 'بعد ما تطلع الصورة النهائية، ممكن نعمل لها Upscale عشان نرفع الدقة ونحافظ على تفاصيل المنتج.',
          en: 'Once the final image is out, it can be upscaled to raise the resolution while holding on to the product detail.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'حفظ الصورة تلقائياً ☁️', en: 'Save it automatically ☁️' },
        text: {
          ar: 'الـ n8n بحفظ الصورة النهائية بشكل أوتوماتيكي على Google Drive أو أي Storage بنستخدمه.',
          en: 'n8n files the finished image on Google Drive, or whatever storage you use.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'تسجيل العملية 📊', en: 'Log the run 📊' },
        text: {
          ar: 'ممكن كمان يسجل معلومات العملية على Google Sheets، مثل اسم المنتج، وقت المعالجة، ورابط الصورة النهائية.',
          en: 'It can also record the run in Google Sheets — product name, processing time, and a link to the final image.',
        },
      },
      {
        kind: 'step',
        heading: { ar: 'إرسال النتيجة للمستخدم 📱', en: 'Send the result back 📱' },
        text: {
          ar: 'وبالنهاية، الـ n8n ممكن يبعت الصورة الاحترافية للمستخدم مباشرة على WhatsApp.',
          en: 'Finally, n8n can send the finished image straight back to the user on WhatsApp.',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'يعني بدل ما المصمم يقعد كل مرة يفتح Photoshop ويقص الخلفية ويعدل الإضاءة ويدور على Background مناسب، إحنا بنعمل Workflow واحد وبخلي الـ AI والـ n8n يعملوا العملية كاملة بشكل أوتوماتيكي.',
          en: 'So instead of a designer opening Photoshop every time to cut out the background, fix the lighting and hunt for a backdrop, you build the workflow once and let AI and n8n run the whole thing.',
        },
      },
      {
        kind: 'note',
        text: {
          ar: 'والأجمل إنه نفس الـ Workflow ممكن تستخدمه لمتجر إلكتروني، Social Media، Dropshipping، Marketplace أو حتى تعمل منه خدمة وتبيعها لأصحاب المتاجر.',
          en: 'And the same workflow works for an online store, social media, dropshipping or a marketplace — or you can turn it into a service and sell it to shop owners.',
        },
      },
    ],
  },
  {
    id: 'cv-analyzer',
    image: '/builds/cv-analyzer.png',
    width: 1536,
    height: 1024,
    title: {
      ar: 'AI CV Analyzer كامل باستخدام n8n',
      en: 'A complete AI CV Analyzer with n8n',
    },
    lead: {
      ar: 'تخيّل إنك بنهاية اللاب تقدر تبني نظام، الطالب برفع عليه الـ CV تبعه، وبحط الـ Job Description للوظيفة اللي بده يقدم عليها، ومن هون كل الشغل بصير أوتوماتيكياً.',
      en: 'By the end of the lab you can build a system where someone uploads their CV, pastes the job description they are applying for, and everything from there runs by itself.',
    },
    blocks: [
      {
        kind: 'text',
        text: {
          ar: 'رح نتعلم خطوة بخطوة كيف نخلي n8n يستقبل الـ CV سواء كان PDF أو DOCX، ويستخرج منه الخبرات والمهارات والتعليم والمشاريع. بعدها رح نربطه مع AI ونخليه يفهم متطلبات الوظيفة ويعمل مقارنة ذكية بينها وبين الـ CV.',
          en: 'Step by step, you make n8n accept a CV as a PDF or DOCX and pull out the experience, skills, education and projects. Then you connect it to AI so it understands what the job asks for and compares the two properly.',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'مش بس هيك 🔥 — رح نخلي النظام يطلع Match Score للطالب، مثلاً 86% Match، ويفصّل النتيجة: قديش مهاراته مناسبة، خبرته مناسبة، شو الـ Keywords الموجودة والناقصة، وشو نقاط القوة والضعف بالـ CV.',
          en: 'And more than that 🔥 — the system produces a match score, say 86%, and breaks it down: how well the skills fit, how well the experience fits, which keywords are present and which are missing, and where the CV is strong or weak.',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'وبعدين الـ AI رح يعطي الطالب Recommendations مخصصة إله:',
          en: 'Then the AI gives them recommendations written for their case:',
        },
      },
      {
        kind: 'list',
        items: [
          { ar: 'شو لازم يعدّل بالـ CV؟', en: 'What should change in the CV?' },
          { ar: 'شو المهارات الناقصة؟', en: 'Which skills are missing?' },
          { ar: 'شو الـ Keywords اللي لازم يضيفها؟', en: 'Which keywords need adding?' },
          { ar: 'شو المشاريع اللي ممكن تقوّي فرصته؟', en: 'Which projects would strengthen their chances?' },
          {
            ar: 'وكيف يخلي الـ CV أقرب للوظيفة اللي بده يقدم عليها؟',
            en: 'And how to bring the CV closer to the role they are applying for?',
          },
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'وبالنهاية رح نتعلم كيف نخلي n8n يدير العملية كاملة بشكل أوتوماتيكي، من لحظة رفع الـ CV لحد ما يوصل الطالب تقرير مرتب على الـ WhatsApp أو Email.',
          en: 'Finally you make n8n run the whole thing end to end, from the moment the CV is uploaded to a tidy report arriving on WhatsApp or by email.',
        },
      },
      {
        kind: 'note',
        text: {
          ar: 'يعني باللاب إنت مش بس رح تتعلم كيف تستخدم n8n وAI — إنت رح تبني AI System حقيقي من الصفر، ممكن تستخدمه لنفسك، تضيفه لمشروعك، أو حتى تحوله لخدمة وتبيعها للناس. 🔥',
          en: 'So the lab is not only about learning n8n and AI — you build a real AI system from scratch, one you can use yourself, add to your own project, or turn into a service and sell. 🔥',
        },
      },
    ],
  },
  {
    id: 'lead-qualification',
    image: '/builds/lead-qualification.png',
    width: 1536,
    height: 1024,
    title: {
      ar: 'AI Lead Qualification System باستخدام n8n',
      en: 'An AI Lead Qualification System with n8n',
    },
    lead: {
      ar: 'تخيّل شركة بوصلها كل يوم عشرات العملاء من WhatsApp، الموقع، الإعلانات أو الـ Forms. بدل ما موظف المبيعات يضيع وقته يحكي مع كل شخص ويسأله نفس الأسئلة عشان يعرف إذا هو عميل جدي أو لأ، إحنا رح نبني نظام كامل يعمل هاي العملية أوتوماتيكياً باستخدام n8n + AI. 🤖',
      en: 'Picture a business getting dozens of enquiries a day from WhatsApp, the website, ads or forms. Instead of a salesperson spending the day asking every one of them the same questions to find out who is serious, you build a system that does it automatically with n8n and AI. 🤖',
    },
    blocks: [
      {
        kind: 'text',
        text: {
          ar: 'باللاب رح تتعلم كيف تستقبل أي Lead جديد جاي من WhatsApp أو Form، وتخلي n8n يشغّل الـ Workflow مباشرة. بعدها رح نبني AI Agent يبدأ محادثة فعلية مع العميل ويسأله أسئلة ذكية حسب إجاباته. مثلاً:',
          en: 'In the lab you take in any new lead from WhatsApp or a form and have n8n fire the workflow straight away. Then you build an AI agent that holds a real conversation, asking questions that follow from the answers it gets. For example:',
        },
      },
      {
        kind: 'list',
        items: [
          { ar: '«شو نوع الخدمة اللي بتدور عليها؟»', en: '“What kind of service are you looking for?”' },
          { ar: '«كم تقريباً الميزانية المتوفرة عندك؟»', en: '“Roughly what budget do you have?”' },
          { ar: '«متى حابب تبدأ؟»', en: '“When would you like to start?”' },
          {
            ar: '«إنت صاحب القرار ولا في شخص ثاني مسؤول عن القرار؟»',
            en: '“Are you the decision maker, or is someone else?”',
          },
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'والأهم إن المحادثة مش رح تكون مجرد أسئلة ثابتة — رح نتعلم كيف نخلي الـ AI يفهم إجابات العميل ويقرر شو السؤال المناسب اللي يسأله بعده. 🧠',
          en: 'And crucially the conversation is not a fixed script — you learn how to let the AI read the answers and decide what to ask next. 🧠',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'بعد ما يجمع المعلومات، رح نخلي النظام يحلل العميل ويحسبله Lead Score تلقائياً — مثلاً 85 / 100 — High Quality Lead 🔥 — بناءً على عوامل مثل:',
          en: 'Once it has what it needs, the system scores the lead by itself — say 85 / 100, a high quality lead 🔥 — weighing things like:',
        },
      },
      {
        kind: 'list',
        items: [
          { ar: '💰 Budget — الميزانية', en: '💰 Budget' },
          { ar: '🎯 Need / Interest — الحاجة والاهتمام', en: '🎯 Need and interest' },
          { ar: '👤 Decision Authority — صلاحية القرار', en: '👤 Decision authority' },
          { ar: '⏱️ Timeline — التوقيت', en: '⏱️ Timeline' },
        ],
      },
      {
        kind: 'text',
        text: {
          ar: 'وبالتالي فريق المبيعات ما بعود يتعامل مع كل العملاء بنفس الطريقة، وبقدر يعرف مباشرة مين العميل الجدي اللي لازم يتواصل معه أولاً.',
          en: 'So the sales team stops treating every enquiry the same way, and can see at once who is worth calling first.',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'بعدها رح نتعلم كيف نربط النظام مع CRM ونخزن معلومات العميل، المحادثة، اهتمامه والـ Lead Score بشكل أوتوماتيكي. وإذا اكتشف النظام Lead قوي، الـ n8n مباشرة ممكن يبعت لفريق المبيعات تنبيهاً على WhatsApp أو Email أو Notification.',
          en: 'Next you wire it into a CRM so the contact, the conversation, their interest and the score are all stored automatically. And when a strong lead comes through, n8n alerts the sales team on WhatsApp, by email or with a notification.',
        },
      },
      {
        kind: 'text',
        text: {
          ar: 'يعني من لحظة دخول العميل: Lead → AI Conversation → Qualification → Lead Score → CRM → Sales Notification — كل العملية بتصير بدون تدخل يدوي.',
          en: 'From the moment the lead arrives: lead → AI conversation → qualification → score → CRM → sales notification, with nothing done by hand.',
        },
      },
      {
        kind: 'note',
        text: {
          ar: 'والهدف من اللاب مش بس إنك تعرف تستخدم Nodes في n8n — رح تتعلم كيف تجمع n8n + AI Agents + WhatsApp + CRM وتبني Sales Automation System حقيقي من الصفر. وهاي النوعية من الأنظمة مش مجرد مشروع تدريبي: هي خدمة فعلية الشركات بتحتاجها، وممكن بعد الكورس تاخذ نفس الفكرة وتطورها وتقدمها للشركات كـ AI Automation Solution. 🚀',
          en: 'The point of the lab is not just knowing which nodes to use — it is putting n8n, AI agents, WhatsApp and a CRM together into a real sales automation system. This kind of system is not a training exercise: businesses genuinely need it, and after the course you can take the same idea further and offer it as an AI automation solution. 🚀',
        },
      },
    ],
  },
];
