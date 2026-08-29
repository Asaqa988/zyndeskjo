'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { EcosystemGraph } from './EcosystemGraph';
import { HeroAgentCard } from '@/components/agent/HeroAgentCard';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-z grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip"
          >
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-node" />
            {t('badge')}
          </motion.span>

          <h1 className="display text-4xl sm:text-5xl lg:text-[3.75rem]">
            {[t('title1'), t('title2'), t('title3')].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                <span className={i === 2 ? 'text-gradient' : 'text-ink'}>{line}</span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl text-base md:text-lg text-[var(--text-dim)]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button href="/consultation" icon="ArrowRight">
              {t('ctaPrimary')}
            </Button>
            <Button href="/services" variant="secondary">
              {t('ctaSecondary')}
            </Button>
          </motion.div>
          <a
            href="/corporate-training"
            className="text-sm font-semibold text-navy-medium hover:text-navy inline-flex items-center gap-1.5"
          >
            <Icon name="GraduationCap" size={16} /> {t('ctaTertiary')}
          </a>
        </div>

        <div className="relative flex flex-col gap-5">
          <HeroAgentCard />
          <div className="relative">
            <EcosystemGraph />
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatDemo() {
  const t = useTranslations('hero.demo');
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reduce ? true : false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      onViewportEnter={() => setRevealed(true)}
      className="glass glass-strong glass-sheen mt-4 p-4 md:absolute md:-bottom-8 md:-start-6 md:mt-0 md:w-[86%] md:p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-deep text-white">
          <Icon name="Bot" size={16} />
        </span>
        <span className="text-sm font-bold text-ink">{t('title')}</span>
        <span className="chip ms-auto !py-1 !px-2 text-[0.65rem]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> {t('typing')}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="self-start max-w-[85%] rounded-2xl rounded-bs-sm bg-white/70 px-3.5 py-2 text-sm text-ink">
          {t('user')}
        </p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="self-end max-w-[90%] rounded-2xl rounded-be-sm bg-gradient-to-br from-navy-medium to-navy-deep px-3.5 py-2 text-sm text-white"
        >
          {t('reply')}
        </motion.p>
      </div>
    </motion.div>
  );
}
