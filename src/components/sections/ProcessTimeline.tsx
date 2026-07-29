'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { processSteps } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

export function ProcessTimeline() {
  const t = useTranslations('process');

  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-6 flex justify-center">
          <span className="chip !py-2 !px-4 border-cyan/30 text-navy-deep">
            <Icon name="ShieldCheck" size={15} className="text-cyan" />
            {t('qaNote')}
          </span>
        </div>

        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="glass glass-sheen relative rounded-glass p-5"
            >
              <span className="text-3xl font-extrabold text-navy-soft/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 text-lg font-bold text-ink">{t(`steps.${step}.title`)}</h3>
              <p className="mt-1.5 text-sm text-[var(--text-dim)]">{t(`steps.${step}.desc`)}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
