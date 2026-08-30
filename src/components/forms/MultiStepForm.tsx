'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { leadSchema, stepFields, type LeadForm } from './leadSchema';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';
import { trackLead } from '@/lib/metaPixel';
import { gaLead } from '@/lib/gtag';

const NEEDS = ['ai', 'automation', 'website', 'mobile', 'qa', 'training', 'marketing', 'chatbot', 'other'];
const STEP_KEYS = ['need', 'goal', 'details', 'contact'] as const;

export function MultiStepForm({ defaultNeed }: { defaultNeed?: string }) {
  const t = useTranslations('form');
  const tRoot = useTranslations();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    control,
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
    defaultValues: {
      needs: defaultNeed ? [defaultNeed] : [],
      goal: '',
      clientType: 'company',
      timeline: '',
      budget: '',
      contactMethod: 'email',
      fullName: '',
      email: '',
      phone: '',
      country: '',
      company_website: '',
    },
  });

  const clientType = watch('clientType');
  const total = STEP_KEYS.length;

  async function next() {
    const valid = await trigger(stepFields[step] as (keyof LeadForm)[]);
    if (valid) setStep((s) => Math.min(s + 1, total - 1));
  }

  async function onSubmit(data: LeadForm) {
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ source: 'multi-step', ...data }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) {
        trackLead({ content_name: 'Contact form', source: 'multi-step' });
        gaLead({ form: 'multi-step' });
      }
    } catch {
      setStatus('error');
    }
  }

  const err = (name: keyof LeadForm) => {
    const e = errors[name];
    // The schema stores absolute keys ("form.validation.email"), so these are
    // looked up from the root. Using the `form`-scoped `t` here asked for
    // form.form.validation.* and every message rendered as its own raw key.
    return e?.message ? tRoot(e.message as string) : null;
  };

  if (status === 'success') {
    return <ResultState kind="success" />;
  }

  return (
    <div className="glass glass-strong glass-sheen rounded-glass p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-dim)]">
          <span>{t('stepOf', { current: step + 1, total })}</span>
          <span>{t(`steps.${STEP_KEYS[step]}`)}</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {STEP_KEYS.map((k, i) => (
            <div key={k} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-navy-medium to-cyan"
                initial={false}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot (hidden from users) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute h-0 w-0 opacity-0"
          {...register('company_website')}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 1 — needs */}
            {step === 0 && (
              <fieldset>
                <legend className="text-lg font-bold text-ink">{t('q1')}</legend>
                <Controller
                  control={control}
                  name="needs"
                  render={({ field }) => (
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {NEEDS.map((n) => {
                        const on = field.value?.includes(n);
                        return (
                          <button
                            type="button"
                            key={n}
                            aria-pressed={on}
                            onClick={() =>
                              field.onChange(
                                on ? field.value.filter((v) => v !== n) : [...(field.value ?? []), n]
                              )
                            }
                            className={`glass rounded-[14px] p-3 text-sm font-semibold transition-all ${
                              on ? 'ring-2 ring-cyan glass-strong text-navy' : 'text-[var(--text-dim)] hover:text-navy'
                            }`}
                          >
                            {t(`needs.${n}`)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                <FieldError msg={err('needs')} />
              </fieldset>
            )}

            {/* STEP 2 — goal */}
            {step === 1 && (
              <div>
                <label htmlFor="goal" className="text-lg font-bold text-ink">
                  {t('q2')}
                </label>
                <textarea
                  id="goal"
                  rows={6}
                  {...register('goal')}
                  placeholder={t('q2ph')}
                  className="mt-4 w-full resize-none rounded-[14px] border border-[var(--glass-border)] bg-white/60 px-4 py-3 text-sm outline-none focus:border-cyan"
                />
                <FieldError msg={err('goal')} />
              </div>
            )}

            {/* STEP 3 — details */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-lg font-bold text-ink">{t('q3')}</p>
                <div>
                  <span className="text-sm font-semibold text-ink">{t('fields.type')}</span>
                  <div className="mt-2 flex gap-2">
                    {(['individual', 'company'] as const).map((ct) => (
                      <label
                        key={ct}
                        className={`chip cursor-pointer ${clientType === ct ? 'ring-2 ring-cyan' : ''}`}
                      >
                        <input type="radio" value={ct} {...register('clientType')} className="sr-only" />
                        {t(`fields.${ct}`)}
                      </label>
                    ))}
                  </div>
                </div>
                {clientType === 'company' && (
                  <Field label={t('fields.companyName')} htmlFor="companyName">
                    <input id="companyName" {...register('companyName')} className="z-input" />
                  </Field>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t('fields.timeline')} htmlFor="timeline" error={err('timeline')}>
                    <select id="timeline" {...register('timeline')} className="z-input">
                      <option value="">—</option>
                      {['asap', '1-3', '3-6', 'flexible'].map((k) => (
                        <option key={k} value={k}>{t(`timelines.${k}`)}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t('fields.budget')} htmlFor="budget" error={err('budget')}>
                    <select id="budget" {...register('budget')} className="z-input">
                      <option value="">—</option>
                      {['under5', '5-15', '15-40', 'over40', 'unsure'].map((k) => (
                        <option key={k} value={k}>{t(`budgets.${k}`)}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label={t('fields.contactMethod')} htmlFor="contactMethod">
                  <select id="contactMethod" {...register('contactMethod')} className="z-input">
                    {['email', 'phone', 'whatsapp'].map((k) => (
                      <option key={k} value={k}>{t(`methods.${k}`)}</option>
                    ))}
                  </select>
                </Field>
              </div>
            )}

            {/* STEP 4 — contact */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-lg font-bold text-ink">{t('q4')}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t('fields.fullName')} htmlFor="fullName" error={err('fullName')}>
                    <input id="fullName" {...register('fullName')} className="z-input" autoComplete="name" />
                  </Field>
                  <Field label={t('fields.email')} htmlFor="email" error={err('email')}>
                    <input id="email" type="email" {...register('email')} className="z-input" autoComplete="email" />
                  </Field>
                  <Field label={t('fields.phone')} htmlFor="phone" error={err('phone')}>
                    <input id="phone" type="tel" {...register('phone')} className="z-input tel" autoComplete="tel" />
                  </Field>
                  <Field label={t('fields.whatsapp')} htmlFor="whatsapp">
                    <input id="whatsapp" type="tel" {...register('whatsapp')} className="z-input tel" />
                  </Field>
                  <Field label={t('fields.country')} htmlFor="country" error={err('country')}>
                    <input id="country" {...register('country')} className="z-input" autoComplete="country-name" />
                  </Field>
                </div>
                <label className="flex items-start gap-2.5 text-sm text-[var(--text-dim)]">
                  <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 accent-[var(--cyan)]" />
                  <span>{t('consent')}</span>
                </label>
                <FieldError msg={err('consent')} />
                <p className="flex items-center gap-1.5 text-xs text-[var(--text-dim)]">
                  <Icon name="Lock" size={13} /> {t('spam')}
                </p>
                {status === 'error' && (
                  <div className="rounded-[12px] border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                    <strong>{t('error.title')}</strong> — {t('error.body')}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="btn btn-secondary disabled:opacity-40"
          >
            <Icon name="ArrowLeft" size={16} className="rtl:rotate-180" /> {t('back')}
          </button>
          {step < total - 1 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              {t('next')} <Icon name="ArrowRight" size={16} className="rtl:rotate-180" />
            </button>
          ) : (
            <button type="submit" disabled={status === 'loading'} className="btn btn-primary disabled:opacity-70">
              {status === 'loading' ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <>
                  {t('submit')} <Icon name="Send" size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      <FieldError msg={error} />
    </div>
  );
}

function FieldError({ msg }: { msg?: string | null }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
      <Icon name="X" size={13} /> {msg}
    </p>
  );
}

function ResultState({ kind }: { kind: 'success' }) {
  const t = useTranslations('form');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass glass-strong rounded-glass p-10 text-center"
    >
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan/15 text-cyan">
        <Icon name="CheckCircle2" size={34} />
      </span>
      <h3 className="mt-4 text-xl font-bold text-ink">{t('success.title')}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-dim)]">{t('success.body')}</p>
      <Link href="/" className="btn btn-secondary mt-6">
        <Icon name="ArrowLeft" size={16} className="rtl:rotate-180" /> {t('back')}
      </Link>
    </motion.div>
  );
}
