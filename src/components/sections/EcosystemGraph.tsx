'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

const NODES = [
  { id: 'ai', icon: 'BrainCircuit', x: 50, y: 12 },
  { id: 'automation', icon: 'Workflow', x: 84, y: 28 },
  { id: 'qa', icon: 'ShieldCheck', x: 90, y: 62 },
  { id: 'web', icon: 'Code2', x: 70, y: 88 },
  { id: 'mobile', icon: 'Smartphone', x: 32, y: 90 },
  { id: 'chatbots', icon: 'MessageSquare', x: 10, y: 64 },
  { id: 'marketing', icon: 'TrendingUp', x: 14, y: 28 },
  { id: 'training', icon: 'GraduationCap', x: 50, y: 50 },
];
const HUB = { x: 50, y: 50 };

/** Interactive AI-ecosystem constellation: hub + 8 nodes, animated links, tooltips. */
export function EcosystemGraph() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      role="group"
      aria-label={t('ecosystemLabel')}
    >
      {/* Connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3E6C96" stopOpacity="0.5" />
            <stop offset="1" stopColor="#38D1E0" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {NODES.filter((n) => n.id !== 'training').map((n, i) => (
          <motion.line
            key={n.id}
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
            stroke="url(#link)"
            strokeWidth={active === n.id ? 0.8 : 0.4}
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {NODES.map((n, i) => {
        const isHub = n.id === 'training';
        const open = active === n.id;
        return (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <motion.button
              type="button"
              initial={reduce ? undefined : { scale: 0, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive((a) => (a === n.id ? null : a))}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive((a) => (a === n.id ? null : a))}
              onClick={() => setActive((a) => (a === n.id ? null : n.id))}
              aria-label={t(`nodes.${n.id}.label`)}
              aria-expanded={open}
              className={`group grid place-items-center rounded-2xl border transition-all ${
                isHub
                  ? 'h-16 w-16 bg-gradient-to-br from-navy-medium to-navy-deep text-white border-white/30 shadow-glass-lg'
                  : 'h-12 w-12 glass glass-strong text-navy-deep hover:border-cyan hover:text-navy'
              } ${open ? 'ring-2 ring-cyan' : ''} ${!reduce && !isHub ? 'animate-float' : ''}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <Icon name={n.icon} size={isHub ? 26 : 20} />
            </motion.button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.16 }}
                role="tooltip"
                className="glass glass-strong absolute start-1/2 top-full z-30 mt-2 w-48 -translate-x-1/2 p-3 text-center"
              >
                <p className="text-sm font-bold text-ink">{t(`nodes.${n.id}.label`)}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-dim)]">
                  {t(`nodes.${n.id}.tip`)}
                </p>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
