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
      className="group flex w-full flex-col items-center gap-3 rounded-glass border border-white/50 bg-white/70 px-6 pb-6 pt-5 text-center shadow-glass backdrop-blur-glass transition hover:shadow-glass-lg"
    >
      <AgentAvatar size={168} className="-mb-2" />

      <span className="block text-base font-semibold text-ink">{t('heroTitle')}</span>
      <span className="block max-w-[26ch] text-sm leading-relaxed text-navy-medium">
        {t('heroSubtitle')}
      </span>

      <span className="mt-1 inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-navy-medium">
        <Mic size={16} aria-hidden />
        {t('heroCta')}
      </span>
    </motion.button>
  );
}
