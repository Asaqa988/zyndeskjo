import type { TutorialEvent, TutorialState } from './types';

/**
 * The tour as a pure reducer — no React, no DOM, no timers.
 *
 * Keeping the transitions here means the awkward cases (skipping past the last
 * step, pausing while waiting for the student, replaying a finished tour) are
 * decided in one readable place and can be checked without rendering anything.
 */

export const initialState: TutorialState = { status: 'idle', index: 0 };

export function reduce(state: TutorialState, event: TutorialEvent, total: number): TutorialState {
  switch (event.type) {
    case 'START':
      // Only meaningful from rest; ignore a second START mid-tour.
      return state.status === 'idle' ? { status: 'intro', index: 0 } : state;

    case 'BEGIN':
      return state.status === 'intro' ? { status: 'running', index: 0 } : state;

    case 'NEXT': {
      if (!isLive(state)) return state;
      const next = state.index + 1;
      // Running past the end is how a tour finishes.
      return next >= total ? { status: 'completed', index: total - 1 } : { status: 'running', index: next };
    }

    case 'PREV':
      if (!isLive(state)) return state;
      return { status: 'running', index: Math.max(0, state.index - 1) };

    case 'GOTO':
      if (!isLive(state)) return state;
      return { status: 'running', index: clamp(event.index, 0, total - 1) };

    case 'WAIT':
      // Only a running step can start waiting on the student.
      return state.status === 'running' ? { ...state, status: 'waiting' } : state;

    case 'PAUSE':
      return isLive(state) ? { ...state, status: 'paused' } : state;

    case 'RESUME':
      return state.status === 'paused' ? { ...state, status: 'running' } : state;

    case 'SKIP':
    case 'EXIT':
      // Leaving from the intro counts as declining the tour.
      return { status: 'exited', index: state.index };

    case 'COMPLETE':
      return { status: 'completed', index: state.index };

    case 'REPLAY':
      return { status: 'intro', index: 0 };

    default:
      return state;
  }
}

/** Running, waiting or paused — i.e. the tour is on screen and has a step. */
export function isLive(state: TutorialState): boolean {
  return state.status === 'running' || state.status === 'waiting' || state.status === 'paused';
}

/** The overlay is mounted for these — intro and outro included. */
export function isActive(state: TutorialState): boolean {
  return isLive(state) || state.status === 'intro' || state.status === 'completed';
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
