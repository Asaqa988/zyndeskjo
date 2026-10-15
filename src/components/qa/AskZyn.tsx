'use client';

import { Icon } from '@/components/ui/Icon';
import { openAgent } from '@/components/agent/openAgent';
import { QA_ASK, QA_UI } from '@/data/qa-course';

/**
 * Puts the assistant where the questions arise.
 *
 * The launcher in the corner is easy to miss, and most hesitation before a
 * registration is a small factual question — price, date, "am I qualified".
 * Each chip opens Zyn and sends that question, so the visitor gets an answer
 * in one tap instead of facing an empty chat box.
 */
export function AskZyn({ lang }: { lang: 'en' | 'ar' }) {
  return (
    <div className="qa-card flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-navy text-white">
          <Icon name="Bot" size={24} />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">{QA_UI.askTitle[lang]}</h2>
          <p className="text-[15px] leading-relaxed text-navy-medium">{QA_UI.askSubtitle[lang]}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {QA_ASK.map((q) => (
          <button
            key={q.en}
            type="button"
            onClick={() => openAgent('chat', q[lang])}
            className="rounded-pill border border-navy-ice bg-offwhite px-4 py-2.5 text-sm font-medium text-navy transition hover:border-cyan hover:bg-white"
          >
            {q[lang]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => openAgent('chat')}
          className="inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-medium"
        >
          <Icon name="MessageCircle" size={16} />
          {QA_UI.askType[lang]}
        </button>
        <button
          type="button"
          onClick={() => openAgent('voice')}
          className="inline-flex items-center gap-2 rounded-pill border border-navy-ice px-5 py-2.5 text-sm font-bold text-navy transition hover:border-cyan"
        >
          <Icon name="Mic" size={16} />
          {QA_UI.askVoice[lang]}
        </button>
      </div>
    </div>
  );
}
