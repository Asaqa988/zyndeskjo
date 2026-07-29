'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { pillars } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';

export function WhatWeDo() {
  const t = useTranslations();
  const [open, setOpen] = useState<string | null>(pillars[0].slug);

  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading
          eyebrow={t('whatWeDo.eyebrow')}
          title={t('whatWeDo.title')}
          subtitle={t('whatWeDo.subtitle')}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => {
            const isOpen = open === p.slug;
            const bullets = p.bullets;
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard tilt className="h-full">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-medium to-navy-deep text-white">
                      <Icon name={p.icon} size={24} />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-ink">
                        {t(`services.pillars.${p.slug}.title`)}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--text-dim)]">
                        {t(`services.pillars.${p.slug}.desc`)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.slug)}
                    aria-expanded={isOpen}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-medium hover:text-navy"
                  >
                    {isOpen ? t('whatWeDo.collapse') : t('whatWeDo.expand')}
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex flex-wrap gap-2">
                          {bullets.map((b) => (
                            <span key={b} className="chip">
                              <Icon name="Check" size={13} className="text-cyan" />
                              {t(`services.pillars.${p.slug}.bullets.${b}`)}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 rounded-[14px] border border-dashed border-navy-soft/40 bg-white/40 p-3">
                          <p className="eyebrow !text-[0.6rem]">{t('whatWeDo.previewLabel')}</p>
                          <p className="mt-1 text-sm font-medium text-navy-deep">
                            {t(`services.pillars.${p.slug}.preview`)}
                          </p>
                        </div>
                        <Link
                          href={p.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all"
                        >
                          {t('common.learnMore')} <Icon name="ArrowRight" size={15} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
