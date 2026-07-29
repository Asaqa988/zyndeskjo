'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

/** Reusable inner-page hero with breadcrumb, badge, title, subtitle. */
export function PageHero({
  badge,
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-8 md:pt-40 md:pb-12">
      <div className="container-z">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-dim)]">
              {breadcrumb.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {b.href ? (
                    <Link href={b.href} className="hover:text-navy">{b.label}</Link>
                  ) : (
                    <span className="text-navy font-medium">{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <Icon name="ChevronDown" size={12} className="-rotate-90 rtl:rotate-90 opacity-50" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {badge && <span className="chip">{badge}</span>}
          <h1 className="display mt-4 text-4xl md:text-5xl lg:text-6xl text-ink">{title}</h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base md:text-lg text-[var(--text-dim)]">{subtitle}</p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
