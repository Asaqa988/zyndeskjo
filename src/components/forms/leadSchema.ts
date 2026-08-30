import { z } from 'zod';

/** Zod schema for the multi-step lead form. Messages are i18n keys. */
export const leadSchema = z.object({
  needs: z.array(z.string()).min(1, 'form.validation.selectNeed'),
  // Any answer the person wants to give. The old ten-character floor
  // rejected "أتوميشن" — one word that says exactly what they came for, and
  // shorter in Arabic than the same answer in English would have been.
  goal: z.string().trim().min(1, 'form.validation.goal'),
  clientType: z.enum(['individual', 'company']),
  companyName: z.string().optional(),
  timeline: z.string().min(1, 'form.validation.required'),
  budget: z.string().min(1, 'form.validation.required'),
  contactMethod: z.enum(['email', 'phone', 'whatsapp']),
  fullName: z.string().min(2, 'form.validation.required'),
  email: z.string().email('form.validation.email'),
  phone: z.string().min(6, 'form.validation.phone'),
  whatsapp: z.string().optional(),
  country: z.string().min(2, 'form.validation.required'),
  consent: z.literal(true, { errorMap: () => ({ message: 'form.validation.consent' }) }),
  // Honeypot — must stay empty (basic spam protection).
  company_website: z.string().max(0).optional(),
});

export type LeadForm = z.infer<typeof leadSchema>;

export const stepFields: (keyof LeadForm)[][] = [
  ['needs'],
  ['goal'],
  ['clientType', 'companyName', 'timeline', 'budget', 'contactMethod'],
  ['fullName', 'email', 'phone', 'whatsapp', 'country', 'consent'],
];
