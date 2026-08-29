'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, X, Sparkles } from 'lucide-react';
import { AgentAvatar } from '@/components/agent/AgentAvatar';
import { useTutorial } from './TutorialProvider';
import { isLive } from './machine';

/**
 * Everything the student sees during a tour: the dimmed page with a hole cut
 * around the target, the speech bubble, the avatar and the controls.
 *
 * Rendered through a portal on <body> so the spotlight is never clipped by a
 * parent's overflow or trapped in a stacking context — the usual reason
 * home-grown tours break the moment the page scrolls.
 */

const PAD = 10;
const RADIUS = 18;

export function TutorialOverlay() {
  const { state, step, rect, total, send, tutorial, narrationStream } = useTutorial();
  const t = useTranslations('tutorial');
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const pick = (text: { en: string; ar: string }) => (locale === 'ar' ? text.ar : text.en);

  const showIntro = state.status === 'intro';
  const showOutro = state.status === 'completed';
  const live = isLive(state);
  if (!showIntro && !showOutro && !live) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* Dim + hole. An SVG mask keeps the cut-out crisp at any size. */}
      <AnimatePresence>
        {live && rect && (
          <motion.svg
            key="mask"
            className="pointer-events-auto absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => send({ type: 'NEXT' })}
          >
            <defs>
              <mask id="tutorial-hole">
                <rect width="100%" height="100%" fill="white" />
                <motion.rect
                  initial={false}
                  animate={{
                    x: rect.left - PAD,
                    y: rect.top - PAD,
                    width: rect.width + PAD * 2,
                    height: rect.height + PAD * 2,
                  }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
                  rx={RADIUS}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(13, 27, 42, 0.72)"
              mask="url(#tutorial-hole)"
            />
            {/* Rim around the hole. */}
            <motion.rect
              initial={false}
              animate={{
                x: rect.left - PAD,
                y: rect.top - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
              }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
              rx={RADIUS}
              fill="none"
              stroke="rgba(56, 209, 224, 0.9)"
              strokeWidth="2"
            />
          </motion.svg>
        )}

        {/* Full dim for intro and outro — nothing is being pointed at yet. */}
        {(showIntro || showOutro) && (
          <motion.div
            key="scrim"
            className="pointer-events-auto absolute inset-0 bg-ink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* The tutor: avatar + what she is saying + controls. */}
      <AnimatePresence>
        <motion.div
          key="panel"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          // Anchored to the trailing edge so it clears the sidebar rail, which is
          // itself a tour target and must stay visible.
          className="pointer-events-auto fixed bottom-5 end-5 z-10 w-[min(24rem,calc(100vw-2.5rem))]"
        >
          <div className="glass glass-strong overflow-hidden rounded-glass shadow-glass-lg">
            <div className="flex gap-3.5 p-4">
              <AgentAvatar
                size={64}
                ring={false}
                stream={narrationStream}
                className="shrink-0 self-start"
              />

              <div className="min-w-0 flex-1">
                {showIntro && (
                  <>
                    <p className="text-sm font-semibold text-ink">{pick(tutorial.intro.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-navy-medium">
                      {pick(tutorial.intro.message)}
                    </p>
                  </>
                )}

                {showOutro && (
                  <>
                    <p className="text-sm font-semibold text-ink">{pick(tutorial.outro.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-navy-medium">
                      {pick(tutorial.outro.message)}
                    </p>
                  </>
                )}

                {live && step && (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-soft">
                      {t('stepOf', { n: state.index + 1, total })}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">{pick(step.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-navy-medium">
                      {pick(step.message)}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Progress across the whole tour. */}
            {live && (
              <div className="h-1 bg-navy-ice">
                <motion.div
                  className="h-full bg-navy"
                  initial={false}
                  animate={{ width: `${((state.index + 1) / total) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                />
              </div>
            )}

            <div className="flex items-center justify-between gap-2 border-t border-white/50 bg-white/40 px-3 py-2.5">
              {showIntro && (
                <>
                  <button
                    type="button"
                    onClick={() => send({ type: 'SKIP' })}
                    className="rounded-pill px-3 py-1.5 text-xs font-medium text-navy-medium transition hover:text-navy"
                  >
                    {t('skip')}
                  </button>
                  <button
                    type="button"
                    onClick={() => send({ type: 'BEGIN' })}
                    className="inline-flex items-center gap-1.5 rounded-pill bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-medium"
                  >
                    <Sparkles size={13} aria-hidden />
                    {pick(tutorial.intro.cta)}
                  </button>
                </>
              )}

              {showOutro && (
                <>
                  <button
                    type="button"
                    onClick={() => send({ type: 'REPLAY' })}
                    className="rounded-pill px-3 py-1.5 text-xs font-medium text-navy-medium transition hover:text-navy"
                  >
                    {t('replay')}
                  </button>
                  <button
                    type="button"
                    onClick={() => send({ type: 'EXIT' })}
                    className="inline-flex items-center gap-1.5 rounded-pill bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-medium"
                  >
                    {pick(tutorial.outro.cta)}
                  </button>
                </>
              )}

              {live && (
                <>
                  <div className="flex items-center gap-1">
                    <IconButton
                      label={t('previous')}
                      onClick={() => send({ type: 'PREV' })}
                      disabled={state.index === 0}
                    >
                      <ChevronLeft size={15} className="rtl:rotate-180" />
                    </IconButton>

                    <IconButton
                      label={state.status === 'paused' ? t('resume') : t('pause')}
                      onClick={() =>
                        send({ type: state.status === 'paused' ? 'RESUME' : 'PAUSE' })
                      }
                    >
                      {state.status === 'paused' ? <Play size={14} /> : <Pause size={14} />}
                    </IconButton>

                    <IconButton label={t('next')} onClick={() => send({ type: 'NEXT' })}>
                      <ChevronRight size={15} className="rtl:rotate-180" />
                    </IconButton>
                  </div>

                  <button
                    type="button"
                    onClick={() => send({ type: 'EXIT' })}
                    className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium text-navy-medium transition hover:text-navy"
                  >
                    <X size={13} aria-hidden />
                    {t('exit')}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-full text-navy-medium transition hover:bg-white/70 hover:text-navy disabled:opacity-40"
    >
      {children}
    </button>
  );
}
