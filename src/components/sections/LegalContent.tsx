import { getTranslations } from 'next-intl/server';
import { Icon } from '@/components/ui/Icon';

/** Renders a legal document (privacy/terms) from i18n keys under pages.legal.<doc>. */
export async function LegalContent({ doc }: { doc: 'privacy' | 'terms' }) {
  const t = await getTranslations(`pages.legal.${doc}`);
  const tl = await getTranslations('pages.legal');
  const sectionKeys = Object.keys(t.raw('sections') as Record<string, unknown>);

  return (
    <section className="pb-20">
      <div className="container-z max-w-3xl">
        <div className="glass glass-strong rounded-glass p-6 md:p-10">
          <p className="text-sm text-[var(--text-dim)]">{tl('lastUpdated')}: 2026-07-28</p>
          <p className="mt-6 leading-relaxed text-[var(--text-dim)]">{t('intro')}</p>

          <div className="mt-8 flex flex-col gap-7">
            {sectionKeys.map((key, i) => (
              <div key={key}>
                <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
                  <span className="text-navy-soft">{String(i + 1).padStart(2, '0')}</span>
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="mt-2 leading-relaxed text-[var(--text-dim)]">{t(`sections.${key}.body`)}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 flex items-start gap-2 rounded-[14px] border border-dashed border-navy-soft/40 bg-white/40 p-4 text-xs text-[var(--text-dim)]">
            <Icon name="Lock" size={14} className="mt-0.5 shrink-0 text-navy-medium" />
            {tl('placeholderNote')}
          </p>
        </div>
      </div>
    </section>
  );
}
