'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot } from 'lucide-react';

/**
 * Talking avatar for the assistant.
 *
 * No video and no third-party avatar service. It is three stills of the same
 * face with progressively open mouths, stacked on top of each other; we measure
 * the loudness of the assistant's audio and cross-fade between them, which
 * reads as lip movement. A canvas ring around it visualises the frequency
 * spectrum. Same trick as the JoAcademy assistant — cheap, offline, and it
 * degrades to a static portrait if anything fails.
 *
 * Drop the frames in /public/avatar as zyn-0.png (mouth closed) … zyn-2.png
 * (mouth open). If they are missing, an icon placeholder is shown instead, so
 * the site never renders a broken image.
 */

/**
 * Portrait frames, mouth increasingly open. ONE frame is valid — the avatar
 * then stays still and the glow/ring carry the "speaking" feel.
 *
 * List only files that actually exist in /public/avatar: the component probes
 * them from the browser, so naming a missing file costs a real 404.
 */
const FRAMES = ['/avatar/zyn-0.png', '/avatar/zyn-1.png', '/avatar/zyn-2.png'];

interface Props {
  /** The assistant's outgoing audio. Null when not on a call — mouth stays shut. */
  stream?: MediaStream | null;
  /** Rendered pixel size of the circular portrait. */
  size?: number;
  /** Draw the reactive frequency ring around the portrait. */
  ring?: boolean;
  className?: string;
}

export function AgentAvatar({ stream, size = 160, ring = true, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  /**
   * Which frames actually exist. Probed once with Image() rather than rendered
   * optimistically, so a single-portrait setup does not fire 404s for the
   * mouth frames it does not have.
   */
  const [available, setAvailable] = useState<string[]>([]);
  const anyLoaded = available.length > 0;

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      FRAMES.map(
        (src) =>
          new Promise<string | null>((resolve) => {
            const im = new Image();
            im.onload = () => resolve(src);
            im.onerror = () => resolve(null);
            im.src = src;
          })
      )
    ).then((found) => {
      if (!cancelled) setAvailable(found.filter(Boolean) as string[]);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Live amplitude 0..1, mirrored into a ref so the RAF loop can read it. */
  const levelRef = useRef(0);

  /**
   * Cross-fade the stack. 0 = mouth closed, 1 = fully open.
   * Only frames that actually decoded take part, so supplying a single still
   * portrait is valid — it simply stays put and the glow does the work.
   */
  const applyMouth = (open: number) => {
    levelRef.current = open;
    const frames = (imgRefs.current.filter(Boolean) as HTMLImageElement[]).filter(
      (im) => im.naturalWidth > 0
    );
    const portrait = portraitRef.current;
    if (portrait) {
      // Subtle breathing + glow so even a single still reads as "speaking".
      portrait.style.transform = `scale(${(1 + open * 0.035).toFixed(3)})`;
      portrait.style.boxShadow = open > 0.06
        ? `0 0 0 ${(open * 10).toFixed(1)}px rgba(56, 209, 224, ${(open * 0.28).toFixed(2)})`
        : "";
    }
    if (frames.length < 2) return;
    const p = Math.max(0, Math.min(1, open)) * (frames.length - 1);
    const lo = Math.floor(p);
    const frac = p - lo;
    frames.forEach((im, i) => {
      im.style.opacity = i <= lo ? '1' : i === lo + 1 ? frac.toFixed(2) : '0';
    });
  };

  useEffect(() => {
    if (!stream) {
      applyMouth(0);
      return;
    }

    let cancelled = false;
    let audioCtx: AudioContext | null = null;
    // Held for cleanup: canvasRef.current may point elsewhere by teardown.
    let wiredCanvas: HTMLCanvasElement | null = null;

    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new Ctor();
      ctxRef.current = audioCtx;
      void audioCtx.resume();

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const time = new Uint8Array(analyser.fftSize);
      const freq = new Uint8Array(analyser.frequencyBinCount);
      const canvas = canvasRef.current;
      const c2d = canvas?.getContext('2d') ?? null;
      wiredCanvas = canvas;

      const loop = () => {
        if (cancelled) return;

        analyser.getByteTimeDomainData(time);
        let sum = 0;
        for (let i = 0; i < time.length; i++) {
          const d = (time[i] - 128) / 128;
          sum += d * d;
        }
        // RMS with a noise gate, then an eased curve so ordinary speech swings
        // the mouth across the whole range instead of hovering near closed.
        // The supplied frames differ only subtly, so a conservative mapping
        // reads as "not moving at all" — hence the aggressive gain.
        const rms = Math.sqrt(sum / time.length);
        const gated = rms < 0.012 ? 0 : rms;
        applyMouth(Math.min(1, Math.pow(gated * 9, 0.75)));

        if (c2d && canvas) {
          analyser.getByteFrequencyData(freq);
          const w = canvas.width;
          const h = canvas.height;
          const cx = w / 2;
          const cy = h / 2;
          const rIn = w * 0.42;
          const rMax = w * 0.1;
          const bars = 60;

          c2d.clearRect(0, 0, w, h);
          c2d.lineCap = 'round';
          c2d.lineWidth = 3;
          c2d.strokeStyle = 'rgba(41, 76, 115, 0.45)';
          for (let i = 0; i < bars; i++) {
            const idx = 2 + Math.floor((i * (freq.length * 0.55)) / bars);
            const amp = (freq[idx] || 0) / 255;
            const len = 4 + amp * rMax;
            const a = (i / bars) * Math.PI * 2 - Math.PI / 2;
            const ca = Math.cos(a);
            const sa = Math.sin(a);
            c2d.beginPath();
            c2d.moveTo(cx + ca * rIn, cy + sa * rIn);
            c2d.lineTo(cx + ca * (rIn + len), cy + sa * (rIn + len));
            c2d.stroke();
          }
        }

        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (err) {
      console.error('[avatar] lip sync unavailable:', err);
    }

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      try {
        void audioCtx?.close();
      } catch {
        /* already closed */
      }
      ctxRef.current = null;
      applyMouth(0);
      if (wiredCanvas) {
        wiredCanvas.getContext('2d')?.clearRect(0, 0, wiredCanvas.width, wiredCanvas.height);
      }
    };
  }, [stream]);

  const canvasSize = Math.round(size * 1.35);

  return (
    <div
      ref={wrapRef}
      className={`relative inline-grid place-items-center ${className ?? ''}`}
      style={{ width: canvasSize, height: canvasSize }}
    >
      {ring && (
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          aria-hidden
          className="pointer-events-none absolute inset-0"
        />
      )}

      <div
        ref={portraitRef}
        className="relative overflow-hidden rounded-full bg-navy-ice shadow-glass"
        style={{ width: size, height: size, transition: "transform 70ms linear, box-shadow 70ms linear" }}
      >
        {available.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- stacked frames, sized by style
          <img
            key={src}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{ opacity: i === 0 ? 1 : 0, transition: 'opacity 60ms linear' }}
          />
        ))}

        {/* Placeholder until real frames exist. */}
        {!anyLoaded && (
          <div className="absolute inset-0 grid place-items-center bg-navy text-white">
            <Bot size={Math.round(size * 0.4)} aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}
