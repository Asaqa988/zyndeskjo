'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

/**
 * Scroll-triggered reveal. Safe against overflow-clipping parents:
 * the transform is small (y:26) so IntersectionObserver still fires.
 * Honors reduced-motion via Framer's global MotionConfig in providers.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </M>
  );
}

/** Staggered container: children with `.reveal-child` variants animate in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
