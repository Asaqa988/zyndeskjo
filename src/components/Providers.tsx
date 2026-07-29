'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Client providers. MotionConfig `reducedMotion="user"` makes ALL Framer
 * animations honor the OS "reduce motion" setting automatically.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
