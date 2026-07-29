'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { goals } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

/** "Choose your goal" recommender: pick a goal → recommended solution + phases + CTA. */
export function GoalSelector() {
  const t = useTranslations('goals');
  const [selected, setSelected] = useState(goals[0].id);
  const goal = goals.find((g) => g.id === selected)!;
  const phases = t.raw(`items.${goal.id}.phases`) as string[];

  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div role="tablist" aria-label={t('title')} className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
            {goals.map((g) => {
              const on = g.id === selected;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSelected(g.id)}
                  className={`glass flex items-center gap-3 rounded-[16px] p-4 text-start transition-all ${
                    on ? 'ring-2 ring-cyan glass-strong' : 'hover:border-navy-soft'
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      on ? 'bg-gradient-to-br from-navy-medium to-navy-deep text-white' : 'bg-white/60 text-navy'
                    }`}
                  >
                    <Icon name={g.icon} size={18} />
                  </span>
                  <span className="text-sm font-semibold text-ink leading-tight">
                    {t(`items.${g.id}.label`)}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="glass glass-strong glass-sheen flex flex-col rounded-glass p-6 md:p-8"
              role="tabpanel"
            >
              <p className="eyebrow">{t('recommendedLabel')}</p>
              <h3 className="mt-1 text-2xl font-bold text-ink">
                {t(`items.${goal.id}.solutionTitle`)}
              </h3>

              <p className="mt-5 text-sm font-semibold text-navy-medium">{t('phasesLabel')}</p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {phases.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-xs font-bold text-navy-deep">
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink">{p}</span>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-6 pt-2">
                <Button href={goal.ctaHref} icon="ArrowRight" className="w-full justify-center sm:w-auto">
                  {t(`items.${goal.id}.cta`)}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
