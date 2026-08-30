import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { trainer } from '@/data/trainer';
import { pick } from '@/data/course/types';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.trainer' });
  return pageMetadata({
    locale,
    path: '/trainer',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * Who is teaching the course.
 *
 * Ordered by what a prospective student actually weighs: the face and the
 * summary, then the numbers, then teaching — because "has he taught before?"
 * is the question behind the question — then the work that backs it up.
 */
export default async function TrainerPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.trainer');
  const tn = await getTranslations('nav');

  /**
   * A missing portrait shows initials rather than a broken image.
   *
   * The photo is dropped in by hand, so the file can legitimately not be there
   * yet — and a broken image on the page that exists to build trust is worse
   * than no image at all.
   */
  const hasPhoto = existsSync(join(process.cwd(), 'public', trainer.photo));
  const initials = pick(trainer.name, locale)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: tn('trainer'), path: '/trainer' },
        ]}
      />

      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('trainer') }]}
      />

      <section className="pb-24">
        <div className="container-z flex max-w-4xl flex-col gap-14">
          {/* Portrait and the short version. */}
          <div className="grid gap-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start">
            <div className="glass overflow-hidden rounded-glass p-2">
              {hasPhoto ? (
                <Image
                  src={trainer.photo}
                  alt={pick(trainer.name, locale)}
                  width={720}
                  height={960}
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="h-auto w-full rounded-[14px] object-cover"
                  priority
                />
              ) : (
                <div
                  aria-hidden
                  className="grid aspect-[3/4] w-full place-items-center rounded-[14px] bg-navy-ice text-4xl font-bold text-navy-soft"
                >
                  {initials}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                {pick(trainer.name, locale)}
              </h2>
              <p className="text-sm font-semibold leading-relaxed text-navy-medium">
                {pick(trainer.headline, locale)}
              </p>
              <p className="inline-flex items-center gap-1.5 text-sm text-navy-soft">
                <Icon name="MapPin" size={15} />
                {pick(trainer.location, locale)}
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-navy-medium">
                {pick(trainer.intro, locale)}
              </p>

              <a
                href={trainer.cv}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-medium"
              >
                <Icon name="FileText" size={16} />
                {t('cv')}
              </a>
            </div>
          </div>

          {/* The numbers, before anyone reads a paragraph. */}
          <ul className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {trainer.facts.map((fact) => (
              <li key={fact.value} className="glass flex flex-col gap-1 rounded-glass p-5">
                <span className="text-3xl font-bold tabular-nums text-ink">{fact.value}</span>
                <span className="text-[13px] leading-snug text-navy-medium">
                  {pick(fact.label, locale)}
                </span>
              </li>
            ))}
          </ul>

          {/* Teaching first — it is the question behind the question. */}
          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-ink">{pick(trainer.teaching.title, locale)}</h2>
            <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
              {pick(trainer.teaching.lead, locale)}
            </p>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {trainer.teaching.items.map((item) => (
                <li key={item.org.en} className="glass flex flex-col gap-1 rounded-glass p-5">
                  <span className="text-sm font-bold text-ink">{pick(item.org, locale)}</span>
                  <span className="text-[14px] text-navy-medium">{pick(item.role, locale)}</span>
                  <span className="text-xs tabular-nums text-navy-soft">
                    {pick(item.period, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-ink">{pick(trainer.experience.title, locale)}</h2>

            {/* The spine sits outside the list: <ol> may only contain <li>. */}
            <div className="relative">
              <span
                aria-hidden
                className="absolute bottom-2 start-[5px] top-2 w-px bg-gradient-to-b from-navy/35 to-cyan/35"
              />
              <ol className="flex flex-col gap-7 ps-7">
                {trainer.experience.items.map((job) => (
                  <li key={`${job.org.en}-${job.period.en}`} className="relative">
                    <span
                      aria-hidden
                      className="absolute -start-7 top-1.5 h-[11px] w-[11px] rounded-full bg-navy ring-4 ring-white/70"
                    />
                    <p className="text-base font-bold text-ink">{pick(job.role, locale)}</p>
                    <p className="text-sm text-navy-medium">{pick(job.org, locale)}</p>
                    <p className="mt-0.5 text-xs tabular-nums text-navy-soft">
                      {pick(job.period, locale)}
                    </p>
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                      {job.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] leading-relaxed text-navy-medium"
                        >
                          <Icon name="Check" size={15} className="mt-0.5 shrink-0 text-cyan" />
                          <span>{pick(point, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-ink">{t('certifications')}</h2>
            <ul className="flex flex-wrap gap-2">
              {trainer.certifications.map((cert) => (
                <li
                  key={cert}
                  className="glass rounded-pill px-3.5 py-1.5 text-[13px] font-medium text-navy"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-ink">
              {pick(trainer.education.title, locale)}
            </h2>
            <p className="text-[15px] leading-relaxed text-navy-medium">
              {pick(trainer.education.text, locale)}
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
