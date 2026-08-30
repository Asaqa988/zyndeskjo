import type { Tutorial } from '@/components/tutorial/types';

/**
 * The first-run tour.
 *
 * Authored data, not model output: the order, the wording and the targets are
 * all fixed here, which is what makes the tour reliable and free to run. The AI
 * layer sits beside this to answer questions — it never edits or drives it.
 *
 * Durations are how long each step holds when there is no narration to wait
 * for. Once per-step audio lands, the engine advances on the audio's `ended`
 * event instead and these become the muted-playback fallback.
 */
export const onboardingTutorial: Tutorial = {
  id: 'onboarding',
  version: 1,

  // Phrased as a question because it is now asked in a dialog the visitor has
  // to answer. The spoken line in narration-lines.ts is unchanged and still
  // matches: she says the same thing while this is on screen.
  intro: {
    title: { en: 'Shall I show you around?', ar: 'أشرحلك عن المنصة؟' },
    message: {
      en: "I'm your AI tutor. Let me show you how this course works — it takes about a minute.",
      ar: 'أنا مساعدتك الذكية. خلّيني أفرجيك كيف بشتغل هالكورس — بياخد دقيقة تقريباً.',
    },
    cta: { en: 'OK, start', ar: 'أوكي، ابدأ' },
  },

  outro: {
    title: { en: "You're ready", ar: 'صرت جاهز' },
    message: {
      en: "That's the whole platform. Let's start your first lesson.",
      ar: 'هاي المنصة كاملة. يلا نبدأ أول درس.',
    },
    cta: { en: 'Start learning', ar: 'ابدأ التعلّم' },
    href: '/learn/modules',
  },

  steps: [
    {
      id: 'dashboard',
      target: 'student-dashboard',
      route: '/learn',
      duration: 6500,
      title: { en: 'Your dashboard', ar: 'لوحتك' },
      message: {
        en: 'This is where you land every time. Everything you need to pick up again is here.',
        ar: 'هون بتوصل كل مرة. كل اللي بتحتاجه عشان تكمّل موجود هون.',
      },
    },
    {
      id: 'continue',
      target: 'continue-learning',
      route: '/learn',
      duration: 6000,
      title: { en: 'Pick up where you stopped', ar: 'كمّل من وين وقفت' },
      message: {
        en: 'One button, always pointing at the next thing you have not finished.',
        ar: 'زر واحد، دائماً بيشير على أول إشي ما خلّصته.',
      },
    },
    {
      id: 'progress-summary',
      target: 'progress-summary',
      route: '/learn',
      duration: 6000,
      title: { en: 'Where you stand', ar: 'وين واصل' },
      message: {
        en: 'Lessons done, time invested, and how much of the course is behind you.',
        ar: 'الدروس المكتملة، الوقت اللي استثمرته، وقدّيش خلّصت من الكورس.',
      },
    },
    {
      id: 'course-overview',
      target: 'course-overview',
      route: '/learn/course',
      duration: 7000,
      title: { en: 'The whole syllabus', ar: 'المنهاج كامل' },
      message: {
        en: 'Eight modules, in the order they depend on each other. Nothing here is optional filler.',
        ar: 'ثماني وحدات، بالترتيب اللي بيعتمد فيه بعضها على بعض. ما في إشي هون حشو.',
      },
    },
    {
      id: 'modules',
      target: 'modules-grid',
      route: '/learn/modules',
      duration: 6500,
      title: { en: 'Modules', ar: 'الوحدات' },
      message: {
        en: 'Each module carries its own progress. Later ones unlock as you finish what they build on.',
        ar: 'كل وحدة عندها تقدّمها. اللي بعدها بتنفتح لما تخلّص اللي مبنية عليه.',
      },
    },
    {
      id: 'lessons',
      target: 'lesson-list',
      route: '/learn/modules/apis-and-webhooks',
      duration: 7000,
      title: { en: 'Inside a module', ar: 'جوّا الوحدة' },
      message: {
        en: 'Video, reading and a lab. The lab is where it actually sticks.',
        ar: 'فيديو وقراءة ومختبر. المختبر هو اللي بتثبت فيه المعلومة فعلاً.',
      },
    },
    {
      id: 'labs',
      target: 'labs',
      route: '/learn/labs',
      duration: 7000,
      title: { en: 'The labs', ar: 'المختبرات' },
      message: {
        en: 'Eight pieces of real work — the kind you could put in front of a client the same week.',
        ar: 'ثمانية أشغال حقيقية — من النوع اللي بتقدر تحطه قدام عميل بنفس الأسبوع.',
      },
    },
    {
      id: 'playground',
      target: 'ai-playground',
      route: '/learn/playground',
      duration: 8000,
      title: { en: 'The AI playground', ar: 'مختبر الذكاء' },
      message: {
        en: 'Watch AI write, run and fix a real test. Including the part where it fails first.',
        ar: 'شوف الذكاء يكتب ويشغّل ويصلّح اختباراً حقيقياً. بما فيها الجزء اللي بيفشل فيه أول مرة.',
      },
    },
    {
      id: 'projects',
      target: 'projects',
      route: '/learn/projects',
      duration: 6500,
      title: { en: 'Projects', ar: 'المشاريع' },
      message: {
        en: 'Two guided builds that turn the lessons into something whole.',
        ar: 'مشروعان موجّهان بيحوّلوا الدروس لإشي متكامل.',
      },
    },
    {
      id: 'progress',
      target: 'progress',
      route: '/learn/progress',
      duration: 6000,
      title: { en: 'Your progress', ar: 'تقدّمك' },
      message: {
        en: 'Module by module, so you always know what is left.',
        ar: 'وحدة وحدة، عشان دائماً تعرف شو باقي.',
      },
    },
    {
      id: 'journey',
      target: 'journey-flow',
      route: '/learn/path',
      duration: 9000,
      title: { en: 'The full journey', ar: 'الرحلة كاملة' },
      message: {
        en: 'From a problem someone solves by hand, to an automation running in production without you.',
        ar: 'من مشكلة يحلّها أحدهم بيده، إلى أتمتة شغّالة بالإنتاج بدونك.',
      },
    },
    {
      id: 'capstone',
      target: 'capstone',
      route: '/learn/projects',
      duration: 7500,
      title: { en: 'And this is the finish line', ar: 'وهاي خط النهاية' },
      message: {
        en: 'The capstone: your own process, automated with everything here, deployed to your own server.',
        ar: 'المشروع الختامي: عمليتك أنت، مؤتمتة بكل اللي هون، ومنشورة على سيرفرك.',
      },
    },
  ],
};
