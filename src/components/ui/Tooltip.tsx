'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Small frosted tooltip; controlled by parent `open` state. */
export function Tooltip({
  open,
  title,
  body,
  className,
}: {
  open: boolean;
  title: string;
  body?: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className={`glass glass-strong absolute z-20 w-56 p-3 text-start ${className ?? ''}`}
        >
          <p className="font-semibold text-sm text-ink">{title}</p>
          {body && <p className="text-xs text-[var(--text-dim)] mt-1 leading-relaxed">{body}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
