'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';

export function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <section className="section-pad">
      <div className="container-z">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="theme-dark relative overflow-hidden rounded-[28px] p-8 md:p-12"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-medium via-navy-deep to-[#0a1f33]" />
          <div
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              background:
                'radial-gradient(30rem 30rem at 100% 0%, rgba(56,209,224,0.25), transparent 60%)',
            }}
            aria-hidden
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="display text-3xl md:text-4xl lg:text-5xl text-white">{t('title')}</h2>
              <p className="mt-4 max-w-md text-navy-ice/85">{t('subtitle')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/consultation" icon="ArrowRight">
                  {t('startProject')}
                </Button>
                <a
                  href="/corporate-training"
                  className="btn btn-secondary !bg-white/10 !text-white !border-white/25"
                >
                  {t('requestTraining')}
                </a>
              </div>
              <Link
                href="/consultation"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:gap-2.5 transition-all"
              >
                <Icon name="Phone" size={15} /> {t('bookConsultation')}
              </Link>
            </div>

            <QuickInquiry />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickInquiry() {
  const t = useTranslations('finalCta');
  const tf = useTranslations('form');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          source: 'quick-inquiry',
          fullName: fd.get('name'),
          email: fd.get('email'),
          goal: fd.get('message'),
        }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="glass glass-strong rounded-glass p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan/20 text-cyan">
          <Icon name="Check" size={28} />
        </span>
        <p className="mt-3 font-bold text-white">{tf('success.title')}</p>
        <p className="mt-1 text-sm text-navy-ice/80">{tf('success.body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass glass-strong rounded-glass p-5">
      <p className="text-sm font-bold text-white">{t('formTitle')}</p>
      <div className="mt-3 flex flex-col gap-2.5">
        <input
          name="name"
          required
          placeholder={tf('fields.fullName')}
          aria-label={tf('fields.fullName')}
          className="rounded-[12px] border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-ice/60 outline-none focus:border-cyan"
        />
        <input
          name="email"
          type="email"
          required
          placeholder={tf('fields.email')}
          aria-label={tf('fields.email')}
          className="rounded-[12px] border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-ice/60 outline-none focus:border-cyan"
        />
        <textarea
          name="message"
          rows={3}
          required
          placeholder={tf('q2ph')}
          aria-label={tf('q2')}
          className="resize-none rounded-[12px] border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-ice/60 outline-none focus:border-cyan"
        />
        {state === 'error' && (
          <p className="text-xs text-red-200">{tf('error.body')}</p>
        )}
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn btn-primary w-full justify-center !bg-cyan !text-navy-deep disabled:opacity-70"
        >
          {state === 'loading' ? (
            <Icon name="Loader2" size={18} className="animate-spin" />
          ) : (
            <>
              {tf('submit')} <Icon name="Send" size={16} />
            </>
          )}
        </button>
        <p className="text-center text-[0.65rem] text-navy-ice/70">{t('formNote')}</p>
      </div>
    </form>
  );
}
