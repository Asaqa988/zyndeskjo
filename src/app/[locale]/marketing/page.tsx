import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.marketing' });
  return pageMetadata({ locale, path: '/marketing', title: t('title'), description: t('description') });
}

const SERVICES = [
  { id: 'branding', icon: 'Palette' },
  { id: 'uiux', icon: 'PenTool' },
  { id: 'social', icon: 'MessageSquare' },
  { id: 'content', icon: 'PenTool' },
  { id: 'campaigns', icon: 'Megaphone' },
  { id: 'seo', icon: 'Search' },
  { id: 'leadgen', icon: 'Target' },
  { id: 'automation', icon: 'Workflow' },
];

export default async function MarketingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.marketing');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tm = await getTranslations('meta.marketing');

  return (
    <>
      <ServiceSchema name={tm('title')} description={tm('description')} locale={locale} path="/marketing" />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('marketing'), path: '/marketing' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('marketing') }]}
      />
      <FeatureGrid
        title={t('servicesTitle')}
        columns={4}
        items={SERVICES.map((s) => ({ icon: s.icon, title: t(`services.${s.id}.title`), desc: t(`services.${s.id}.desc`) }))}
      />
      <CtaBand
        title={tc('talkToUs')}
        primaryLabel={tc('startProject')}
        primaryHref="/contact"
        secondaryLabel={tc('bookConsultation')}
        secondaryHref="/consultation"
      />
    </>
  );
}
