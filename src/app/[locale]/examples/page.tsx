import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.examples' });
  return pageMetadata({
    locale,
    path: '/examples',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * The examples index.
 *
 * One entry today. It is a list rather than a single page because the whole
 * point is that more will be added — each one an automation a visitor can run,
 * not a description of one.
 */
export default async function ExamplesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.examples.index');

  const examples = [
    { href: '/examples/live', key: 'botCard', icon: 'Send' },
    { href: '/examples/clinic-booking', key: 'clinicCard', icon: 'CalendarDays' },
  ] as const;

  return (
    <section className="pb-24 pt-28 sm:pt-32">
      <div className="container-z flex max-w-4xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">{t('title')}</h1>
          <p className="max-w-[62ch] text-lg leading-relaxed text-navy-medium">{t('subtitle')}</p>
        </div>

        <ul className="grid gap-4">
          {examples.map((ex) => (
            <li key={ex.href}>
              <Link
                href={ex.href}
                className="glass glass-strong group flex flex-col gap-3.5 rounded-glass p-6 transition hover:shadow-glass-lg sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-navy-ice text-navy">
                    <Icon name={ex.icon} size={19} />
                  </span>
                  <span className="rounded-pill border border-navy-ice bg-white/60 px-3 py-1 text-[12px] font-medium text-navy-medium">
                    {t(`${ex.key}.tag`)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-ink">{t(`${ex.key}.title`)}</h2>

                <p className="max-w-[64ch] text-[15px] leading-relaxed text-navy-medium">
                  {t(`${ex.key}.body`)}
                </p>

                <span className="inline-flex items-center gap-2 pt-1 text-sm font-bold text-navy">
                  {t('tryIt')}
                  <Icon name={locale === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
