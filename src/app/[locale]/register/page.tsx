import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { RegisterForm } from '@/components/course/RegisterForm';
import { Countdown } from '@/components/course/CourseInfoForm';
import { LectureBanner } from '@/components/course/LectureBanner';
import { course } from '@/data/course/course';
import { COURSE } from '@/data/course-facts';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.register' });
  return pageMetadata({
    locale,
    path: '/register',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * Claim a seat.
 *
 * Said out loud during a lecture and pasted into a WhatsApp group, so the path
 * is short and the page is one screen of decision: what you are signing up
 * for, the form, and nothing that competes with it. No navigation detours, no
 * second call to action — the only other link goes to the full syllabus, for
 * the person who still needs it.
 *
 * It is honest about what submitting does. The seat is held, not paid for, and
 * a human follows up; saying that here costs a little conversion and saves
 * every argument afterwards.
 */
export default async function RegisterPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.register');

  const hours = Math.round(course.totalMinutes / 60);
  const lessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  const facts = [
    { icon: 'CalendarDays', value: t('facts.startValue'), label: t('facts.start') },
    { icon: 'Clock', value: t('facts.timeValue'), label: t('facts.time') },
    { icon: 'Hourglass', value: `${hours}`, label: t('facts.hours') },
    { icon: 'Wallet', value: `${COURSE.feeJod}`, label: t('facts.fee') },
  ];

  return (
    <section className="pb-24 pt-28 sm:pt-32">
      <div className="container-z flex max-w-3xl flex-col gap-8">
        <LectureBanner />

        <div className="flex flex-col items-start gap-5">
          <Countdown />

          <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
            {t('hero.title')}
          </h1>

          <p className="max-w-[58ch] text-lg leading-relaxed text-navy-medium">
            {t('hero.subtitle')}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {facts.map((f) => (
            <li key={f.label} className="glass flex flex-col gap-1 rounded-glass p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-navy-ice text-navy">
                <Icon name={f.icon} size={17} />
              </span>
              <span className="pt-1 text-lg font-bold leading-tight text-ink">{f.value}</span>
              <span className="text-xs leading-snug text-navy-medium">{f.label}</span>
            </li>
          ))}
        </ul>

        <RegisterForm />

        <div className="flex flex-col gap-3">
          <p className="text-[15px] leading-relaxed text-navy-medium">
            {t('included', { hours, lessons, modules: course.modules.length, labs: course.labs.length })}
          </p>
          <Link
            href="/course-info"
            className="inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-navy underline-offset-4 hover:underline"
          >
            {t('syllabus')}
            <Icon name={locale === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
