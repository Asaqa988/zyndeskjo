import { testimonials } from '@/data/testimonials';

/**
 * The feedback wall.
 *
 * A column layout rather than a uniform grid: the screenshots are all
 * different heights, and equal boxes would either crop the message or leave
 * the short ones swimming in space. Columns let each be as tall as it is.
 *
 * The thumbnails are pre-rendered by scripts/optimise-testimonials.mjs and
 * served as plain files. Next's optimiser would convert each size on first
 * request, which measured six seconds per image on a cold container and
 * started over after every deploy — with 43 of them, the first visitor after
 * each release waited through all of it. These are bytes on disk instead.
 *
 * Hence the raw <picture> rather than next/image: there is nothing left to
 * optimise, and width/height are still set so the layout reserves the right
 * box before anything loads.
 *
 * Clicking opens the full-size JPEG, which is where the message is actually
 * readable.
 */
export function TestimonialGrid({ limit, label }: { limit?: number; label: string }) {
  const shown = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <ul className="columns-2 gap-3.5 md:columns-3 lg:columns-4 [&>li]:mb-3.5">
      {shown.map((t, i) => {
        const base = t.src.replace('/testimonials/', '/testimonials/thumb/').replace(/\.jpg$/, '');
        /** The thumbnail is 650 wide unless the source was smaller. */
        const w = Math.min(650, t.width);
        const h = Math.round((t.height / t.width) * w);

        return (
          <li key={t.src} className="break-inside-avoid">
            <a
              href={t.src}
              target="_blank"
              rel="noreferrer"
              className="glass block overflow-hidden rounded-glass p-1.5 transition hover:shadow-glass-lg"
            >
              <picture>
                <source srcSet={`${base}.avif`} type="image/avif" />
                <source srcSet={`${base}.webp`} type="image/webp" />
                <img
                  src={`${base}.webp`}
                  alt={`${label} ${i + 1}`}
                  width={w}
                  height={h}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full rounded-[12px]"
                />
              </picture>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
