import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { MultiStepForm } from '@/components/forms/MultiStepForm';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { TrainingTabs } from '@/components/sections/TrainingTabs';
import { BreadcrumbSchema, CourseSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.corporateTraining' });
  return pageMetadata({ locale, path: '/corporate-training', title: t('title'), description: t('description') });
}

const WHY = [
  { id: 'applied', icon: 'Target' },
  { id: 'handsOn', icon: 'Code2' },
  { id: 'bilingual', icon: 'Globe' },
  { id: 'measurable', icon: 'BarChart3' },
];

export default async function CorporateTrainingPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.corporateTraining');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tm = await getTranslations('meta.corporateTraining');

  return (
    <>
      <CourseSchema name={tm('title')} description={tm('description')} locale={locale} />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tc('requestTraining'), path: '/corporate-training' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tc('requestTraining') }]}
      />
      <FeatureGrid title={t('whyTitle')} columns={4} items={WHY.map((w) => ({ icon: w.icon, title: t(`why.${w.id}.title`), desc: t(`why.${w.id}.desc`) }))} />
      <section className="pb-8">
        <div className="container-z max-w-3xl">
          <h2 className="mb-4 text-center text-lg font-bold text-ink">{t('formTitle')}</h2>
          <MultiStepForm defaultNeed="training" />
        </div>
      </section>
      <TrainingTabs />
    </>
  );
}
