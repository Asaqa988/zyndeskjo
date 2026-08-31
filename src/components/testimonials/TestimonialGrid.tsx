import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

/**
 * The feedback wall.
 *
 * A masonry-ish column layout rather than a uniform grid: the screenshots are
 * all different heights, and forcing them into equal boxes would either crop
 * the message or leave the short ones swimming in space. Columns let each one
 * be exactly as tall as it is.
 *
 * Each opens at full size on click, because at grid scale the Arabic is
 * readable enough to be believed but not to be read.
 */
export function TestimonialGrid({ limit, label }: { limit?: number; label: string }) {
  const shown = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <ul className="columns-2 gap-3.5 md:columns-3 lg:columns-4 [&>li]:mb-3.5">
      {shown.map((t, i) => (
        <li key={t.src} className="break-inside-avoid">
          <a
            href={t.src}
            target="_blank"
            rel="noreferrer"
            className="glass block overflow-hidden rounded-glass p-1.5 transition hover:shadow-glass-lg"
          >
            <Image
              src={t.src}
              alt={`${label} ${i + 1}`}
              width={t.width}
              height={t.height}
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="h-auto w-full rounded-[12px]"
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
