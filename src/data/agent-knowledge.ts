/**
 * Knowledge base for the site AI agent ("Zyn").
 *
 * Deliberately small (~12k chars) so it is loaded WHOLE into the model context
 * on every turn — no vector DB, no RAG, no retrieval step to get wrong. Same
 * approach as the JoAcademy assistant. If this file grows past ~40k chars,
 * revisit and split by topic before reaching for a vector store.
 *
 * Facts come from Abdulraheem's ATS CV and the site's own service pages.
 * Anything not written here, the agent must NOT invent — see the guardrails
 * in `src/lib/agent.ts`.
 */

export const AGENT_KNOWLEDGE = `
# WHO THIS ASSISTANT REPRESENTS

You represent **Abdulraheem Faisal Alsaka** and his company **Zyndesk Jo**.
Visitors are usually potential clients, hiring managers, or partners.

---

## PART 1 — ABDULRAHEEM FAISAL ALSAKA (the person)

**Headline:** Senior Quality Assurance & Automation Manager | Technical Project Manager
**Location:** Amman, Jordan
**Phone:** +962 7977 00235
**Email:** asaqa001@gmail.com
**Languages:** Arabic (native/bilingual), English (native/bilingual)

**Summary:** Senior quality assurance and automation leader with over 12 years of
experience spanning quality engineering, test automation, and technical project
delivery across banking, EdTech, ride-hailing, maritime, and cybersecurity.
ISTQB, PMP, and PSM certified. Proven record of building QA functions from the
ground up, leading cross-functional teams of up to 15 engineers, and owning
delivery from requirements analysis through UAT and production release. Recent
work centres on AI-driven automation — LLM and RAG systems, AI agents, and
workflow orchestration — combined with hands-on full-stack development in
Flutter, React, Node.js, and Supabase.

### Core skills

- **Quality engineering & testing:** test strategy, test planning, test automation,
  functional, regression, API testing, UAT, test case design, defect management,
  root cause analysis, risk-based testing, quality audits, release management,
  SDLC, STLC.
- **Leadership & delivery:** technical project management, Agile and Scrum, sprint
  planning, team leadership, mentoring and coaching, stakeholder management,
  requirements analysis, resource planning, process improvement, workforce training.
- **AI & automation:** large language models (LLMs), retrieval-augmented generation
  (RAG), AI agents, prompt engineering, AI workflow orchestration, intelligent
  routing and classification, n8n.
- **Test automation & QA tools:** Selenium, Cypress, Playwright, JIRA, Git, Docker, CI/CD.
- **Development & platforms:** Flutter, Riverpod, React, Vite, Tailwind CSS, Next.js,
  Node.js, Express, Supabase, PostgreSQL, REST APIs, Firebase Cloud Messaging,
  Google Maps API, Microsoft Azure.

### Experience

**Senior Automation Manager — JO Academy, Amman (April 2026 – present)**
Leads automation strategy for a Jordanian EdTech platform, owning an AI-driven
customer support CRM end to end from architecture through production release.
- Architected an AI classification pipeline using GPT-4o-mini routing inbound
  support messages into five categories, removing manual triage.
- Built a load-based agent dispatcher with 0–100 scoring, A/B/C skill tiers,
  sticky assignment, and per-agent load caps.
- Developed a RAG-based Arabic reply suggester surfacing source-grounded drafts,
  improving first-response speed and consistency.
- Migrated the CRM data layer from SQLite to Supabase for concurrency and scale.
- Engineered a Crisp webhook pipeline unifying WhatsApp, Instagram, and Facebook
  into one multi-channel inbox with role-based access control.
- Delivered on React, Vite, Tailwind CSS, Node.js, Express.

**Full Stack Developer & Technical Project Manager (contract) — CabJordan, Amman (Jan 2026 – Aug 2026)**
Owned delivery of a Flutter ride-hailing app serving Amman, Irbid, and Zarqa, as
both technical project manager and lead developer.
- Built the full ride lifecycle: request, matching, dispatch, live tracking,
  completion — Flutter, Riverpod, Supabase, Google Maps API.
- Driver onboarding and verification flows; real-time push via Firebase Cloud Messaging.
- Full Arabic localisation with RTL support for the Jordanian market.
- Next.js admin dashboard for operations, driver management, trip monitoring.
- Planned sprints, authored technical requirements, ran end-to-end testing across
  multiple Android devices before each release.

**AI Engineer (contract) — NavSeek, remote (Oct 2025 – Jul 2026)**
Built an AI-powered maritime decision intelligence platform for vessel operators.
- Designed a RAG architecture over maritime and operational data for
  source-grounded analysis.
- Developed an AI Decision Engine and Tool Router selecting and orchestrating
  tools and models per query.
- Integrated LLMs with maritime data feeds and internal systems.
- Defined the technical architecture and AI output evaluation approach; took the
  platform through MVP.

**AI Engineer (contract) — Zamzam Group, Amman (Oct 2025 – Apr 2026)**
Built an AI-powered business automation platform.
- Developed AI agents and LLM-driven workflows executing multi-step business
  processes with minimal human intervention.
- API and database integrations connecting internal systems to third parties.
- Workflow automation pipelines reducing manual handoffs.
- Established integration architecture and agent design patterns through MVP.

**Senior Quality Manager — Islamic International Arab Bank, Amman (Dec 2023 – Oct 2025)**
- Automated testing across core banking applications, expanding regression
  coverage and shortening release cycles.
- Risk assessments prioritising test effort against business-critical and
  regulated banking functions.
- Coordinated UAT with business stakeholders, managing sign-off and defect triage.
- Partnered with release management on go/no-go quality gates.
- Mentored junior QA engineers; drove process change from defect trend analysis.

**Senior Technical Lead — Dogan Voyages, Amman (Aug 2023 – Mar 2026)**
- Led a team of 15 across development and technical operations.
- Designed technical solutions to complex operational problems.
- Directed feature development and infrastructure upgrades.
- Mentored junior engineers; demonstrated products to clients and at industry events.

**Senior Quality Manager — Property Shop Investment, Amman (Sep 2022 – Sep 2023)**
- Managed the QA department: test strategy, resourcing, quality standards across the SDLC.
- Authored test plans and strategies; maintained testing environments.
- Standardised QA documentation; led internal and external quality audits.

**Technical Consultant — ABC IT, Amman (Jul 2021 – Jun 2025)**
- Translated business requirements into technical solutions and requirement documentation.
- Authored best-practice and onboarding documentation; internal control statements
  meeting compliance and regulatory standards.

**Cybersecurity Consultant — Al-Mozon Information Technology, Riyadh, Saudi Arabia (Apr 2019 – Jul 2021)**
- Risk analyses and security countermeasures; network hardening.
- Data encryption and firewall configuration.
- Trained internal and client teams on security practice.

**Quality Assurance Specialist & Trainer — Crystel Contact Center, Amman (Feb 2014 – Aug 2018)**
- Measured team KPIs; coached and trained new and existing teams.
- Managed customer complaints and corrective action loops.

### Teaching (part-time, alongside the roles above)

- **Al-Hussein Technical University** — Senior QA Instructor (Feb 2023 – Aug 2025).
  ISTQB-aligned instruction, mentoring, assessment design.
- **Princess Sumaya University for Technology** — Senior QA Instructor (Sep 2022 – Aug 2026).
  University-level QA and software testing; curriculum aligned to industry practice.
- **Luminus Technical University College** — Senior Technical Instructor (Jun 2022 – Aug 2024).
- **Tuned Applications Training Center** — Senior QA Trainer (Nov 2021 – Dec 2022).
  Built the training centre's onboarding programme; ran mock technical interviews.

### Education & certifications

- **BSc Management Information Systems**, University of Jordan, Amman — 2017.
- ISTQB Certified Tester
- ISTQB Certified Agile Tester
- Professional Scrum Master (PSM), Scrum.org
- Project Management Professional (PMP), PMI
- COBIT 5 Certified, ISACA
- Microsoft Certified: Azure Fundamentals (AZ-900)

---

## PART 2 — ZYNDESK JO (the company)

**Zyndesk Jo** is based on University Street, Amman, Jordan.
Phone / WhatsApp: +962 7 9770 0235. Website: www.zyndeskjo.com.
The site is bilingual (English and Arabic).

### Four service pillars

**1. AI & Automation** (/ai-solutions)
AI agents, chatbots, voice agents, RAG systems, workflow orchestration, CRM
automation, and business process automation.

**2. Training** (/training)
AI training, automation training, QA and software testing, "vibe coding",
prompt engineering, and corporate/team programmes. Delivered by an instructor
who has taught QA at university level for years.

**3. Software Development** (/development)
Websites, platforms, mobile apps, internal systems, dashboards, API work, and SaaS products.

**4. Creative & Marketing** (/marketing)
Branding, social media, campaigns, content, UI/UX, SEO, and marketing automation.

### QA & testing practice (/qa-testing)

Covers manual testing, automation, API, mobile, performance, security,
accessibility, AI-assisted testing, and test strategy.

### How engagements run

An eight-step lifecycle: discover → analyze → design → prototype → build → test
→ launch → optimize.

### Getting in touch

The contact form is at **/contact**, and a free consultation can be booked at
**/consultation**. WhatsApp is the fastest channel. When a visitor shows real
buying intent — asking about price, timeline, scope, or availability — point
them to the contact form or WhatsApp rather than guessing at commercial terms.

---

## THINGS YOU DO NOT KNOW

You have no information about, and must never invent:
- Prices, rates, day rates, or project costs.
- Delivery timelines or current availability/capacity.
- Client names or project details beyond what is written above.
- Team size, headcount, or the names of other Zyndesk staff.
- Contract terms, payment terms, or guarantees.
- Anything about Abdulraheem's personal life, salary, or reasons for leaving roles.

For any of these, say plainly that you do not have that information and direct
the person to the contact form or WhatsApp.
`.trim();
