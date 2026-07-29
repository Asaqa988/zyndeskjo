import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  return pageMetadata({ locale, path: '/projects', title: t('title'), description: t('description') });
}

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('projects'), path: '/projects' }]} />
      <PageHero
        badge={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('projects') }]}
      />
      <ProjectsGrid showHeading={false} />
      <Testimonials />
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
