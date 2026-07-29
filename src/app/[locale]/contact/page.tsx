import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { MultiStepForm } from '@/components/forms/MultiStepForm';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return pageMetadata({ locale, path: '/contact', title: t('title'), description: t('description') });
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.contact');
  const tn = await getTranslations('nav');
  const c = siteConfig.contact;

  const rows = [
    { icon: 'Phone', label: t('phone'), value: c.phoneDisplay, href: `tel:${c.phoneHref}`, tel: true },
    { icon: 'MessageSquare', label: t('whatsapp'), value: c.whatsappDisplay, href: `https://wa.me/${c.whatsappHref}`, tel: true },
    { icon: 'Mail', label: t('email'), value: c.email, href: `mailto:${c.email}` },
    { icon: 'MapPin', label: t('address'), value: c.addressLine, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}` },
  ];

  return (
    <>
      <BreadcrumbSchema locale={locale} items={[{ name: tn('home'), path: '' }, { name: tn('contact'), path: '/contact' }]} />
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('contact') }]}
      />
      <section className="pb-20">
        <div className="container-z grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-ink">{t('infoTitle')}</h2>
            {rows.map((r) => (
              <GlassCard key={r.label} className="!p-4">
                <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/60 text-navy">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[var(--text-dim)]">{r.label}</span>
                    <span className={`block truncate text-sm font-semibold text-ink ${r.tel ? 'tel' : ''}`}>{r.value}</span>
                  </span>
                </a>
              </GlassCard>
            ))}
            <p className="mt-1 flex items-center gap-2 text-xs text-[var(--text-dim)]">
              <Icon name="CheckCircle2" size={14} className="text-cyan" /> {t('hours')}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-ink">{t('formTitle')}</h2>
            <MultiStepForm />
          </div>
        </div>
      </section>
    </>
  );
}
