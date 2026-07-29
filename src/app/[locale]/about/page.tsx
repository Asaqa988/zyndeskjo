import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Metrics } from '@/components/sections/Metrics';
import { WhyZyndesk } from '@/components/sections/WhyZyndesk';
import { CtaBand } from '@/components/sections/CtaBand';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('description') });
}

const VALUES = [
  { id: 'outcomes', icon: 'Target' },
  { id: 'quality', icon: 'ShieldCheck' },
  { id: 'partnership', icon: 'Users' },
  { id: 'clarity', icon: 'Sparkles' },
];

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('about'), path: '/about' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('about') }]}
      />

      <section className="section-pad !pt-4">
        <div className="container-z grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <SectionHeading align="start" title={t('storyTitle')} />
            <p className="mt-5 text-base leading-relaxed text-[var(--text-dim)]">{t('story')}</p>
          </div>
          <GlassCard className="flex flex-col gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-navy-medium to-navy-deep text-white">
              <Icon name="MapPin" size={24} />
            </span>
            <h3 className="text-lg font-bold text-ink">{t('locationTitle')}</h3>
            <p className="text-sm text-[var(--text-dim)]">{t('locationBody')}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all"
            >
              {siteConfig.contact.addressLine} <Icon name="ArrowRight" size={15} className="rtl:rotate-180" />
            </a>
          </GlassCard>
        </div>
      </section>

      <FeatureGrid title={t('valuesTitle')} columns={4} items={VALUES.map((v) => ({ icon: v.icon, title: t(`values.${v.id}.title`), desc: t(`values.${v.id}.desc`) }))} />
      <Metrics />
      <WhyZyndesk />
      <CtaBand
        title={tc('talkToUs')}
        primaryLabel={tc('bookConsultation')}
        secondaryLabel={tc('startProject')}
        secondaryHref="/contact"
      />
    </>
  );
}
