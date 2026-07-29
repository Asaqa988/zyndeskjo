import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** Consistent section header: eyebrow + large title + optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'start';
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal
      className={clsx(
        'flex flex-col gap-3 max-w-2xl',
        align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={clsx(
          'display text-3xl md:text-4xl lg:text-5xl',
          invert ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('text-base md:text-lg', invert ? 'text-navy-ice/80' : 'text-[var(--text-dim)]')}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
