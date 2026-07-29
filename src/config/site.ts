/**
 * ─────────────────────────────────────────────────────────────
 * CENTRAL COMPANY CONFIG — edit real company details HERE only.
 * Every component/footer/contact block reads from this file.
 * Values wrapped in [BRACKETS] are PLACEHOLDERS to replace before launch.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: 'Zyndesk Jo',
  shortName: 'Zyndesk',
  /** Used for <title> templates, schema, OG. */
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zyndeskjo.com',
  chatMascot: 'Zyn',

  contact: {
    phoneDisplay: '+962 7 9770 0235',
    phoneHref: '+962797700235',
    // WhatsApp — replace if different from the main phone number.
    whatsappDisplay: '+962 7 9770 0235',
    whatsappHref: '962797700235',
    email: '[hello@zyndeskjo.com]', // PLACEHOLDER — confirm the real inbox (hello@ / info@ / contact@)
    addressLine: 'University Street, Amman, Jordan',
    addressAr: 'شارع الجامعة، عمّان، الأردن',
    city: 'Amman',
    country: 'Jordan',
    countryCode: 'JO',
    mapQuery: 'University Street, Amman, Jordan',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/careerak1/',
    // PLACEHOLDERS — replace with real profiles or remove.
    instagram: '[https://instagram.com/zyndesk]',
    facebook: '[https://facebook.com/zyndesk]',
    x: '[https://x.com/zyndesk]',
    youtube: '[https://youtube.com/@zyndesk]',
  },

  /** Founding year — used in copyright. */
  since: 2024,
} as const;

export type SiteConfig = typeof siteConfig;
