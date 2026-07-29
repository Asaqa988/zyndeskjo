'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { trainingPrograms, trainingPath, trainingFormats } from '@/data/training';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export function TrainingTabs({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations('training');
  const [tab, setTab] = useState(trainingPrograms[0].id);
  const prog = trainingPrograms.find((p) => p.id === tab)!;
  const learn = t.raw(`programs.${prog.id}.learn`) as string[];

  return (
    <section className="section-pad">
      <div className="container-z">
        {showHeading && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label={t('title')}>
          {trainingPrograms.map((p) => {
            const on = p.id === tab;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(p.id)}
                className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2.5 text-sm font-semibold transition-all ${
                  on
                    ? 'border-transparent bg-gradient-to-br from-navy-medium to-navy-deep text-white shadow-glass'
                    : 'border-[var(--glass-border)] glass text-[var(--text-dim)] hover:text-navy'
                }`}
              >
                <Icon name={p.icon} size={16} />
                {t(`programs.${p.id}.title`)}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
            className="glass glass-strong glass-sheen mt-6 grid gap-6 rounded-glass p-6 md:grid-cols-2 md:p-8"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-ink">{t(`programs.${prog.id}.title`)}</h3>
              <div>
                <p className="eyebrow">{t('who')}</p>
                <p className="mt-1 text-sm text-[var(--text-dim)]">{t(`programs.${prog.id}.audience`)}</p>
              </div>
              <div>
                <p className="eyebrow">{t('learnLabel')}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {learn.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-ink">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 shrink-0 text-cyan" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">{t('projectsLabel')}</p>
                <p className="mt-1 text-sm text-[var(--text-dim)]">{t(`programs.${prog.id}.projects`)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="eyebrow">{t('toolsLabel')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {prog.tools.map((tool) => (
                    <span key={tool} className="chip">{tool}</span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] bg-white/50 p-3">
                  <p className="eyebrow !text-[0.6rem]">{t('formatLabel')}</p>
                  <p className="mt-1 text-sm font-medium text-navy-deep">{t(`programs.${prog.id}.format`)}</p>
                </div>
                <div className="rounded-[14px] bg-white/50 p-3">
                  <p className="eyebrow !text-[0.6rem]">{t('outcomeLabel')}</p>
                  <p className="mt-1 text-sm font-medium text-navy-deep">{t(`programs.${prog.id}.outcome`)}</p>
                </div>
              </div>
              <Button href="/corporate-training" icon="ArrowRight" className="mt-auto w-full justify-center sm:w-fit">
                {t('requestBtn')}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Learning path */}
        <div className="mt-12">
          <p className="text-center text-sm font-semibold text-navy-medium">{t('pathTitle')}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {trainingPath.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="chip !py-2 !px-4 font-semibold text-navy-deep">
                  <span className="text-cyan">{String(i + 1).padStart(2, '0')}</span>
                  {t(`path.${step}`)}
                </span>
                {i < trainingPath.length - 1 && (
                  <Icon name="ArrowRight" size={16} className="text-navy-soft rtl:rotate-180" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formats */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {trainingFormats.map((f) => (
            <span key={f} className="chip text-[var(--text-dim)]">
              <Icon name="Check" size={13} className="text-cyan" />
              {t(`formats.${f}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
