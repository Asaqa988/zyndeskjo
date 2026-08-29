'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, RotateCcw, Check, Loader2 } from 'lucide-react';

/**
 * A convincing mock of the AI playground.
 *
 * Nothing here calls a model: the point of this phase is to know whether the
 * screen feels right, and a scripted run shows the shape of the real thing
 * without the latency, cost or failure modes of a live call. The step list is
 * the same pipeline the course teaches, so what a student sees here matches
 * what they will build.
 *
 * When this becomes real, only `run()` changes — the rendering is already
 * driven by per-step state.
 */

type StepState = 'idle' | 'running' | 'done';

const STEP_IDS = [
  'requirement',
  'analyse',
  'cases',
  'generate',
  'execute',
  'fail',
  'diagnose',
  'fix',
  'pass',
  'report',
] as const;

export function PlaygroundDemo() {
  const t = useTranslations('learn.playground');
  const reduce = useReducedMotion();
  const [states, setStates] = useState<Record<string, StepState>>({});
  const [running, setRunning] = useState(false);

  const reset = () => {
    setStates({});
    setRunning(false);
  };

  const run = async () => {
    setStates({});
    setRunning(true);
    for (const id of STEP_IDS) {
      setStates((s) => ({ ...s, [id]: 'running' }));
      await new Promise((r) => setTimeout(r, reduce ? 60 : 480));
      setStates((s) => ({ ...s, [id]: 'done' }));
    }
    setRunning(false);
  };

  return (
    <div className="glass glass-strong flex flex-col gap-5 rounded-glass p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">{t('demoTitle')}</h2>
          <p className="mt-1 text-xs text-navy-medium">{t('demoLead')}</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-pill bg-navy px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-navy-medium disabled:opacity-60"
          >
            {running ? (
              <Loader2 size={14} aria-hidden className="animate-spin" />
            ) : (
              <Play size={14} aria-hidden fill="currentColor" />
            )}
            {running ? t('running') : t('run')}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-pill bg-white/70 px-4 py-2.5 text-xs font-semibold text-navy-medium ring-1 ring-inset ring-white/70 transition hover:text-navy disabled:opacity-60"
          >
            <RotateCcw size={14} aria-hidden />
            {t('reset')}
          </button>
        </div>
      </div>

      <ol className="flex flex-col gap-0">
        {STEP_IDS.map((id, i) => {
          const state = states[id] ?? 'idle';
          const failure = id === 'fail';
          return (
            <li key={id} className="flex flex-col">
              <div
                className={`flex items-center gap-3.5 rounded-[14px] px-3.5 py-2.5 transition ${
                  state === 'idle' ? 'opacity-45' : 'bg-white/55'
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold tabular-nums ${
                    state === 'done'
                      ? failure
                        ? 'bg-navy-ice text-navy'
                        : 'bg-navy text-white'
                      : 'bg-white text-navy-soft ring-1 ring-inset ring-navy-soft/40'
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {state === 'done' ? (
                      <motion.span
                        key="done"
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <Check size={13} />
                      </motion.span>
                    ) : state === 'running' ? (
                      <motion.span key="run" initial={false}>
                        <Loader2 size={12} className="animate-spin" />
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={false}>
                        {i + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink">{t(`steps.${id}.label`)}</span>
                  <span className="block text-xs text-navy-medium">{t(`steps.${id}.detail`)}</span>
                </span>
              </div>

              {i < STEP_IDS.length - 1 && (
                <span aria-hidden className="ms-[30px] h-3 w-px bg-navy-soft/40" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
