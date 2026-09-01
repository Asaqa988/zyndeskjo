'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { CLINIC, CLINIC_SERVICES } from '@/data/examples/clinic';

type Msg = { role: 'user' | 'assistant'; content: string };
type Chat = 'idle' | 'thinking' | 'error';
type Book = 'closed' | 'open' | 'sending' | 'sent' | 'error';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The demo itself: ask the clinic anything, then book.
 *
 * The booking panel is a button the visitor can press at any time rather than
 * something the model has to decide to offer. Gating it on intent detection
 * would mean the most important part of the demonstration depends on the model
 * saying the right thing in front of an audience.
 */
export function ClinicDemo() {
  const t = useTranslations('pages.examples.clinic');

  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: t('greeting', { doctor: CLINIC.doctor }) },
  ]);
  const [draft, setDraft] = useState('');
  const [chat, setChat] = useState<Chat>('idle');

  const [book, setBook] = useState<Book>('closed');
  const [form, setForm] = useState<{ name: string; email: string; service: string; note: string }>({
    name: '',
    email: '',
    service: CLINIC_SERVICES[0].name,
    note: '',
  });
  const [bookErr, setBookErr] = useState<'name' | 'email' | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [messages, chat]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || chat === 'thinking') return;

    const next = [...messages, { role: 'user' as const, content: question }];
    setMessages(next);
    setDraft('');
    setChat('thinking');

    try {
      const res = await fetch('/api/examples/clinic', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const json = (await res.json()) as { ok?: boolean; reply?: string };
      if (!res.ok || !json.ok || !json.reply) throw new Error('no reply');
      setMessages((m) => [...m, { role: 'assistant', content: json.reply! }]);
      setChat('idle');
    } catch {
      setChat('error');
    }
  }

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (book === 'sending') return;

    if (form.name.trim().length < 2) return setBookErr('name');
    if (!EMAIL.test(form.email.trim())) return setBookErr('email');
    setBookErr(null);
    setBook('sending');

    try {
      const res = await fetch('/api/examples/clinic/book', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      setBook(res.ok ? 'sent' : 'error');
    } catch {
      setBook('error');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="glass glass-strong flex flex-col overflow-hidden rounded-glass">
        {/* The clinic's own identity, so the demo looks like what it is selling. */}
        <div className="flex items-center gap-3 border-b border-white/50 bg-white/40 px-5 py-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#146b6b] text-white">
            <Icon name="Sparkles" size={18} />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-ink">{CLINIC.clinic}</span>
            <span className="truncate text-xs text-navy-medium">{t('subtitle')}</span>
          </div>
        </div>

        <div className="flex max-h-[420px] min-h-[280px] flex-col gap-3 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] whitespace-pre-wrap rounded-[16px] px-4 py-3 text-[14.5px] leading-relaxed ${
                m.role === 'user'
                  ? 'self-start bg-navy text-white'
                  : 'self-end border border-navy-ice bg-white/80 text-ink'
              }`}
            >
              {m.content}
            </div>
          ))}

          {chat === 'thinking' && (
            <div className="self-end rounded-[16px] border border-navy-ice bg-white/80 px-4 py-3">
              <Icon name="LoaderCircle" size={16} className="animate-spin text-navy-medium" />
            </div>
          )}
          {chat === 'error' && (
            <p className="self-end text-sm font-medium text-[#c0392b]">{t('chatError')}</p>
          )}
          <div ref={endRef} />
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-4">
            {['q1', 'q2', 'q3'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => ask(t(`starters.${k}`))}
                className="rounded-pill border border-navy-ice bg-white/70 px-3.5 py-2 text-[13px] font-medium text-navy transition hover:bg-white"
              >
                {t(`starters.${k}`)}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
          }}
          className="flex gap-2.5 border-t border-white/50 bg-white/40 px-5 py-4"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('placeholder')}
            className="min-w-0 flex-1 rounded-pill border border-navy-ice bg-white/80 px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
          />
          <button
            type="submit"
            disabled={chat === 'thinking'}
            aria-label={t('send')}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-navy px-4 text-white transition hover:bg-navy-medium disabled:opacity-50"
          >
            <Icon name="Send" size={16} />
          </button>
        </form>
      </div>

      {book === 'sent' ? (
        <div className="glass glass-strong flex items-start gap-3 rounded-glass border-s-4 border-s-[#1f9d55] p-6">
          <Icon name="CircleCheck" size={22} className="mt-0.5 shrink-0 text-[#1f9d55]" />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-ink">{t('booking.sentTitle')}</p>
            <p className="text-sm leading-relaxed text-navy-medium">
              {t('booking.sentBody', { email: form.email })}
            </p>
          </div>
        </div>
      ) : book === 'closed' ? (
        <button
          type="button"
          onClick={() => setBook('open')}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-[#146b6b] px-6 py-3.5 text-base font-bold text-white transition hover:bg-[#0f5352]"
        >
          <Icon name="CalendarDays" size={18} />
          {t('booking.open')}
        </button>
      ) : (
        <form onSubmit={submitBooking} noValidate className="glass glass-strong flex flex-col gap-3.5 rounded-glass p-6">
          <p className="text-base font-bold text-ink">{t('booking.title')}</p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="c-name" className="text-sm font-semibold text-ink">{t('booking.name')}</label>
            <input
              id="c-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`rounded-[14px] border bg-white/80 px-4 py-3 text-[15px] text-ink outline-none focus:border-cyan ${bookErr === 'name' ? 'border-[#c0392b]' : 'border-navy-ice'}`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="c-email" className="text-sm font-semibold text-ink">{t('booking.email')}</label>
            <input
              id="c-email"
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`rounded-[14px] border bg-white/80 px-4 py-3 text-[15px] text-ink outline-none focus:border-cyan ${bookErr === 'email' ? 'border-[#c0392b]' : 'border-navy-ice'}`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="c-service" className="text-sm font-semibold text-ink">{t('booking.service')}</label>
            <select
              id="c-service"
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="rounded-[14px] border border-navy-ice bg-white/80 px-4 py-3 text-[15px] text-ink outline-none focus:border-cyan"
            >
              {CLINIC_SERVICES.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={book === 'sending'}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-pill bg-[#146b6b] px-6 py-3.5 text-base font-bold text-white transition hover:bg-[#0f5352] disabled:opacity-50"
          >
            {book === 'sending' ? (
              <Icon name="LoaderCircle" size={18} className="animate-spin" />
            ) : (
              <Icon name="Check" size={18} />
            )}
            {t('booking.submit')}
          </button>

          <p className="text-xs leading-relaxed text-navy-soft">{t('booking.note')}</p>

          {book === 'error' && (
            <p className="text-sm font-medium text-[#c0392b]">{t('booking.error')}</p>
          )}
        </form>
      )}
    </div>
  );
}
