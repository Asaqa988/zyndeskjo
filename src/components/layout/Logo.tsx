import { siteConfig } from '@/config/site';

/** Zyndesk wordmark — glass "Z" glyph + name. Pure SVG/CSS, no image asset. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid place-items-center h-9 w-9 rounded-[11px] overflow-hidden">
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="zg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3E6C96" />
              <stop offset="1" stopColor="#102A43" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill="url(#zg)" />
          <path
            d="M12 13h16l-11 14h11"
            fill="none"
            stroke="#38D1E0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="font-extrabold tracking-tight text-lg text-ink leading-none">
          {siteConfig.shortName}
          <span className="text-navy-medium">.jo</span>
        </span>
      )}
    </span>
  );
}
