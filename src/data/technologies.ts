/**
 * "Technologies We Work With" — brand names are NOT translated.
 * Presented as tools we use, NOT official partnerships.
 * `group` is an i18n key under technologies.groups.<group>.
 */
export interface Technology {
  name: string;
  group: 'ai' | 'dev' | 'qa' | 'automation' | 'cloud';
}

export const technologies: Technology[] = [
  { name: 'OpenAI', group: 'ai' },
  { name: 'Claude', group: 'ai' },
  { name: 'Gemini', group: 'ai' },
  { name: 'Flutter', group: 'dev' },
  { name: 'React', group: 'dev' },
  { name: 'Next.js', group: 'dev' },
  { name: 'Python', group: 'dev' },
  { name: 'Selenium', group: 'qa' },
  { name: 'Playwright', group: 'qa' },
  { name: 'Appium', group: 'qa' },
  { name: 'Postman', group: 'qa' },
  { name: 'n8n', group: 'automation' },
  { name: 'Make', group: 'automation' },
  { name: 'Zapier', group: 'automation' },
  { name: 'Odoo', group: 'automation' },
  { name: 'Firebase', group: 'cloud' },
  { name: 'Google Cloud', group: 'cloud' },
  { name: 'Supabase', group: 'cloud' },
];
