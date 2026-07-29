'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

/** Compact conversion band for internal page ends. */
export function CtaBand({
  title,
  subtitle,
  primaryLabel,
  primaryHref = '/consultation',
  secondaryLabel,
  secondaryHref = '/contact',
}: {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-pad">
      <div className="container-z">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass glass-strong glass-sheen flex flex-col items-center gap-5 rounded-glass p-8 text-center md:p-12"
        >
          <h2 className="display text-3xl md:text-4xl text-ink">{title}</h2>
          {subtitle && <p className="max-w-xl text-[var(--text-dim)]">{subtitle}</p>}
          <div className="flex flex-wrap justify-center gap-3">
            <Button href={primaryHref} icon="ArrowRight">
              {primaryLabel}
            </Button>
            {secondaryLabel && (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
