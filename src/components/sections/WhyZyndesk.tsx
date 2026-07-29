'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

const ITEMS = [
  { id: 'aiFirst', icon: 'BrainCircuit' },
  { id: 'business', icon: 'Target' },
  { id: 'practical', icon: 'Code2' },
  { id: 'quality', icon: 'ShieldCheck' },
  { id: 'oneTeam', icon: 'GraduationCap' },
  { id: 'custom', icon: 'Sparkles' },
  { id: 'bilingual', icon: 'Globe' },
  { id: 'local', icon: 'MapPin' },
  { id: 'support', icon: 'Zap' },
];

export function WhyZyndesk() {
  const t = useTranslations('why');
  return (
    <section className="section-pad">
      <div className="container-z">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
              className="glass glass-sheen rounded-glass p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/60 text-navy">
                <Icon name={it.icon} size={22} />
              </span>
              <h3 className="mt-3.5 text-base font-bold text-ink">{t(`items.${it.id}.title`)}</h3>
              <p className="mt-1 text-sm text-[var(--text-dim)]">{t(`items.${it.id}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
