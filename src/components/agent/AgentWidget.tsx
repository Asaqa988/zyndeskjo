'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Mic, PhoneOff, Send, X } from 'lucide-react';
import { useVoiceCall } from './useVoiceCall';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Floating assistant — text chat plus a live voice call.
 *
 * Sits above the WhatsApp button (which owns bottom-5) so the two never
 * overlap. Uses logical inset properties so it flips correctly in Arabic.
 */
export function AgentWidget() {
  const t = useTranslations('agent');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const voice = useVoiceCall(locale);

  // Keep the newest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, voice.transcripts]);

  // Never leave a call running when the panel closes.
  useEffect(() => {
    if (!open && voice.status !== 'idle') voice.hangUp();
  }, [open, voice]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;

    const history = [...messages, { role: 'user' as const, content: text }];
    setMessages(history);
    setDraft('');
    setSending(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history, locale }),
      });

      if (!res.ok || !res.body) throw new Error(String(res.status));

      // Open an empty assistant bubble and fill it as tokens arrive.
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const delta = (JSON.parse(payload) as {
              choices?: { delta?: { content?: string } }[];
            }).choices?.[0]?.delta?.content;
            if (!delta) continue;
            setMessages((m) => {
              const next = [...m];
              next[next.length - 1] = {
                role: 'assistant',
                content: next[next.length - 1].content + delta,
              };
              return next;
            });
          } catch {
            /* ignore partial frames */
          }
        }
      }
    } catch (err) {
      console.error('[agent] chat failed:', err);
      setMessages((m) => [...m, { role: 'assistant', content: t('error') }]);
    } finally {
      setSending(false);
    }
  }, [draft, sending, messages, locale, t]);

  const shown: Message[] = mode === 'voice' ? voice.transcripts : messages;
  /** "thinking" is still mid-call — the composer stays hidden and hang-up stays shown. */
  const inCall = voice.status === 'live' || voice.status === 'thinking';

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('open')}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed z-40 bottom-[5.5rem] inline-flex items-center gap-2 rounded-pill bg-navy px-4 py-3 text-white shadow-glass-lg hover:bg-navy-medium"
        style={{ insetInlineEnd: '1.25rem' }}
      >
        {open ? <X size={22} aria-hidden /> : <Bot size={22} aria-hidden />}
        <span className="hidden sm:inline text-sm font-semibold">{t('label')}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t('label')}
            dir={isRtl ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed z-40 bottom-[9.5rem] flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-glass border border-white/40 bg-white/85 shadow-glass-lg backdrop-blur-glass"
            style={{ insetInlineEnd: '1.25rem' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-navy-ice bg-navy px-4 py-3 text-white">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{t('title')}</p>
                <p className="truncate text-xs text-navy-ice">{t('subtitle')}</p>
              </div>

              {inCall ? (
                <button
                  type="button"
                  onClick={() => {
                    voice.hangUp();
                    setMode('chat');
                  }}
                  aria-label={t('hangUp')}
                  className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-red-500 px-3 py-1.5 text-xs font-semibold hover:brightness-110"
                >
                  <PhoneOff size={14} aria-hidden />
                  {t('hangUp')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode('voice');
                    void voice.call();
                  }}
                  disabled={voice.status === 'connecting'}
                  aria-label={t('startCall')}
                  className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-cyan px-3 py-1.5 text-xs font-semibold text-ink hover:brightness-105 disabled:opacity-60"
                >
                  <Mic size={14} aria-hidden />
                  {voice.status === 'connecting' ? t('connecting') : t('startCall')}
                </button>
              )}
            </div>

            {/* Conversation */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {shown.length === 0 && (
                <p className="pt-6 text-center text-sm text-navy-medium">
                  {mode === 'voice' && inCall ? t('listening') : t('greeting')}
                </p>
              )}

              {shown.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-glass px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ms-auto bg-navy text-white'
                      : 'me-auto bg-navy-ice text-ink'
                  }`}
                >
                  {m.content || '…'}
                </div>
              ))}

              {voice.error && (
                <p className="text-center text-xs text-red-600">
                  {voice.error === 'mic_denied' ? t('micDenied') : t('callFailed')}
                </p>
              )}
            </div>

            {/* Composer — hidden while on a call */}
            {!inCall && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMode('chat');
                  void send();
                }}
                className="flex items-center gap-2 border-t border-navy-ice px-3 py-2"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('placeholder')}
                  aria-label={t('placeholder')}
                  className="min-w-0 flex-1 rounded-pill bg-offwhite px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-cyan"
                />
                <button
                  type="submit"
                  disabled={sending || !draft.trim()}
                  aria-label={t('send')}
                  className="inline-flex shrink-0 items-center justify-center rounded-pill bg-navy p-2 text-white hover:bg-navy-medium disabled:opacity-50"
                >
                  <Send size={16} aria-hidden className={isRtl ? 'scale-x-[-1]' : undefined} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
