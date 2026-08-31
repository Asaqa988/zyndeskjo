import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { TestimonialGrid } from '@/components/testimonials/TestimonialGrid';
import { testimonials } from '@/data/testimonials';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.feedback' });
  return pageMetadata({
    locale,
    path: '/trainer/feedback',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * Every piece of student feedback, in full.
 *
 * Not in the navigation: it is reached from the trainer page, where someone
 * has already asked "can he teach?" — this is the answer at length, for the
 * people who want it.
 */
export default async function FeedbackPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.feedback');
  const tn = await getTranslations('nav');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: tn('trainer'), path: '/trainer' },
          { name: t('hero.title'), path: '/trainer/feedback' },
        ]}
      />

      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle', { count: testimonials.length })}
        breadcrumb={[
          { label: tn('home'), href: '/' },
          { label: tn('trainer'), href: '/trainer' },
          { label: t('hero.title') },
        ]}
      />

      <section className="pb-24">
        <div className="container-z flex flex-col gap-6">
          <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
            {t('note')}
          </p>
          <TestimonialGrid label={t('imageAlt')} />
        </div>
      </section>
    </>
  );
}
