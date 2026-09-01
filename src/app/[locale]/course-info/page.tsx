import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';
import { CourseInfoForm, Countdown } from '@/components/course/CourseInfoForm';
import { LectureBanner } from '@/components/course/LectureBanner';
import { course } from '@/data/course/course';
import { COURSE } from '@/data/course-facts';
import { pick } from '@/data/course/types';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.courseInfo' });
  return pageMetadata({
    locale,
    path: '/course-info',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * The page that turns interest into an email address.
 *
 * Everything on it serves one action, so it does not open with a badge and a
 * breadcrumb — it opens with the date, the price and the form. The detail
 * below is for the people who need it before they will type anything; the
 * form is repeated at the end so they do not have to scroll back.
 *
 * No navigation entry: this is where ads and posts point, and the header is
 * already at its limit.
 */
export default async function CourseInfoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.courseInfo');
  const tn = await getTranslations('nav');

  const hours = Math.round(course.totalMinutes / 60);

  const facts = [
    { icon: 'CalendarDays', value: t('facts.startValue'), label: t('facts.start') },
    { icon: 'Clock', value: `${hours}`, label: t('facts.hours') },
    { icon: 'Layers', value: `${course.modules.length}`, label: t('facts.modules') },
    { icon: 'FlaskConical', value: `${course.labs.length}`, label: t('facts.labs') },
    { icon: 'Users', value: `${COURSE.seats}`, label: t('facts.seats') },
    { icon: 'Wallet', value: `${COURSE.feeJod}`, label: t('facts.fee') },
  ];

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: t('hero.title'), path: '/course-info' },
        ]}
      />

      <section className="pb-16 pt-28 sm:pt-32">
        <div className="container-z flex max-w-4xl flex-col gap-8">
          <LectureBanner />

          <div className="flex flex-col items-start gap-5">
            <Countdown />

            <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
              {t('hero.title')}
            </h1>

            <p className="max-w-[60ch] text-lg leading-relaxed text-navy-medium">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* The numbers first: they answer most of what someone wants to know
              before they will hand over an address. */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.label} className="glass flex items-center gap-3 rounded-glass p-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-navy-ice text-navy">
                  <Icon name={f.icon} size={19} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xl font-bold leading-tight tabular-nums text-ink">
                    {f.value}
                  </span>
                  <span className="text-xs leading-snug text-navy-medium">{f.label}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* For the visitor who has already decided. Sending them through an
              email capture first would be a step that exists for us, not them. */}
          <div className="glass glass-strong flex flex-col gap-4 rounded-glass border-s-4 border-s-cyan p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="text-[15px] font-semibold leading-relaxed text-ink">
              {t('registerCta.title')}
            </p>
            <Link
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-medium"
            >
              {t('registerCta.button')}
              <Icon name={locale === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={16} />
            </Link>
          </div>

          <CourseInfoForm id="top" />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-z flex max-w-4xl flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t('learn.title')}</h2>
          <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
            {t('learn.lead', { lessons: course.modules.reduce((n, m) => n + m.lessons.length, 0) })}
          </p>

          <ol className="grid gap-3 sm:grid-cols-2">
            {course.modules.map((m, i) => (
              <li key={m.id} className="glass flex gap-3.5 rounded-glass p-5">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold tabular-nums text-white"
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-bold leading-snug text-ink">
                    {pick(m.title, locale)}
                  </span>
                  <span className="text-[13px] leading-relaxed text-navy-medium">
                    {pick(m.summary, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-z flex max-w-4xl flex-col gap-6">
          <div className="glass glass-strong flex flex-col gap-4 rounded-glass border-s-4 border-s-cyan p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">{t('included.title')}</h2>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {['live', 'labs', 'projects', 'recordings', 'support', 'certificate'].map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-navy-medium"
                >
                  <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-cyan" />
                  {t(`included.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-ink">{t('closing.title')}</h2>
            <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
              {t('closing.body')}
            </p>
          </div>

          <CourseInfoForm id="bottom" />
        </div>
      </section>
    </>
  );
}
