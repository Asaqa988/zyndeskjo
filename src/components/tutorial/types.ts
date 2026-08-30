import type { TutorialTargetId } from '@/data/tutorials/targets';

/**
 * Engine types.
 *
 * This file — and everything else in components/tutorial — may import the
 * semantic target ids and nothing else from the rest of the app. No course
 * data, no platform components. If the engine ever needs to know what a
 * "module" is, the abstraction has leaked.
 */

export interface LocalisedText {
  en: string;
  ar: string;
}

export type TutorialAction =
  /** Dim the page, cut a hole around the target. The default. */
  | 'spotlight'
  /** Ring and pulse the target; the rest of the page stays lit. */
  | 'highlight'
  /** Just bring it into view — no chrome. */
  | 'scroll';

export interface TutorialStep {
  /** Stable across edits: it is the narration filename and the resume key. */
  id: string;
  target: TutorialTargetId;
  title: LocalisedText;
  message: LocalisedText;
  /** What she says, when it differs from what the bubble shows. */
  narration?: LocalisedText;
  action?: TutorialAction;
  /** Navigate here first if we are not already on it. */
  route?: string;
  /** How long to hold when there is no audio to wait for. */
  duration?: number;
  /** Hold until the student presses Next rather than advancing on its own. */
  waitForUser?: boolean;
}

export interface Tutorial {
  id: string;
  /** Bump to re-show a tour that students have already finished. */
  version: number;
  intro: { title: LocalisedText; message: LocalisedText; cta: LocalisedText };
  outro: {
    title: LocalisedText;
    message: LocalisedText;
    cta: LocalisedText;
    href: string;
  };
  steps: TutorialStep[];
}

/* ── ports ───────────────────────────────────────────────────────────────── */

/**
 * Everything the engine needs from the outside world. Supplied by the host app,
 * so the engine itself touches no router, no audio element and no course data.
 *
 * Note what is absent: there is no way to pass a CSS selector. `resolveTarget`
 * only accepts a value from the closed `TutorialTargetId` union, which is what
 * makes "the AI cannot drive the DOM" a structural guarantee rather than a
 * matter of prompt discipline.
 */
export interface TutorialPorts {
  resolveTarget: (id: TutorialTargetId) => HTMLElement | null;
  navigate: (route: string) => void;
  /** Resolves when narration finishes; rejects when there is none to play. */
  playNarration?: (stepId: string) => Promise<void>;
}

/* ── machine ─────────────────────────────────────────────────────────────── */

export type TutorialStatus =
  | 'idle'
  | 'intro'
  | 'running'
  | 'waiting'
  | 'paused'
  | 'completed'
  | 'exited';

export interface TutorialState {
  status: TutorialStatus;
  /** Index into `steps`. Meaningless unless status is running/waiting/paused. */
  index: number;
}

export type TutorialEvent =
  | { type: 'START' }
  | { type: 'BEGIN' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GOTO'; index: number }
  | { type: 'WAIT' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SKIP' }
  | { type: 'EXIT' }
  | { type: 'REPLAY' }
  | { type: 'COMPLETE' };

