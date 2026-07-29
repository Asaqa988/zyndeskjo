import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { technologies } from '@/data/technologies';
import { PageHero } from '@/components/layout/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.development' });
  return pageMetadata({ locale, path: '/development', title: t('title'), description: t('description') });
}

const CAP_ICONS: Record<string, string> = {
  websites: 'Globe',
  platforms: 'LayoutDashboard',
  mobile: 'Smartphone',
  systems: 'Building2',
  dashboards: 'BarChart3',
  api: 'Plug',
  saas: 'Boxes',
};

export default async function DevelopmentPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.development');
  const tp = await getTranslations('services.pillars.software');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const tm = await getTranslations('meta.development');
  const bullets = ['websites', 'platforms', 'mobile', 'systems', 'dashboards', 'api', 'saas'];

  return (
    <>
      <ServiceSchema name={tm('title')} description={tm('description')} locale={locale} path="/development" />
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('development'), path: '/development' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('development') }]}
      />
      <FeatureGrid
        title={t('capabilitiesTitle')}
        items={bullets.map((b) => ({ icon: CAP_ICONS[b], title: tp(`bullets.${b}`) }))}
      />
      <section className="pb-4">
        <div className="container-z">
          <SectionHeading title={t('stackTitle')} />
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {technologies
              .filter((x) => ['dev', 'cloud', 'ai'].includes(x.group))
              .map((tech) => (
                <span key={tech.name} className="chip !py-2 !px-4 text-navy-deep">
                  {tech.name}
                </span>
              ))}
          </div>
        </div>
      </section>
      <ProcessTimeline />
      <CtaBand
        title={tc('startProject')}
        primaryLabel={tc('startProject')}
        primaryHref="/contact"
        secondaryLabel={tc('bookConsultation')}
        secondaryHref="/consultation"
      />
    </>
  );
}
