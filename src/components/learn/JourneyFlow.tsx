'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { course } from '@/data/course/course';
import { pick } from '@/data/course/types';
import { tutorialTarget } from '@/data/tutorials/targets';

/**
 * The end-to-end journey, drawn one node at a time.
 *
 * Each node exposes `data-journey-node="<id>"` so the tutorial engine can drive
 * the reveal in step with narration later. Until then it plays on scroll-in,
 * which is also what a student sees when they simply visit the page.
 *
 * Reduced motion gets the whole diagram at once — the information is the
 * sequence itself, and that survives without the animation.
 */
export function JourneyFlow({ activeIndex }: { activeIndex?: number }) {
  const locale = useLocale();
  const t = useTranslations('learn.path');
  const reduce = useReducedMotion();

  return (
    <div {...tutorialTarget('journey-flow')} className="glass glass-strong rounded-glass p-6 sm:p-8">
      <p className="mb-6 text-sm text-navy-medium">{t('flowLead')}</p>

      <ol className="flex flex-col gap-0">
        {course.journey.map((node, i) => {
          // When the tutorial drives it, everything past the cursor is dimmed.
          const dimmed = activeIndex !== undefined && i > activeIndex;
          const current = activeIndex === i;

          return (
            <li key={node.id} data-journey-node={node.id} className="flex flex-col">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.07 }}
                animate={
                  activeIndex === undefined ? undefined : { opacity: dimmed ? 0.35 : 1 }
                }
                className={`flex items-center gap-4 rounded-[16px] px-4 py-3 transition ${
                  current ? 'bg-navy text-white shadow-glass' : 'bg-white/55'
                }`}
              >
                <span
                  aria-hidden
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-[12px] ${
                    current ? 'bg-white/15 text-white' : 'bg-navy-ice text-navy'
                  }`}
                >
                  <Icon name={node.icon} size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold ${current ? 'text-white' : 'text-ink'}`}
                  >
                    {pick(node.label, locale)}
                  </span>
                  <span
                    className={`block text-xs leading-relaxed ${
                      current ? 'text-navy-ice' : 'text-navy-medium'
                    }`}
                  >
                    {pick(node.note, locale)}
                  </span>
                </span>

                <span
                  className={`shrink-0 text-[11px] font-semibold tabular-nums ${
                    current ? 'text-navy-ice' : 'text-navy-soft'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Connector — the arrow between stages. */}
              {i < course.journey.length - 1 && (
                <motion.span
                  aria-hidden
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={reduce ? undefined : { scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: reduce ? 0 : i * 0.07 + 0.2 }}
                  className="ms-9 h-4 w-px origin-top bg-navy-soft/50"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
