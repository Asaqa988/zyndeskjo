import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { CvChecker } from '@/components/cv/CvChecker';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.cvCheck' });
  return pageMetadata({
    locale,
    path: '/cv-check',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * A free CV-to-job match check.
 *
 * It is here to be useful on its own — someone should be able to arrive from a
 * search, get a real answer, and leave without ever hearing about the course.
 * That is what makes it worth linking to, and links are what the course needs.
 *
 * It is also the strongest possible proof of what the course teaches: this is
 * one of the systems on /what-you-build, running.
 */
export default async function CvCheckPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.cvCheck');
  const tn = await getTranslations('nav');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: t('hero.title'), path: '/cv-check' },
        ]}
      />

      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: t('hero.title') }]}
      />

      <section className="pb-24">
        <div className="container-z max-w-4xl">
          <CvChecker />
        </div>
      </section>
    </>
  );
}
