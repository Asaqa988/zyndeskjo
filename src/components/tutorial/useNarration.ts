'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Plays one pre-rendered narration clip per tour step, and exposes its audio as
 * a MediaStream so the avatar's mouth moves while she speaks.
 *
 * Why the step advances on `ended` rather than a timer: an authored duration
 * drifts the moment a line is re-recorded or translated — Arabic runs longer
 * than English for the same sentence. Binding the step to the audio keeps the
 * highlight and the voice locked together in every language for free. The
 * authored `duration` survives only as the fallback when audio cannot play.
 *
 * One AudioContext is created and reused for the whole tour: browsers cap how
 * many a page may open, and a twelve-step tour would otherwise exhaust it.
 */

export interface Narration {
  /** Feed to <AgentAvatar stream={…} /> for lip-sync. */
  stream: MediaStream | null;
  /** Play a clip. Resolves when it finishes; rejects if it cannot play. */
  play: (clipId: string) => Promise<void>;
  stop: () => void;
  /** False when the browser is still blocking audio (no gesture yet). */
  unlocked: boolean;
}

export function useNarration(locale: string, enabled = true): Narration {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<MediaElementAudioSourceNode | null>(null);

  /** Build the element and graph once, lazily — before a gesture it would be suspended. */
  const ensureGraph = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'auto';
      audioRef.current = audio;
    }
    if (ctxRef.current) return;

    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      ctxRef.current = ctx;

      // createMediaElementSource may only be called once per element.
      const source = ctx.createMediaElementSource(audioRef.current);
      srcRef.current = source;
      const dest = ctx.createMediaStreamDestination();
      source.connect(dest); // → avatar
      source.connect(ctx.destination); // → speakers
      setStream(dest.stream);
    } catch (err) {
      // Without the graph narration still plays, just without lip movement.
      console.error('[narration] could not tap audio:', err);
    }
  }, []);

  const play = useCallback(
    async (clipId: string) => {
      if (!enabled) throw new Error('narration disabled');
      ensureGraph();

      const audio = audioRef.current;
      if (!audio) throw new Error('no audio element');

      await ctxRef.current?.resume().catch(() => {});
      audio.src = `/audio/tutorial/${locale === 'ar' ? 'ar' : 'en'}/${clipId}.mp3`;
      audio.currentTime = 0;

      await audio.play(); // throws while the browser is still blocking audio
      setUnlocked(true);

      await new Promise<void>((resolve, reject) => {
        const done = () => {
          cleanup();
          resolve();
        };
        const failed = () => {
          cleanup();
          reject(new Error('playback error'));
        };
        const cleanup = () => {
          audio.removeEventListener('ended', done);
          audio.removeEventListener('error', failed);
        };
        audio.addEventListener('ended', done);
        audio.addEventListener('error', failed);
      });
    },
    [enabled, locale, ensureGraph]
  );

  const stop = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
      srcRef.current = null;
      const ctx = ctxRef.current;
      ctxRef.current = null;
      void ctx?.close().catch(() => {});
    },
    []
  );

  return { stream, play, stop, unlocked };
}
