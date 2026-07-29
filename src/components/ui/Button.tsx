'use client';

import { clsx } from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { Icon } from './Icon';

interface BaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: string;
  /** Magnetic pull toward cursor on desktop */
  magnetic?: boolean;
}
type LinkProps = BaseProps & { href: string; onClick?: never; type?: never };
type BtnProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export function Button(props: LinkProps | BtnProps) {
  const { children, variant = 'primary', className, icon, magnetic = true } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (!magnetic || reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  const inner = (
    <span ref={ref} className="inline-flex items-center gap-2 transition-transform duration-300">
      {children}
      {icon && <Icon name={icon} size={18} />}
    </span>
  );
  const cls = clsx('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', className);

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>
        {inner}
      </Link>
    );
  }
  return (
    <motion.button
      type={(props as BtnProps).type ?? 'button'}
      onClick={(props as BtnProps).onClick}
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {inner}
    </motion.button>
  );
}
