import type { Config } from 'tailwindcss';

/**
 * Zyndesk design tokens — light navy-blue glassmorphism identity.
 * Raw color values live here AND as CSS custom properties in globals.css.
 * Change a brand color in ONE place: update the hex here and the matching
 * --token in globals.css (they are intentionally mirrored for runtime theming).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#294C73', // primary light navy
          deep: '#102A43', // deep navy (backgrounds)
          medium: '#3E6C96', // medium blue
          soft: '#7CA6C8', // soft blue
          ice: '#DCECF7', // ice blue
        },
        ink: '#0D1B2A', // dark text
        offwhite: '#F5F9FC',
        cyan: '#38D1E0', // subtle interactive accent
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        glass: '20px',
        pill: '999px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(16, 42, 67, 0.18)',
        'glass-lg': '0 24px 60px rgba(16, 42, 67, 0.28)',
        glow: '0 0 0 1px rgba(56, 209, 224, 0.4), 0 0 24px rgba(56, 209, 224, 0.25)',
      },
      backdropBlur: {
        glass: '16px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-node': {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-node': 'pulse-node 3s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
