import type { ReactNode } from 'react';
import { Check, Lock, Play, Circle } from 'lucide-react';
import type { Status } from '@/data/course/types';

/**
 * Small shared pieces for the platform screens.
 *
 * Kept together because each is a few lines and they are always used as a set —
 * splitting them into a file each would mean nine imports at the top of every
 * page for no gain.
 */

export function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-medium">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {lead && <p className="max-w-[64ch] text-sm leading-relaxed text-navy-medium">{lead}</p>}
      </div>
      {aside}
    </header>
  );
}

/**
 * Status carries meaning, so it gets shape and icon as well as colour — a
 * colour-only pill is unreadable to anyone who can't distinguish the hues.
 */
export function StatusPill({ status, labels }: { status: Status; labels: Record<Status, string> }) {
  const style: Record<Status, string> = {
    completed: 'bg-navy-ice text-navy',
    'in-progress': 'bg-navy text-white',
    available: 'bg-white/70 text-navy-medium ring-1 ring-inset ring-navy-soft/40',
    locked: 'bg-white/50 text-navy-soft',
  };
  const icon: Record<Status, ReactNode> = {
    completed: <Check size={12} aria-hidden />,
    'in-progress': <Play size={11} aria-hidden fill="currentColor" />,
    available: <Circle size={11} aria-hidden />,
    locked: <Lock size={11} aria-hidden />,
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-semibold ${style[status]}`}
    >
      {icon[status]}
      {labels[status]}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill bg-white/60 px-2.5 py-1 text-[11px] font-medium text-navy-medium ring-1 ring-inset ring-white/70">
      {children}
    </span>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-navy-ice ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-navy" style={{ width: `${value}%` }} />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="glass rounded-[16px] px-5 py-4 text-sm leading-relaxed text-navy-medium">
      {children}
    </p>
  );
}
