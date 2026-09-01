import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { ClinicDemo } from '@/components/examples/ClinicDemo';
import { CLINIC } from '@/data/examples/clinic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.examplesClinic' });
  return pageMetadata({
    locale,
    path: '/examples/clinic-booking',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * The clinic booking demo.
 *
 * Three things in order: try it, then how it was built, then why the email
 * admits what it is. The last section is not an apology — it is the part a
 * clinic owner watching this needs to see before they trust it with their
 * patients.
 */
export default async function ClinicBookingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.examples.clinic');

  const steps = ['s1', 's2', 's3', 's4'] as const;

  return (
    <>
      <section className="pb-14 pt-28 sm:pt-32">
        <div className="container-z flex max-w-3xl flex-col gap-6">
          <Link
            href="/examples"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-medium transition hover:text-navy"
          >
            <Icon name={locale === 'ar' ? 'ArrowRight' : 'ArrowLeft'} size={15} />
            {t('badge')}
          </Link>

          <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">{t('title')}</h1>

          <p className="max-w-[64ch] text-lg leading-relaxed text-navy-medium">
            {t('lead', { doctor: CLINIC.doctor })}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-z max-w-3xl">
          <ClinicDemo />
          <p className="pt-4 text-xs leading-relaxed text-navy-soft">
            {t('source', { website: CLINIC.website, date: CLINIC.scrapedAt })}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-z flex max-w-3xl flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t('how.title')}</h2>

          {/* A real sequence — each step consumes what the one before produced —
              so the numbering carries information rather than decoration. */}
          <ol className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <li key={s} className="glass flex gap-4 rounded-glass p-5">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold tabular-nums text-white"
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="font-bold text-ink">{t(`how.${s}.title`)}</span>
                  <span className="text-[15px] leading-relaxed text-navy-medium">
                    {t(`how.${s}.body`)}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-z max-w-3xl">
          <div className="glass glass-strong flex flex-col gap-3 rounded-glass border-s-4 border-s-[#8a6100] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">{t('honesty.title')}</h2>
            <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
              {t('honesty.body', { doctor: CLINIC.doctor })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
