'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { useTutorial } from './TutorialProvider';

/**
 * Starts the tour for a first-time student, and gives everyone else a way back
 * to it.
 *
 * The auto-start fires once per mount and only when storage says this student
 * has not finished or dismissed this version — so returning students are not
 * ambushed by a tour they already sat through.
 */
export function TutorialLauncher() {
  const { state, send, seen } = useTutorial();
  const t = useTranslations('tutorial');
  const autoStarted = useRef(false);

  useEffect(() => {
    if (seen || autoStarted.current || state.status !== 'idle') return;
    autoStarted.current = true;
    // A beat after paint, so the platform is visibly there before she speaks.
    const id = window.setTimeout(() => send({ type: 'START' }), 900);
    return () => window.clearTimeout(id);
  }, [seen, state.status, send]);

  // While the tour is on screen the overlay owns the controls.
  if (state.status !== 'idle' && state.status !== 'exited') return null;

  return (
    <button
      type="button"
      onClick={() => send({ type: 'REPLAY' })}
      className="glass inline-flex w-full items-center justify-center gap-2 rounded-pill px-4 py-2.5 text-xs font-semibold text-navy-medium transition hover:text-navy"
    >
      <Sparkles size={14} aria-hidden />
      {t('replayTour')}
    </button>
  );
}
