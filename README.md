# Zyndesk Jo

A premium, fully bilingual (English / Arabic) corporate website for **Zyndesk** — an Amman-based company delivering AI, automation, software development, QA testing, marketing, and training services. The site pairs a glassmorphism visual language with smooth motion and a conversion-focused, multi-step lead form.

**Tagline:** Build Smarter. Automate Faster. Grow Without Limits.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — page transitions & scroll/hover animation
- **next-intl 3.26** — i18n for `en` / `ar` (default `en`, `localePrefix: "always"`, so every URL is prefixed: `/en/...`, `/ar/...`)
- **react-hook-form** + **zod** — typed, validated multi-step lead form

## Project structure

```
zyndesk/
├── messages/
│   ├── en.json                # All English copy (source of truth for EN)
│   └── ar.json                # All Arabic copy (source of truth for AR)
├── public/
│   ├── favicon.svg            # SVG logo mark
│   └── og.svg                 # Open Graph / social share card
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-scoped pages (home, services, about, contact, ...)
│   │   ├── api/               # Route handlers (incl. /api/lead)
│   │   ├── globals.css
│   │   ├── manifest.ts        # PWA web app manifest
│   │   ├── robots.ts          # robots.txt generator
│   │   └── sitemap.ts         # XML sitemap (both locales, alternates)
│   ├── components/
│   │   ├── ui/                # Reusable primitives (buttons, cards, glass surfaces, ...)
│   │   ├── layout/            # Header, footer, nav, shells
│   │   ├── sections/          # Page section blocks (hero, features, CTA, ...)
│   │   ├── forms/             # Multi-step lead form + fields
│   │   └── seo/               # Metadata / structured-data helpers
│   ├── config/
│   │   ├── nav.ts             # Navigation structure
│   │   └── site.ts            # CENTRAL company config (contact, social, domain)
│   ├── data/
│   │   ├── metrics.ts         # Headline metric numbers
│   │   ├── projects.ts        # Case studies
│   │   ├── services.ts
│   │   ├── technologies.ts
│   │   └── training.ts
│   └── i18n/                  # next-intl config (routing, request, locales)
```

## Setup

Requires Node.js 18.17+ (Next.js 14) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env.local

# 3. Start the dev server (http://localhost:3000 → redirects to /en)
npm run dev

# 4. Production build
npm run build

# 5. Serve the production build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and set the following:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL, no trailing slash (e.g. `https://zyndeskjo.com`). Used for metadata, canonical tags, the sitemap, and OG tags. Exposed to the browser. Defaults to `https://zyndeskjo.com` when unset. |
| `LEAD_WEBHOOK_URL` | Optional | Destination the lead form POSTs to. **Leave blank to use mock mode** (see below). |
| `LEAD_WEBHOOK_TOKEN` | Optional | Shared secret sent as the `x-zyndesk-token` header on lead posts, for the receiving endpoint to verify. |

### Lead API "mock mode"

The `/api/lead` route handler works out of the box with no external services. When `LEAD_WEBHOOK_URL` is **unset (blank)**, the route runs in **mock mode**: it validates the payload, logs it to the server console, and returns a success response — so the form is fully testable locally without a backend.

To go live, set `LEAD_WEBHOOK_URL` to your CRM / webhook / email-service endpoint. The route will then forward each validated submission there (including the optional `x-zyndesk-token` header if `LEAD_WEBHOOK_TOKEN` is set) instead of just logging it.

## Deployment (Vercel)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel (framework preset auto-detects Next.js).
3. Set the environment variables in **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://zyndeskjo.com`)
   - `LEAD_WEBHOOK_URL` (+ `LEAD_WEBHOOK_TOKEN`) once your CRM/webhook is ready
4. Deploy. Subsequent pushes to the production branch auto-deploy.

> Note: any `admin.*` domain/tooling referenced elsewhere is **not** relevant to this marketing site — this project is a standalone public website.

## How to replace company information

All company-specific content lives in a small set of files. Placeholders are wrapped in `[BRACKETS]` where a real value is still needed.

- **Contact details & social links** — edit `src/config/site.ts`. This is the single source of truth read by the footer, contact blocks, and schema. Replace the `[BRACKET]` placeholders:
  - `contact.email` → `[hello@zyndeskjo.com]`
  - `contact.whatsappDisplay` / `contact.whatsappHref` → if WhatsApp differs from the main phone
  - `social.instagram`, `social.facebook`, `social.x`, `social.youtube` → real profile URLs (or remove)
- **Metric numbers** — edit `src/data/metrics.ts` (the headline "stats" figures).
- **All visible copy** — edit `messages/en.json` and `messages/ar.json`. Keep the two files structurally in sync (same keys).
- **Case studies** — replace placeholder entries in `src/data/projects.ts` **and** the matching copy under `projects.items.*` in `messages/en.json` + `messages/ar.json`.
- **Testimonials** — replace placeholder entries under `testimonials.items.*` in `messages/en.json` + `messages/ar.json` before launch.

## Connecting the contact form to a CRM / API

Set `LEAD_WEBHOOK_URL` (and optionally `LEAD_WEBHOOK_TOKEN`) in your environment. Each submission is validated with zod, then POSTed as JSON. The payload shape is:

```json
{
  "source": "string",
  "needs": ["string"],
  "goal": "string",
  "clientType": "string",
  "companyName": "string",
  "timeline": "string",
  "budget": "string",
  "contactMethod": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "whatsapp": "string",
  "country": "string",
  "consent": true
}
```

If `LEAD_WEBHOOK_TOKEN` is set, it is sent as the `x-zyndesk-token` request header so your endpoint can authenticate the caller.

## Placeholders to replace before production

- [ ] Company email (`contact.email` in `src/config/site.ts`)
- [ ] WhatsApp / phone numbers, if different from the defaults in `src/config/site.ts`
- [ ] Social URLs — Instagram, Facebook, X, YouTube (`social.*` in `src/config/site.ts`)
- [ ] Metric numbers (`src/data/metrics.ts`)
- [ ] All case studies (`src/data/projects.ts` + `projects.items.*` in both message files)
- [ ] All testimonials (`testimonials.items.*` in both message files)
- [ ] Legal review of the Privacy and Terms pages before publishing

## Completed features

- Fully bilingual EN/AR with per-locale URLs (`/en`, `/ar`) and RTL support for Arabic
- Glassmorphism design system with reusable UI primitives
- Framer Motion page transitions and scroll/hover animations
- Multi-step, validated lead form (react-hook-form + zod) with mock-mode API
- Centralized company config (`src/config/site.ts`) and content in `messages/*.json`
- Service, training, AI-solutions, development, QA-testing, marketing, projects, about, contact, consultation, and corporate-training pages
- Privacy and Terms pages
- SEO infrastructure: dynamic `sitemap.ts` (both locales with `alternates`), `robots.ts`, PWA `manifest.ts`
- SVG favicon and Open Graph share card
- Honeypot spam protection on the lead form

## Known limitations / future improvements

- **OG image format** — `og.svg` is provided, but some social/crawler platforms don't render SVG OG images. Convert it to `og.png` (1200×630) for maximum compatibility.
- **Real imagery** — replace illustrative/placeholder graphics with real project and team photography.
- **Newsletter** — wire the newsletter signup to a real provider (Mailchimp, Brevo, etc.).
- **Analytics** — add an analytics/measurement provider (e.g. Vercel Analytics, Plausible, GA4).
- **CAPTCHA** — the lead form currently uses a honeypot field; add a real CAPTCHA (hCaptcha / Cloudflare Turnstile) for stronger bot protection.
