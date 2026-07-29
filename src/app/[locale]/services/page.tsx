import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CtaBand } from '@/components/sections/CtaBand';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return pageMetadata({ locale, path: '/services', title: t('title'), description: t('description') });
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.services');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: tn('services'), path: '/services' },
        ]}
      />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('services') }]}
      />
      <WhatWeDo />
      <ProcessTimeline />
      <CtaBand
        title={t('ctaTitle')}
        subtitle={t('ctaSubtitle')}
        primaryLabel={tc('requestConsultation')}
      />
    </>
  );
}
