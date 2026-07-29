'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/ui/Icon';

/** Accessible FAQ accordion. Reusable across service pages. */
export function FaqAccordion({
  title,
  items,
}: {
  title?: string;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad">
      <div className="container-z max-w-3xl">
        {title && <SectionHeading title={title} />}
        <div className="mt-10 flex flex-col gap-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="glass rounded-glass overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-start"
                >
                  <span className="text-base font-semibold text-ink">{it.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`shrink-0 text-navy-medium transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--text-dim)]">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
