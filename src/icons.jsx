// Inline SVG icons (Lucide-style) — no emoji icons, per UI/UX Pro Max checklist
const I = ({ children, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export const BotIcon = () => <I><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M8 4h8"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></I>
export const HeadsetIcon = () => <I><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/><path d="M21 18v1a2 2 0 0 1-2 2h-5"/></I>
export const ZapIcon = () => <I><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></I>
export const CodeIcon = () => <I><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></I>
export const LayersIcon = () => <I><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></I>
export const CloudIcon = () => <I><path d="M17.5 19a4.5 4.5 0 1 0-.42-8.98 6 6 0 1 0-11.06 3.1A4 4 0 0 0 7 19h10.5Z"/></I>
export const ChartIcon = () => <I><path d="M3 3v18h18"/><path d="M7 15l4-6 4 3 5-8"/></I>
export const GradIcon = () => <I><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></I>
export const PinIcon = () => <I><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></I>
export const PhoneIcon = () => <I><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></I>
export const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
  </svg>
)
export const ArrowIcon = () => <I size={18}><path d="M5 12h14M13 6l6 6-6 6"/></I>
export const SendIcon = () => <I size={18}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></I>

export const Logo = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="zg" x1="0" y1="0" x2="40" y2="40">
        <stop offset="0" stopColor="#22d3ee"/><stop offset="0.6" stopColor="#8b5cf6"/><stop offset="1" stopColor="#e879f9"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="36" height="36" rx="11" stroke="url(#zg)" strokeWidth="2.5"/>
    <path d="M12 13h16l-16 14h16" stroke="url(#zg)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
