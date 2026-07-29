'use client';

import { useTranslations } from 'next-intl';
import { technologies } from '@/data/technologies';
import { Icon } from '@/components/ui/Icon';

const CAPS = ['Zap', 'GraduationCap', 'Code2', 'ShieldCheck', 'TrendingUp', 'Workflow'];

/** Capabilities marquee + technologies logos row. */
export function TrustStrip() {
  const t = useTranslations();
  const caps = t.raw('trust.items') as string[];
  const row = [...caps, ...caps];
  const techRow = [...technologies, ...technologies];

  return (
    <section className="py-10 md:py-14" aria-label={t('technologies.title')}>
      <div className="glass mx-auto max-w-[1200px] overflow-hidden rounded-glass py-5">
        <div className="marquee-track flex w-max animate-marquee items-center gap-8 px-6">
          {row.map((c, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2.5 text-navy-deep">
              <Icon name={CAPS[i % CAPS.length]} size={18} className="text-cyan" />
              <span className="text-sm font-semibold whitespace-nowrap">{c}</span>
              <span className="mx-2 h-1 w-1 rounded-full bg-navy-soft" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      <div className="container-z mt-8 text-center">
        <p className="eyebrow">{t('technologies.title')}</p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-dim)]">
          {t('technologies.subtitle')}
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee items-center gap-3">
            {techRow.map((tech, i) => (
              <span key={i} className="chip shrink-0 !py-2 !px-4 text-navy-deep">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
