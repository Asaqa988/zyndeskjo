import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { AiShowcase } from '@/components/sections/AiShowcase';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { BreadcrumbSchema, ServiceSchema, FaqSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.aiSolutions' });
  return pageMetadata({ locale, path: '/ai-solutions', title: t('title'), description: t('description') });
}

export default async function AiSolutionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.aiSolutions');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tm = await getTranslations('meta.aiSolutions');

  const useCases = ['support', 'internal', 'ops', 'sales'] as const;
  const ucIcons = { support: 'Headset', internal: 'Database', ops: 'Workflow', sales: 'TrendingUp' } as const;
  const faqKeys = ['q1', 'q2', 'q3'] as const;
  const faqItems = faqKeys.map((k) => ({ q: t(`faq.${k}.q`), a: t(`faq.${k}.a`) }));

  return (
    <>
      <ServiceSchema name={tm('title')} description={tm('description')} locale={locale} path="/ai-solutions" />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('aiSolutions'), path: '/ai-solutions' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('aiSolutions') }]}
      />
      <AiShowcase />
      <FeatureGrid
        title={t('useCasesTitle')}
        columns={4}
        items={useCases.map((u) => ({ icon: ucIcons[u], title: t(`useCases.${u}.title`), desc: t(`useCases.${u}.desc`) }))}
      />
      <FaqAccordion title={t('faqTitle')} items={faqItems} />
      <CtaBand
        title={tc('bookConsultation')}
        primaryLabel={tc('bookConsultation')}
        secondaryLabel={tc('startProject')}
        secondaryHref="/contact"
      />
    </>
  );
}
