'use client';

import { clsx } from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable subtle pointer-tilt on desktop */
  tilt?: boolean;
  strong?: boolean;
}

/**
 * Frosted glass surface with optional pointer-reactive tilt + sheen.
 * Tilt is disabled for reduced-motion and coarse pointers (touch).
 */
export function GlassCard({ children, className, tilt = false, strong = false }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt || reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -5}deg) rotateY(${px * 6}deg)`;
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = '';
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx(
        'glass glass-sheen p-6 md:p-7 transition-transform duration-300 will-change-transform',
        strong && 'glass-strong',
        className
      )}
      style={
        tilt
          ? ({
              backgroundImage:
                'radial-gradient(30rem 30rem at var(--mx,50%) var(--my,0%), rgba(56,209,224,0.10), transparent 45%)',
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
