'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { useTutorial } from './TutorialProvider';

/**
 * A way back to the tour once it has been taken or dismissed.
 *
 * The first-visit offer is not here: this button lives in the sidebar, which
 * a phone never renders, so the provider owns that instead.
 */
export function TutorialLauncher() {
  const { state, send } = useTutorial();
  const t = useTranslations('tutorial');

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
