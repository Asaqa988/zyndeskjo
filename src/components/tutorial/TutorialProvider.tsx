'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { TUTORIAL_TARGETS, type TutorialTargetId } from '@/data/tutorials/targets';
import { initialState, isLive, reduce } from './machine';
import { useNarration } from './useNarration';
import type { Tutorial, TutorialEvent, TutorialState, TutorialStep } from './types';

/**
 * Hosts the tour: owns the machine, resolves targets, drives navigation and
 * step timing, and offers the tour on arrival.
 *
 * The engine deliberately does the *least* it can: it resolves an id to an
 * element and reports the rect. Painting is the overlay's job, and what the
 * steps say is the tutorial data's job.
 */

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TutorialContextValue {
  tutorial: Tutorial;
  state: TutorialState;
  step: TutorialStep | null;
  /** Viewport coordinates of the current target, null while unresolved. */
  rect: TargetRect | null;
  total: number;
  send: (event: TutorialEvent) => void;
  /** The tutor's voice, for the avatar to lip-sync against. */
  narrationStream: MediaStream | null;
}

const TutorialContext = createContext<TutorialContextValue | null>(null);

export function useTutorial(): TutorialContextValue {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error('useTutorial must be used inside <TutorialProvider>');
  return ctx;
}

export function TutorialProvider({
  tutorial,
  children,
}: {
  tutorial: Tutorial;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const total = tutorial.steps.length;
  const [state, dispatch] = useReducer(
    (s: TutorialState, e: TutorialEvent) => reduce(s, e, total),
    initialState
  );

  const narration = useNarration(locale);
  const [rect, setRect] = useState<TargetRect | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = isLive(state) ? tutorial.steps[state.index] ?? null : null;

  const send = useCallback((event: TutorialEvent) => dispatch(event), []);

  /** Silence immediately on pause or exit — a voice talking over a frozen tour is jarring. */
  useEffect(() => {
    if (state.status === 'paused' || state.status === 'exited') narration.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  /* ── the offer ────────────────────────────────────────────────────────── */

  /**
   * Offer the tour whenever someone arrives.
   *
   * Every arrival, not only the first: the platform is a preview of a course
   * being sold, so most people reaching it are seeing it for the first time
   * even if this browser has been here before, and the walkthrough is the
   * point of the page rather than an onboarding chore to get past.
   *
   * "Every arrival" means every fresh load of the platform. Moving between
   * its screens does not re-ask, because this provider lives in the /learn
   * layout and stays mounted across those navigations — including the ones
   * the tour itself performs.
   *
   * It lives here rather than in TutorialLauncher because the launcher sits
   * inside the sidebar, and the sidebar only renders from `lg` up — so on a
   * phone the offer never appeared at all.
   */
  const offered = useRef(false);

  useEffect(() => {
    if (offered.current || state.status !== 'idle') return;
    offered.current = true;
    // A beat after paint, so the platform is visibly there before she asks.
    const id = window.setTimeout(() => send({ type: 'START' }), 900);
    return () => window.clearTimeout(id);
  }, [state.status, send]);

  /* ── dev-only: catch steps pointing at nothing ────────────────────────── */

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const unknown = tutorial.steps
      .map((s) => s.target)
      .filter((t) => !TUTORIAL_TARGETS.includes(t as TutorialTargetId));
    if (unknown.length) {
      console.warn('[tutorial] steps target unknown ids:', unknown);
    }
  }, [tutorial.steps]);

  /* ── navigation ───────────────────────────────────────────────────────── */

  const localeRoute = useCallback((route: string) => `/${locale}${route}`, [locale]);

  useEffect(() => {
    if (!step?.route) return;
    if (pathname === localeRoute(step.route)) return;
    router.push(localeRoute(step.route));
  }, [step, pathname, router, localeRoute]);

  /* ── target resolution ────────────────────────────────────────────────── */

  useEffect(() => {
    if (!step) {
      setRect(null);
      return;
    }

    let cancelled = false;
    let attempts = 0;

    /**
     * The element may not exist for a moment: a route change is in flight, or
     * the page is still painting. Poll briefly rather than declaring the step
     * broken on the first miss.
     */
    const find = () => {
      if (cancelled) return;
      const el = document.querySelector<HTMLElement>(`[data-tutorial="${step.target}"]`);

      if (!el) {
        if (attempts++ < 20) {
          window.setTimeout(find, 100);
        } else {
          console.warn(`[tutorial] target "${step.target}" not found — skipping step`);
          send({ type: 'NEXT' });
        }
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Measure after the scroll settles, or the hole lands in the wrong place.
      window.setTimeout(() => {
        if (cancelled) return;
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      }, 380);
    };

    find();
    return () => {
      cancelled = true;
    };
  }, [step, pathname, send]);

  /** Keep the hole on the element while the page moves under it. */
  useEffect(() => {
    if (!step) return;
    const remeasure = () => {
      const el = document.querySelector<HTMLElement>(`[data-tutorial="${step.target}"]`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    window.addEventListener('scroll', remeasure, { passive: true });
    window.addEventListener('resize', remeasure);
    return () => {
      window.removeEventListener('scroll', remeasure);
      window.removeEventListener('resize', remeasure);
    };
  }, [step]);

  /* ── step timing ──────────────────────────────────────────────────────── */

  useEffect(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (state.status !== 'running' || !step) return;

    let cancelled = false;
    const advance = () => {
      if (!cancelled && !step.waitForUser) send({ type: 'NEXT' });
    };

    // Speak the step, then move on. The audio's own length paces the tour, so
    // narration and highlight cannot drift apart in either language.
    narration
      .play(step.id)
      .then(advance)
      .catch(() => {
        // Blocked, missing or muted — fall back to the authored duration so a
        // silent tour still paces itself sensibly.
        if (cancelled || step.waitForUser) return;
        advanceTimer.current = setTimeout(advance, step.duration ?? 6000);
      });

    return () => {
      cancelled = true;
      narration.stop();
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
    // narration is stable across renders; re-running on it would restart audio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.index, step, send]);

  /** Speak the intro and outro too — she talks from the first moment. */
  useEffect(() => {
    if (state.status !== 'intro' && state.status !== 'completed') return;
    const clip = state.status === 'intro' ? 'intro' : 'outro';
    narration.play(clip).catch(() => {});
    return () => narration.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  /* ── keyboard ─────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!isLive(state)) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') send({ type: 'EXIT' });
      if (e.key === 'ArrowRight') send({ type: locale === 'ar' ? 'PREV' : 'NEXT' });
      if (e.key === 'ArrowLeft') send({ type: locale === 'ar' ? 'NEXT' : 'PREV' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, send, locale]);

  const value = useMemo(
    () => ({ tutorial, state, step, rect, total, send, narrationStream: narration.stream }),
    [tutorial, state, step, rect, total, send, narration.stream]
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}
