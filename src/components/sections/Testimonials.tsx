'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';

export function Testimonials() {
  const t = useTranslations('testimonials');
  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((tm, i) => (
            <motion.div
              key={tm.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <GlassCard className="flex h-full flex-col">
                <Icon name="MessageSquare" size={26} className="text-cyan" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                  “{t(`items.${tm.id}.quote`)}”
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--glass-border-soft)] pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-navy-medium to-navy-deep text-sm font-bold text-white">
                    {tm.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{t(`items.${tm.id}.name`)}</p>
                    <p className="text-xs text-[var(--text-dim)]">
                      {t(`items.${tm.id}.role`)} · {t(`items.${tm.id}.company`)}
                    </p>
                  </div>
                  <span className="chip ms-auto !py-1 !px-2 text-[0.6rem]">
                    {t(`items.${tm.id}.service`)}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-[var(--text-dim)] opacity-80">{t('note')}</p>
      </div>
    </section>
  );
}
