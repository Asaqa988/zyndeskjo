import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { MultiStepForm } from '@/components/forms/MultiStepForm';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.consultation' });
  return pageMetadata({ locale, path: '/consultation', title: t('title'), description: t('description') });
}

const EXPECT = [
  { id: 'call', icon: 'Phone' },
  { id: 'recommendation', icon: 'Target' },
  { id: 'nextSteps', icon: 'Rocket' },
];

export default async function ConsultationPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.consultation');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tc('requestConsultation'), path: '/consultation' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tc('requestConsultation') }]}
      />
      <section className="pb-20">
        <div className="container-z grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-ink">{t('expectTitle')}</h2>
            {EXPECT.map((e, i) => (
              <GlassCard key={e.id} className="!p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-medium to-navy-deep text-white">
                    <Icon name={e.icon} size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">
                      <span className="text-cyan me-1.5">{String(i + 1).padStart(2, '0')}</span>
                      {t(`expect.${e.id}.title`)}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-dim)]">{t(`expect.${e.id}.desc`)}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <div>
            <MultiStepForm />
          </div>
        </div>
      </section>
    </>
  );
}
