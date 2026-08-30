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
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zyndeskjo.com',
  chatMascot: 'Zyn',

  contact: {
    phoneDisplay: '+962 7 9770 0235',
    phoneHref: '+962797700235',
    // WhatsApp — replace if different from the main phone number.
    whatsappDisplay: '+962 7 9770 0235',
    whatsappHref: '962797700235',
    email: 'asaqa001@gmail.com',
    addressLine: 'University Street, Amman, Jordan',
    addressAr: 'شارع الجامعة، عمّان، الأردن',
    city: 'Amman',
    country: 'Jordan',
    countryCode: 'JO',
    mapQuery: 'University Street, Amman, Jordan',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/abedalraheem-alsaqqa/',
    instagram: 'https://www.instagram.com/abedalraheem_alsaqqa/',
    facebook: 'https://www.facebook.com/aboud.80',
    // Still placeholders — the footer hides these until they are real.
    // Bracketed values render as dead links, so isLive() below filters them.
    x: '[https://x.com/zyndesk]',
    youtube: '[https://youtube.com/@zyndesk]',
  },

  /** Founding year — used in copyright. */
  since: 2024,
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Whether a configured value is real or still a [BRACKETED] placeholder.
 *
 * A placeholder that reaches the page becomes a dead link or a mailto to a
 * nonexistent inbox — worse than showing nothing, because a visitor clicks it
 * and concludes the business does not answer. Anything rendering a value from
 * this file should gate on it.
 */
export function isLive(value: string): boolean {
  return !value.startsWith('[');
}
