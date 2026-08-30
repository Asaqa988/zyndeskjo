import { Icon } from '@/components/ui/Icon';
import { pick } from '@/data/course/types';
import type { PitchBlock, PitchSection as Section } from '@/data/course-pitch';

/**
 * Renders one section of the course pitch.
 *
 * The content was written as briefs for images. Built as markup instead, each
 * shape earns its treatment from what it says: two things set against each
 * other get two columns with the weaker one visibly quieter, a sequence gets a
 * spine you can follow downward, an audience gets a card each.
 *
 * Nothing here is decorative numbering — a flow is numbered because the order
 * is the point, and a bullet list is not, because it isn't.
 */
export function PitchSection({ section, locale }: { section: Section; locale: string }) {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-start gap-3.5">
        <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-navy text-white">
          <Icon name={section.icon} size={20} />
        </span>
        <h2 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
          {pick(section.title, locale)}
        </h2>
      </header>

      <div className="flex flex-col gap-5">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} locale={locale} />
        ))}
      </div>

      {section.hook && (
        <p className="glass rounded-glass border-s-4 border-s-cyan px-5 py-4 text-base font-semibold leading-relaxed text-ink">
          {pick(section.hook, locale)}
        </p>
      )}
    </article>
  );
}

function Block({ block, locale }: { block: PitchBlock; locale: string }) {
  if (block.kind === 'text') {
    return (
      <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
        {pick(block.text, locale)}
      </p>
    );
  }

  if (block.kind === 'points') {
    return (
      <ul className="flex max-w-[68ch] flex-col gap-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-navy-medium">
            <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-cyan" />
            <span>{pick(item, locale)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'chips') {
    return (
      <ul className="flex flex-wrap gap-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="glass rounded-pill px-3.5 py-1.5 text-[13px] font-medium text-navy"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'compare') {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {block.sides.map((side, i) => {
          const strong = side.tone === 'strong';
          return (
            <div
              key={i}
              className={`flex flex-col gap-3 rounded-glass p-5 ${
                strong ? 'glass glass-strong ring-1 ring-cyan/30' : 'border border-navy-ice bg-white/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  name={strong ? 'Zap' : 'Minus'}
                  size={16}
                  className={strong ? 'text-cyan' : 'text-navy-soft'}
                />
                <p className={`text-sm font-bold ${strong ? 'text-ink' : 'text-navy-medium'}`}>
                  {pick(side.label, locale)}
                </p>
              </div>

              <ul className="flex flex-col gap-1.5">
                {side.items.map((item, j) => (
                  <li
                    key={j}
                    className={`text-[15px] leading-relaxed ${
                      strong ? 'text-ink' : 'text-navy-medium'
                    }`}
                  >
                    {pick(item, locale)}
                  </li>
                ))}
              </ul>

              {side.caption && (
                <p className="mt-auto pt-1 text-xs text-navy-soft">{pick(side.caption, locale)}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (block.kind === 'personas') {
    return (
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((p, i) => (
          <div key={i} className="glass flex flex-col gap-2 rounded-glass p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-navy-ice text-navy">
              <Icon name={p.icon} size={18} />
            </span>
            <p className="text-sm font-bold text-ink">{pick(p.label, locale)}</p>
            <p className="text-[14px] leading-relaxed text-navy-medium">{pick(p.text, locale)}</p>
          </div>
        ))}
      </div>
    );
  }

  // A sequence — numbered, because the order is the whole point.
  return (
    // The spine sits outside the list: <ol> may only contain <li>, and a
    // stranded <span> is both invalid and something a screen reader has to
    // reconcile mid-list.
    <div className="relative max-w-[46ch]">
      <span
        aria-hidden
        className="absolute bottom-3 start-[13px] top-3 w-px bg-gradient-to-b from-navy/40 to-cyan/40"
      />
      <ol className="flex flex-col gap-3 ps-8">
        {block.steps.map((step, i) => (
          <li key={i} className="relative text-[15px] font-medium leading-relaxed text-ink">
            <span
              aria-hidden
              className="absolute -start-8 top-0.5 inline-flex h-[27px] w-[27px] items-center justify-center rounded-full bg-navy text-[11px] font-bold tabular-nums text-white"
            >
              {i + 1}
            </span>
            {pick(step, locale)}
          </li>
        ))}
      </ol>
    </div>
  );
}
