import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { PitchSection } from '@/components/pitch/PitchSection';
import { sectionsFor } from '@/data/course-pitch';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.whyAiAutomation' });
  return pageMetadata({
    locale,
    path: '/why-ai-automation',
    title: t('title'),
    description: t('description'),
  });
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.whyAiAutomation');
  const tn = await getTranslations('nav');
  const sections = sectionsFor('why');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: tn('whyAiAutomation'), path: '/why-ai-automation' },
        ]}
      />

      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('whyAiAutomation') }]}
      />

      <section className="pb-24">
        <div className="container-z flex max-w-4xl flex-col gap-14">
          {sections.map((section) => (
            <PitchSection key={section.id} section={section} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
