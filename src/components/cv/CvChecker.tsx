'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { CourseBridge } from './CourseBridge';
import type { CvAnalysis } from '@/lib/cvAnalysis';

type Status = 'idle' | 'working' | 'done' | 'error';

/**
 * The free CV check.
 *
 * A PDF upload or pasted text, a job description, and a match report. The
 * report is shown to everyone without asking for anything first: gating it
 * behind an email would stop the thing being shared, and being shared is the
 * whole point of a free tool.
 */
export function CvChecker() {
  const t = useTranslations('pages.cvCheck');
  const locale = useLocale();

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null);
  const [fileName, setFileName] = useState('');
  const [cvText, setCvText] = useState('');
  const [jd, setJd] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const file = fileRef.current?.files?.[0];
  const ready = (fileName || cvText.trim().length > 200) && jd.trim().length > 60;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || status === 'working') return;

    setStatus('working');
    setError('');
    setAnalysis(null);

    const body = new FormData();
    body.set('jobDescription', jd);
    body.set('locale', locale);
    if (file) body.set('file', file);
    else body.set('cv', cvText);

    try {
      const res = await fetch('/api/cv', { method: 'POST', body });
      const data = (await res.json()) as { ok: boolean; analysis?: CvAnalysis; error?: string };

      if (!data.ok) {
        setError(t(`errors.${data.error ?? 'analysis_failed'}`));
        setStatus('error');
        return;
      }

      setAnalysis(data.analysis ?? null);
      setStatus('done');
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    } catch {
      setError(t('errors.network'));
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={submit} className="glass glass-strong flex flex-col gap-6 rounded-glass p-6 sm:p-8">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold text-ink">{t('cvLabel')}</label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-medium"
            >
              <Icon name="Upload" size={16} />
              {t('choosePdf')}
            </button>

            {fileName && (
              <span className="inline-flex items-center gap-2 text-sm text-navy-medium">
                <Icon name="FileText" size={15} className="text-cyan" />
                {fileName}
                <button
                  type="button"
                  onClick={() => {
                    setFileName('');
                    if (fileRef.current) fileRef.current.value = '';
                  }}
                  className="text-navy-soft transition hover:text-navy"
                  aria-label={t('removeFile')}
                >
                  <Icon name="X" size={15} />
                </button>
              </span>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />

          {!fileName && (
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={6}
              placeholder={t('cvPlaceholder')}
              className="mt-1 w-full rounded-glass border border-navy-ice bg-white/70 p-4 text-sm leading-relaxed text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
            />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="jd" className="text-sm font-bold text-ink">
            {t('jdLabel')}
          </label>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={6}
            placeholder={t('jdPlaceholder')}
            className="w-full rounded-glass border border-navy-ice bg-white/70 p-4 text-sm leading-relaxed text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={!ready || status === 'working'}
            className="inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'working' ? (
              <>
                <Icon name="LoaderCircle" size={16} className="animate-spin" />
                {t('working')}
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={16} />
                {t('submit')}
              </>
            )}
          </button>

          <p className="text-xs text-navy-soft">{t('privacy')}</p>
        </div>

        {status === 'error' && (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#c0392b]">
            <Icon name="TriangleAlert" size={15} />
            {error}
          </p>
        )}
      </form>

      <AnimatePresence>
        {status === 'done' && analysis && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <Report analysis={analysis} t={t} />
            <CourseBridge analysis={analysis} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Report({
  analysis,
  t,
}: {
  analysis: CvAnalysis;
  t: ReturnType<typeof useTranslations>;
}) {
  const { score } = analysis;
  // Green above a genuine match, amber where it needs work, red where the CV
  // is not making the case at all. The colour has to agree with the number.
  const tone = score >= 75 ? '#1f9d55' : score >= 50 ? '#c98a00' : '#c0392b';

  const bars: [string, number][] = [
    [t('breakdown.skills'), analysis.breakdown.skills],
    [t('breakdown.experience'), analysis.breakdown.experience],
    [t('breakdown.education'), analysis.breakdown.education],
    [t('breakdown.keywords'), analysis.breakdown.keywords],
  ];

  return (
    <>
      <div className="glass glass-strong grid gap-6 rounded-glass p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <div className="flex flex-col items-center gap-1">
          <span className="text-5xl font-bold tabular-nums" style={{ color: tone }}>
            {score}%
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-soft">
            {t('match')}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[15px] font-medium leading-relaxed text-ink">{analysis.verdict}</p>

          <ul className="flex flex-col gap-2">
            {bars.map(([label, value]) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs text-navy-medium">{label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-ice">
                  <span
                    className="block h-full rounded-full bg-navy"
                    style={{ width: `${value}%` }}
                  />
                </span>
                <span className="w-9 shrink-0 text-end text-xs font-semibold tabular-nums text-ink">
                  {value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel icon="Check" tint="text-[#1f9d55]" title={t('strengths')} items={analysis.strengths} />
        <Panel icon="TriangleAlert" tint="text-[#c98a00]" title={t('gaps')} items={analysis.gaps} />
      </div>

      {analysis.missingKeywords.length > 0 && (
        <div className="glass flex flex-col gap-3 rounded-glass p-6">
          <h3 className="text-sm font-bold text-ink">{t('missingKeywords')}</h3>
          <ul className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((k) => (
              <li
                key={k}
                className="rounded-pill border border-navy-ice bg-white/60 px-3 py-1.5 text-[13px] font-medium text-navy"
              >
                {k}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Panel
        icon="Lightbulb"
        tint="text-cyan"
        title={t('recommendations')}
        items={analysis.recommendations}
        wide
      />
    </>
  );
}

function Panel({
  icon,
  tint,
  title,
  items,
  wide,
}: {
  icon: string;
  tint: string;
  title: string;
  items: string[];
  wide?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className={`glass flex flex-col gap-3 rounded-glass p-6 ${wide ? '' : 'h-full'}`}>
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-navy-medium">
            <Icon name={icon} size={16} className={`mt-0.5 shrink-0 ${tint}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
