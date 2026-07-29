'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { qaCategories, qaStats } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Counter } from '@/components/ui/Counter';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

const CAT_ICONS: Record<string, string> = {
  manual: 'ClipboardCheck',
  automation: 'Bot',
  api: 'Plug',
  mobile: 'Smartphone',
  performance: 'Gauge',
  security: 'Lock',
  accessibility: 'Accessibility',
  aiAssisted: 'BrainCircuit',
  strategy: 'Target',
};

export function QaLab() {
  const t = useTranslations('qa');

  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass glass-strong rounded-glass p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-navy-soft/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy-soft/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy-soft/60" />
              </div>
              <span className="chip !py-1 !px-2.5 text-[0.65rem]">{t('exampleBadge')}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {qaStats.map((s) => (
                <div key={s.key} className="rounded-[14px] bg-white/55 p-3.5">
                  <p className="text-2xl font-extrabold text-navy-deep">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-dim)]">{t(`stats.${s.key}`)}</p>
                </div>
              ))}
              <div className="rounded-[14px] bg-gradient-to-br from-navy-medium to-navy-deep p-3.5 text-white">
                <Icon name="ShieldCheck" size={20} className="text-cyan" />
                <p className="mt-1 text-xs font-semibold">{t('exampleBadge')}</p>
              </div>
            </div>

            {/* Fake coverage bars */}
            <div className="mt-4 space-y-2.5">
              {[92, 78, 96].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                      className="h-full rounded-full bg-gradient-to-r from-navy-medium to-cyan"
                    />
                  </div>
                  <span className="w-9 text-end text-xs font-semibold text-navy-deep">{w}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category chips */}
          <div className="flex flex-col">
            <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
              {qaCategories.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="glass flex items-center gap-3 rounded-[14px] p-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/60 text-navy">
                    <Icon name={CAT_ICONS[c]} size={18} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{t(`categories.${c}`)}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5">
              <Button href="/qa-testing" icon="ArrowRight">
                {t('cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
