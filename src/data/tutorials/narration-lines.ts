/**
 * What the tutor SAYS, as opposed to what the bubble shows.
 *
 * The two differ on purpose. On screen, a step is a short title and one line of
 * text you can take in at a glance. Spoken aloud, the same content wants to be
 * a whole sentence in natural Jordanian — read the two side by side and the
 * written version sounds clipped, the spoken version looks long-winded.
 *
 * These lines are the author's own wording, kept verbatim. The diacritised
 * versions the TTS actually receives are generated from this file into
 * narration.ar.json — edit here, not there.
 */

export const NARRATION_AR: Record<string, string> = {
  intro:
    'أهلًا — أنا مساعدتك الذكية. قبل ما تبدأ، خلّيني أفرجيك كيف بشتغل هالكورس. الموضوع بياخد تقريبًا دقيقة.',

  dashboard: 'هاي لوحتك. هون بتلاقيها كل مرة. وكل اللي بتحتاجه عشان تكمّل، موجود هون.',

  continue: 'كمّل من وين وقّفت. بكبسة زر، بتوصل لأول إشي ما خلّصته.',

  'progress-summary':
    'هون بتعرف وين واصل، شو الدروس اللي خلّصتها، قديش استثمرت من وقتك، وقدّيش أنجزت من الكورس.',

  'course-overview':
    'المنهاج كامل. ثماني وحدات، مرتّبين بحيث كل وحدة بتبني على اللي قبلها. وما في إشي هون حشو.',

  modules: 'الوحدات. كل وحدة إلها تقدّمها، واللي بعدها بتنفتح لما تخلّص الوحدة اللي قبلها.',

  lessons: 'جوا كل وحدة، في فيديو وقراءة ومختبر. والمختبر هو اللي بتثبت فيه المعلومة عنجد.',

  labs: 'المختبرات. ثمانية تجارب حقيقية — من النوع اللي بتقدر تعرضه على عميل بنفس الأسبوع.',

  playground:
    'مختبر الذكاء. شوف الذكاء كيف بكتب، وبشغّل، وبصلّح اختبار حقيقي، حتى لو فشل فيه من أول مرة.',

  projects: 'المشاريع. مشروعين عمليين، بيحوّلوا كل اللي تعلّمته لإشي متكامل.',

  progress: 'تقدّمك. وحدة وحدة، عشان دايمًا تعرف شو ضايل.',

  journey:
    'الرحلة كاملة. من مشكلة بتحلّها بإيدك، لأتمتة شغّالة بالإنتاج، وبتشتغل لحالها من دون ما تتدخل.',

  capstone:
    'وهاي خط النهاية. المشروع الختامي: بتأتمت عمليتك إنت، باستخدام كل اللي تعلّمته هون، وبتنشرها على سيرفرك.',

  outro:
    'هيك صرت جاهز. هاي المنصّة كاملة قدامك. يلا نبدأ أول درس. وإذا احتجت مساعدة، تواصل مع المهندس عبدالرحيم.',
};
