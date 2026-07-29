'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { caseStudies, type CaseStudy } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';

export function ProjectsGrid({
  featuredOnly = false,
  showHeading = true,
}: {
  featuredOnly?: boolean;
  showHeading?: boolean;
}) {
  const t = useTranslations('projects');
  const items = featuredOnly ? caseStudies.filter((c) => c.featured) : caseStudies;

  return (
    <section className="section-pad">
      <div className="container-z">
        {showHeading && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <ProjectCard c={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ c }: { c: CaseStudy }) {
  const t = useTranslations('projects');
  return (
    <GlassCard tilt className="group flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-navy-medium to-navy-deep text-white">
          <Icon name={c.icon} size={22} />
        </span>
        <span className="chip !py-1 !px-2.5 text-[0.65rem] text-navy-medium">
          {t(`categories.${c.category}`)}
        </span>
      </div>

      <p className="mt-4 eyebrow !text-[0.6rem]">
        {t('industryLabel')}: {t(`industries.${c.industry}`)}
      </p>
      <h3 className="mt-1 text-lg font-bold text-ink">{t(`items.${c.slug}.title`)}</h3>
      <p className="mt-2 flex-1 text-sm text-[var(--text-dim)]">{t(`items.${c.slug}.challenge`)}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--glass-border-soft)] pt-4">
        {c.metrics.map(([value, label]) => (
          <div key={label} className="text-center">
            <p className="text-base font-extrabold text-navy-deep">{value}</p>
            <p className="text-[0.65rem] text-[var(--text-dim)] leading-tight">
              {t(`metricLabels.${label}`)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-md bg-white/50 px-2 py-0.5 text-[0.68rem] text-navy-deep">
            {tech}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-block w-fit rounded-md bg-navy-ice/60 px-2 py-1 text-[0.6rem] font-semibold text-navy-medium">
        {t('placeholderTag')}
      </span>
    </GlassCard>
  );
}
