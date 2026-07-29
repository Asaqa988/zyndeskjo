import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { QaLab } from '@/components/sections/QaLab';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CtaBand } from '@/components/sections/CtaBand';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.qaTesting' });
  return pageMetadata({ locale, path: '/qa-testing', title: t('title'), description: t('description') });
}

export default async function QaTestingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.qaTesting');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tq = await getTranslations('qa');
  const tm = await getTranslations('meta.qaTesting');

  return (
    <>
      <ServiceSchema name={tm('title')} description={tm('description')} locale={locale} path="/qa-testing" />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('qa'), path: '/qa-testing' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('qa') }]}
      />
      <QaLab />
      <ProcessTimeline />
      <CtaBand
        title={tq('cta')}
        primaryLabel={tc('startProject')}
        primaryHref="/contact"
        secondaryLabel={tc('bookConsultation')}
        secondaryHref="/consultation"
      />
    </>
  );
}
