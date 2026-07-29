'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { metrics } from '@/data/metrics';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Counter } from '@/components/ui/Counter';

export function Metrics() {
  const t = useTranslations('metrics');
  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass glass-sheen rounded-glass p-6 text-center"
            >
              <p className="text-3xl font-extrabold text-gradient md:text-4xl">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-2 text-sm text-[var(--text-dim)]">{t(`items.${m.key}`)}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-[var(--text-dim)] opacity-80">{t('note')}</p>
      </div>
    </section>
  );
}
