'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PANELS = [
  { id: 'support', icon: 'Headset' },
  { id: 'voice', icon: 'Mic' },
  { id: 'knowledge', icon: 'Database' },
  { id: 'docs', icon: 'FileSearch' },
  { id: 'rag', icon: 'Boxes' },
  { id: 'dashboards', icon: 'LayoutDashboard' },
  { id: 'workflow', icon: 'Workflow' },
  { id: 'content', icon: 'PenTool' },
  { id: 'testing', icon: 'ShieldCheck' },
  { id: 'custom', icon: 'Cpu' },
];
const PROMPTS = ['cost', 'processes', 'assistant', 'qa'] as const;

export function AiShowcase() {
  const t = useTranslations('aiShowcase');

  return (
    <section className="theme-dark relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep via-[#0c2136] to-navy-deep" />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(40rem 40rem at 20% 10%, rgba(56,209,224,0.18), transparent 60%), radial-gradient(40rem 40rem at 90% 90%, rgba(124,166,200,0.2), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="container-z section-pad">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          invert
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Floating capability panels */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {PANELS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
                className="glass rounded-[16px] p-4"
              >
                <Icon name={p.icon} size={22} className="text-cyan" />
                <p className="mt-2.5 text-sm font-semibold text-white leading-snug">
                  {t(`panels.${p.id}`)}
                </p>
              </motion.div>
            ))}
          </div>

          <ChatbotDemo />
        </div>
      </div>
    </section>
  );
}

function ChatbotDemo() {
  const t = useTranslations('aiShowcase.demo');
  const [active, setActive] = useState<(typeof PROMPTS)[number] | null>(null);
  const [thinking, setThinking] = useState(false);

  function ask(id: (typeof PROMPTS)[number]) {
    setActive(id);
    setThinking(true);
    window.setTimeout(() => setThinking(false), 650);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass glass-strong flex flex-col rounded-glass p-5"
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/20 text-cyan">
          <Icon name="Bot" size={18} />
        </span>
        <span className="text-sm font-bold text-white">{t('title')}</span>
        <span className="chip ms-auto !py-1 !px-2.5 text-[0.65rem] !text-cyan border-cyan/30">
          {t('note')}
        </span>
      </div>

      <div className="min-h-[150px] flex-1 py-4">
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-navy-ice/70"
            >
              {t('placeholder')}
            </motion.p>
          ) : (
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              <p className="self-end max-w-[85%] rounded-2xl rounded-be-sm bg-white/15 px-3.5 py-2 text-sm text-white">
                {t(`prompts.${active}.q`)}
              </p>
              {thinking ? (
                <span className="self-start inline-flex gap-1 px-2 py-2" aria-label="thinking">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-2 w-2 rounded-full bg-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </span>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start max-w-[92%] rounded-2xl rounded-bs-sm bg-cyan/15 px-3.5 py-2.5 text-sm text-white"
                >
                  {t(`prompts.${active}.a`)}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
        {PROMPTS.map((id) => (
          <button
            key={id}
            onClick={() => ask(id)}
            className={`rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors ${
              active === id
                ? 'border-cyan bg-cyan/20 text-white'
                : 'border-white/20 text-navy-ice/80 hover:border-cyan hover:text-white'
            }`}
          >
            {t(`prompts.${id}.q`)}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
