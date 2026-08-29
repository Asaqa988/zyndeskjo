'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { AgentAvatar } from './AgentAvatar';
import { openAgent } from './openAgent';

/**
 * The assistant's face in the hero — the first thing a visitor sees.
 *
 * Deliberately does NOT hold a live call itself. Clicking it opens the floating
 * widget, which owns the single WebRTC connection; keeping one call in one place
 * avoids two components fighting over the microphone.
 */
export function HeroAgentCard() {
  const t = useTranslations('agent');

  return (
    <motion.button
      type="button"
      onClick={() => openAgent('voice')}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      aria-label={t('heroCta')}
      className="group flex w-full items-center gap-4 rounded-glass border border-white/50 bg-white/70 p-4 text-start shadow-glass backdrop-blur-glass transition hover:shadow-glass-lg"
    >
      <AgentAvatar size={72} ring={false} className="shrink-0" />

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{t('heroTitle')}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-navy-medium">
          {t('heroSubtitle')}
        </span>
      </span>

      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-navy px-3 py-2 text-xs font-semibold text-white transition group-hover:bg-navy-medium">
        <Mic size={14} aria-hidden />
        {t('heroCta')}
      </span>
    </motion.button>
  );
}
