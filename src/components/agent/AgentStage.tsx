'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mic, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { AgentAvatar } from './AgentAvatar';
import { openAgent } from './openAgent';
import { useGreeting } from './useGreeting';

/**
 * The whole home page: the assistant, and nothing else.
 *
 * Everything the site used to say in sections is now something the visitor
 * asks for. The only other route kept in front of them is /contact.
 */
export function AgentStage() {
  const t = useTranslations('agent');
  const locale = useLocale();
  // Speaks the welcome as soon as the browser permits, and gives us its audio
  // so her mouth moves while she says it — see useGreeting.
  const greeting = useGreeting(locale);

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full max-w-xl flex-col items-center gap-6 text-center"
      >
        <AgentAvatar size={260} stream={greeting.stream} />

        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t('stageTitle')}</h1>
        <p className="max-w-[46ch] text-base leading-relaxed text-navy-medium">
          {t('stageSubtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openAgent('voice')}
            className="inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white shadow-glass transition hover:bg-navy-medium"
          >
            <Mic size={18} aria-hidden />
            {t('stageVoice')}
          </button>

          <button
            type="button"
            onClick={() => openAgent('chat')}
            className="inline-flex items-center gap-2 rounded-pill border border-navy/20 bg-white/70 px-6 py-3 text-sm font-semibold text-navy backdrop-blur-glass transition hover:bg-white"
          >
            <MessageSquare size={18} aria-hidden />
            {t('stageChat')}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium">
          <Link
            href="/learn"
            className="text-navy-medium underline-offset-4 hover:text-navy hover:underline"
          >
            {t('stageLearn')}
          </Link>
          <Link
            href="/cv-check"
            className="text-navy-medium underline-offset-4 hover:text-navy hover:underline"
          >
            {t('stageCv')}
          </Link>
          <Link
            href="/contact"
            className="text-navy-medium underline-offset-4 hover:text-navy hover:underline"
          >
            {t('stageContact')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
