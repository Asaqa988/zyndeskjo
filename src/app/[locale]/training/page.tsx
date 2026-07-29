import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { TrainingTabs } from '@/components/sections/TrainingTabs';
import { CtaBand } from '@/components/sections/CtaBand';
import { BreadcrumbSchema, CourseSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.training' });
  return pageMetadata({ locale, path: '/training', title: t('title'), description: t('description') });
}

export default async function TrainingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('training');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tm = await getTranslations('meta.training');

  return (
    <>
      <CourseSchema name={tm('title')} description={tm('description')} locale={locale} />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('training'), path: '/training' }]} />
      <PageHero
        badge={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('training') }]}
      />
      <TrainingTabs showHeading={false} />
      <CtaBand
        title={t('requestBtn')}
        primaryLabel={tc('requestTraining')}
        primaryHref="/corporate-training"
        secondaryLabel={tc('bookConsultation')}
        secondaryHref="/consultation"
      />
    </>
  );
}
