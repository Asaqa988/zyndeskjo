'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface Feature {
  icon: string;
  title: string;
  desc?: string;
}

/** Generic responsive feature/capability card grid used across service pages. */
export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: Feature[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <section className="section-pad">
      <div className="container-z">
        {title && <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        <div className={`mt-12 grid gap-4 ${cols}`}>
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="glass glass-sheen rounded-glass p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-navy-medium to-navy-deep text-white">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="mt-3.5 text-base font-bold text-ink">{f.title}</h3>
              {f.desc && <p className="mt-1 text-sm text-[var(--text-dim)]">{f.desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
