import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { LegalContent } from '@/components/sections/LegalContent';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });
  return pageMetadata({ locale, path: '/privacy', title: t('title'), description: t('description') });
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.legal.privacy');
  const tn = await getTranslations('nav');
  const tf = await getTranslations('footer.links');

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tf('privacy'), path: '/privacy' }]} />
      <PageHero title={t('title')} breadcrumb={[{ label: tn('home'), href: '/' }, { label: tf('privacy') }]} />
      <LegalContent doc="privacy" />
    </>
  );
}
