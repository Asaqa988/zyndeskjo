'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { siteConfig } from '@/config/site';

type State = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'phone' | 'email';

const PHONE = /^(?:\+?962|00962|0)?7[789]\d{7}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (raw: string) => raw.replace(/[\s()-]/g, '');

/**
 * The form that claims a seat.
 *
 * Three fields, because this is filled in on a phone, often during the lecture
 * itself, by someone who has just decided. Anything else can be asked later on
 * WhatsApp; nothing here is worth losing a registration over.
 *
 * Errors are shown per field and only after a submit attempt — scolding
 * someone mid-typing is the fastest way to make them close the tab.
 */
export function RegisterForm() {
  const t = useTranslations('pages.register.form');
  const locale = useLocale();

  const [values, setValues] = useState({ name: '', phone: '', email: '', note: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [state, setState] = useState<State>('idle');

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (field !== 'note') setErrors((prev) => ({ ...prev, [field]: false }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;

    const found: Partial<Record<Field, boolean>> = {
      name: values.name.trim().length < 2,
      phone: !PHONE.test(clean(values.phone)),
      email: !EMAIL.test(values.email.trim()),
    };
    setErrors(found);
    if (found.name || found.phone || found.email) return;

    setState('sending');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, locale, source: 'register' }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="glass glass-strong flex flex-col gap-4 rounded-glass border-s-4 border-s-[#1f9d55] p-7 sm:p-8">
        <div className="flex items-start gap-3">
          <Icon name="CircleCheck" size={26} className="mt-0.5 shrink-0 text-[#1f9d55]" />
          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-bold text-ink">{t('sentTitle')}</p>
            <p className="text-[15px] leading-relaxed text-navy-medium">{t('sentBody')}</p>
          </div>
        </div>
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-medium"
        >
          <Icon name="MessageCircle" size={16} />
          {t('sentWhatsapp')}
        </a>
      </div>
    );
  }

  const field = (name: Field, type: string, dir?: 'ltr') => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-bold text-ink">
        {t(`${name}Label`)}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        required
        value={values[name]}
        onChange={set(name)}
        placeholder={t(`${name}Placeholder`)}
        aria-invalid={errors[name] ? true : undefined}
        className={`rounded-[14px] border bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan ${
          errors[name] ? 'border-[#c0392b]' : 'border-navy-ice'
        }`}
      />
      {errors[name] && (
        <p className="text-[13px] font-medium text-[#c0392b]">{t(`${name}Error`)}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={submit}
      noValidate
      className="glass glass-strong flex flex-col gap-4 rounded-glass p-6 sm:p-8"
    >
      {field('name', 'text')}
      {field('phone', 'tel', 'ltr')}
      {field('email', 'email', 'ltr')}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="note" className="text-sm font-bold text-ink">
          {t('noteLabel')}
        </label>
        <input
          id="note"
          name="note"
          type="text"
          value={values.note}
          onChange={set('note')}
          placeholder={t('notePlaceholder')}
          className="rounded-[14px] border border-navy-ice bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-pill bg-navy px-6 py-3.5 text-base font-bold text-white transition hover:bg-navy-medium disabled:opacity-50"
      >
        {state === 'sending' ? (
          <Icon name="LoaderCircle" size={18} className="animate-spin" />
        ) : (
          <Icon name="Check" size={18} />
        )}
        {t('submit')}
      </button>

      <p className="text-xs leading-relaxed text-navy-soft">{t('note')}</p>

      {state === 'error' && (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-[#c0392b]">
          <Icon name="TriangleAlert" size={15} />
          {t('error')}
        </p>
      )}
    </form>
  );
}
