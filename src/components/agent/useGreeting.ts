'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Plays the spoken welcome as early as the browser will allow, and exposes a
 * MediaStream of it so the avatar's mouth moves while it plays.
 *
 * Browsers refuse to start audio before the visitor has interacted with the
 * page, so "play it on load" is not something any site can actually do. So:
 *
 *   1. try to play immediately — this succeeds for returning visitors, since
 *      Chrome grants autoplay to sites the user has engaged with before;
 *   2. if blocked, wait for ANY interaction — a move, click, scroll or key.
 *      The visitor needn't press anything in particular, so it still feels
 *      unprompted.
 *
 * The audio is routed through a Web Audio graph rather than straight out of the
 * element, because the avatar animates from a MediaStream — this way the
 * greeting and a live call drive the exact same lip-sync path.
 *
 * All mutable machinery lives in refs and the effect runs once, so React's
 * StrictMode double-mount can't leave a half-built audio graph behind.
 */
/**
 * Module-level, so the greeting plays ONCE per page load no matter how many
 * times the component mounts or the effect re-runs. A ref is not enough: it is
 * recreated with the component, which is exactly how the greeting ended up
 * being spoken twice.
 */
let alreadyGreeted = false;

export function useGreeting(locale: string, enabled = true) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [spoken, setSpoken] = useState(false);

  const startedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || alreadyGreeted) return;

    let alive = true;
    const audio = new Audio(`/audio/greeting-${locale === 'ar' ? 'ar' : 'en'}.mp3`);
    audio.preload = 'auto';
    audioRef.current = audio;
    audio.addEventListener('ended', () => {
      if (alive) setStream(null);
    });

    const events = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart'] as const;
    const disarm = () => events.forEach((e) => window.removeEventListener(e, attempt));

    async function attempt() {
      if (!alive || startedRef.current || alreadyGreeted) return;

      // Build the graph lazily: constructing an AudioContext before a gesture
      // leaves it suspended on some browsers.
      let tap: MediaStream | null = null;
      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = ctxRef.current ?? new Ctor();
        ctxRef.current = ctx;
        await ctx.resume().catch(() => {});
        const source = ctx.createMediaElementSource(audio);
        const dest = ctx.createMediaStreamDestination();
        source.connect(dest); // → avatar lip-sync
        source.connect(ctx.destination); // → speakers
        tap = dest.stream;
      } catch {
        // No graph: the greeting still plays, just without lip movement.
      }

      try {
        await audio.play();
      } catch {
        return; // still blocked — listeners stay armed
      }

      startedRef.current = true;
      alreadyGreeted = true;
      disarm();
      if (!alive) return;
      setSpoken(true);
      if (tap) setStream(tap);
    }

    void attempt();
    events.forEach((e) => window.addEventListener(e, attempt, { passive: true }));

    return () => {
      alive = false;
      disarm();
      audio.pause();
      audioRef.current = null;
      const ctx = ctxRef.current;
      ctxRef.current = null;
      void ctx?.close().catch(() => {});
    };
    // Locale is fixed for the life of the page; re-running on it is enough.
  }, [locale, enabled]);

  return { stream, spoken };
}
