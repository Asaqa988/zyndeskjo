import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { RegisterForm } from '@/components/course/RegisterForm';
import { StartsIn } from '@/components/qa/StartsIn';
import { StickyCta } from '@/components/qa/StickyCta';
import { ExplainerVideo } from '@/components/qa/ExplainerVideo';
import { AskZyn } from '@/components/qa/AskZyn';
import { CourseSchema, FaqSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import {
  QA_COURSE, QA_COPY, QA_UI, QA_WHY, QA_MODULES, QA_BUILD, QA_FOR, QA_FAQ, QA_TRAINER,
} from '@/data/qa-course';

/**
 * The QA Manual & Automation course, as a single page.
 *
 * This is the whole site's front door while the Facebook and Instagram
 * campaign runs, so it is built for a visitor who has had one second of an ad.
 * The order follows the questions in their head:
 *
 *   what is this → when / how much → can I trust it → how do I join →
 *   what exactly will I learn → who teaches it → what if I still have a doubt
 *
 * The registration form lives in the hero card, so it is on screen from the
 * first view on a desktop and one short scroll away on a phone; every other
 * button on the page points back at it rather than at a second copy.
 *
 * Shared by `/` and `/qa-course` so there is one page to keep right.
 */
export function QaLanding({ locale }: { locale: string }) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  const c = QA_COPY;
  const u = QA_UI;

  const faq = QA_FAQ.map((f) => ({ q: f.q[lang], a: f.a[lang] }));

  const cardFacts = [
    { icon: 'CalendarDays', text: `${lang === 'ar' ? 'الخميس' : 'Thursday'} ${QA_COURSE.startLabel[lang]}` },
    { icon: 'CalendarClock', text: `${QA_COURSE.days[lang]} · ${QA_COURSE.time[lang]}` },
    { icon: 'Laptop', text: c.facts.format[lang] + ' · Zoom' },
  ];

  return (
    <>
      <CourseSchema
        name={c.title.en}
        description={c.subtitle.en}
        locale={locale}
        startDate={QA_COURSE.startsAt}
        priceJod={QA_COURSE.feeJod}
        hours={QA_COURSE.hours}
        url={`${siteConfig.domain}/${locale}`}
      />
      <FaqSchema items={faq} />

      {/* HERO — what it is, when, how much, and the form */}
      <section className="px-3 pt-24 sm:px-5 sm:pt-28">
        <div className="qa-hero mx-auto max-w-[1240px] px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14">
            <div className="flex min-w-0 flex-col items-start gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-pill bg-white/12 px-3 py-1 text-xs font-bold text-white">
                  {c.badge[lang]}
                </span>
                <StartsIn lang={lang} />
              </div>

              <h1 className="text-[2.1rem] font-extrabold leading-[1.18] text-white sm:text-5xl">
                {u.heroTitle[lang]}
              </h1>
              <p className="max-w-[56ch] text-lg leading-relaxed text-white/80">{u.heroSub[lang]}</p>

              <ul className="flex flex-col gap-2.5">
                {u.heroPoints.map((p) => (
                  <li key={p.en} className="flex items-start gap-2.5 text-[15.5px] text-white/90">
                    <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-[#c4f24a]" />
                    {p[lang]}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#register" className="btn-lime">
                  {u.finalCta[lang]}
                  <Icon name="ArrowRight" size={18} className="rtl:rotate-180" />
                </a>
                <a href={QA_COURSE.syllabusUrl} download className="btn-ghost-light">
                  <Icon name="FileText" size={18} />
                  {c.ctaSyllabus[lang]}
                </a>
              </div>

              <dl className="mt-2 grid w-full grid-cols-4 gap-3 border-t border-white/15 pt-6">
                {u.stats.map((s) => (
                  <div key={s.value} className="flex flex-col">
                    <dt className="text-2xl font-extrabold text-white sm:text-3xl">{s.value}</dt>
                    <dd className="text-xs leading-snug text-white/65 sm:text-sm">{s.label[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Reservation card */}
            <div id="register" className="min-w-0 scroll-mt-24 rounded-[22px] bg-white p-5 text-ink shadow-glass-lg sm:p-7">
              <div className="flex items-end justify-between gap-4 border-b border-navy-ice pb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-navy-medium">{u.cardTitle[lang]}</span>
                  <span className="text-xs text-navy-soft">{u.cardFee[lang]}</span>
                </div>
                <span className="text-4xl font-extrabold leading-none text-navy-deep">{QA_COURSE.feeJod}</span>
              </div>

              <ul className="flex flex-col gap-2.5 py-4">
                {cardFacts.map((f) => (
                  <li key={f.icon} className="flex items-center gap-3 text-[15px] text-ink">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-navy-ice text-navy">
                      <Icon name={f.icon} size={16} />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <RegisterForm course={QA_COURSE.id} variant="plain" />
              <p className="mt-3 text-xs leading-relaxed text-navy-soft">{u.cardNote[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLAINER VIDEO */}
      <section id="video" className="section-pad scroll-mt-24 !pb-10">
        <div className="container-z max-w-4xl">
          <SectionHeading title={c.videoTitle[lang]} subtitle={c.videoSubtitle[lang]} />
          <div className="mt-8">
            <ExplainerVideo label={c.videoTitle[lang]} />
          </div>
        </div>
      </section>

      {/* HOW JOINING WORKS */}
      <section className="section-pad !py-14">
        <div className="container-z max-w-5xl">
          <SectionHeading title={u.stepsTitle[lang]} subtitle={u.stepsSubtitle[lang]} />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {u.steps.map((s, i) => (
              <li key={s.title.en} className="qa-card flex flex-col gap-3 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-base font-extrabold text-white">
                    {i + 1}
                  </span>
                  <Icon name={s.icon} size={22} className="text-navy-medium" />
                </div>
                <h3 className="text-lg font-bold text-ink">{s.title[lang]}</h3>
                <p className="text-[15px] leading-relaxed text-navy-medium">{s.body[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="qa-band section-pad !py-14 scroll-mt-24">
        <div className="container-z max-w-5xl">
          <SectionHeading title={c.whyTitle[lang]} subtitle={c.whySubtitle[lang]} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {QA_WHY.map((w) => (
              <div key={w.title.en} className="qa-card flex gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-navy-ice text-navy">
                  <Icon name={w.icon} size={20} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-ink">{w.title[lang]}</h3>
                  <p className="text-[15px] leading-relaxed text-navy-medium">{w.body[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM — collapsed, so the whole course reads in one screen */}
      <section id="curriculum" className="section-pad !py-14 scroll-mt-24">
        <div className="container-z max-w-4xl">
          <SectionHeading title={c.curriculumTitle[lang]} subtitle={c.curriculumSubtitle[lang]} />
          <p className="mt-3 text-center text-sm text-navy-soft">{u.curriculumHint[lang]}</p>
          <ol className="mt-8 flex flex-col gap-3">
            {QA_MODULES.map((m, i) => (
              <li key={m.n}>
                <details className="qa-card qa-details" open={i === 0}>
                  <summary className="flex items-center gap-4 p-4 sm:p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-navy text-sm font-extrabold text-white">
                      {m.n}
                    </span>
                    <span className="flex-1 text-base font-bold leading-snug text-ink sm:text-lg">
                      {m.title[lang]}
                    </span>
                    <span className="shrink-0 rounded-pill bg-navy-ice px-3 py-1 text-xs font-bold text-navy">
                      {m.hours} {c.hoursUnit[lang]}
                    </span>
                    <Icon name="ChevronDown" size={18} className="qa-chevron shrink-0 text-navy-medium transition-transform" />
                  </summary>
                  <div className="flex flex-col gap-3 border-t border-navy-ice px-4 pb-5 pt-4 sm:px-5">
                    <p className="text-[15px] leading-relaxed text-navy-medium">{m.body[lang]}</p>
                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {m.tags.map((tag) => (
                        <span key={tag} className="rounded-pill border border-navy-ice px-2.5 py-0.5 text-xs text-navy-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center">
            <a href={QA_COURSE.syllabusUrl} download className="btn btn-secondary">
              <Icon name="FileText" size={18} />
              {c.ctaSyllabus[lang]}
            </a>
          </div>
        </div>
      </section>

      {/* BUILD + AUDIENCE */}
      <section className="qa-band section-pad !py-14">
        <div className="container-z grid max-w-5xl gap-4 md:grid-cols-2">
          {[
            { title: c.buildTitle[lang], items: QA_BUILD, icon: 'Rocket' },
            { title: c.forTitle[lang], items: QA_FOR, icon: 'Users' },
          ].map((col) => (
            <div key={col.title} className="qa-card flex flex-col gap-4 p-6 sm:p-7">
              <h2 className="inline-flex items-center gap-2.5 text-xl font-bold text-ink">
                <Icon name={col.icon} size={20} className="text-navy" />
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.items.map((it) => (
                  <li key={it.en} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                    <Icon name="CircleCheck" size={18} className="mt-0.5 shrink-0 text-cyan" />
                    {it[lang]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ASK ZYN */}
      <section id="ask" className="section-pad !py-14 scroll-mt-24">
        <div className="container-z max-w-4xl">
          <AskZyn lang={lang} />
        </div>
      </section>

      {/* TRAINER */}
      <section id="trainer" className="qa-band section-pad !py-14 scroll-mt-24">
        <div className="container-z max-w-5xl">
          <SectionHeading title={c.trainerTitle[lang]} subtitle={c.trainerSubtitle[lang]} />
          <div className="qa-card mt-10 flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-ink">{QA_TRAINER.name[lang]}</h3>
              <p className="text-[15px] text-navy-medium">{QA_TRAINER.role[lang]}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {QA_TRAINER.points.map((p) => (
                <li key={p.en} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                  <Icon name="CircleCheck" size={18} className="mt-0.5 shrink-0 text-cyan" />
                  {p[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="scroll-mt-24">
        <FaqAccordion title={c.faqTitle[lang]} items={faq} />
      </div>

      {/* FINAL CTA */}
      <section className="px-3 pb-6 sm:px-5">
        <div className="qa-hero mx-auto flex max-w-[1240px] flex-col items-start gap-6 px-6 py-10 sm:px-12 sm:py-14 md:flex-row md:items-center md:justify-between">
          <div className="relative flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{u.finalTitle[lang]}</h2>
            <p className="text-white/75">{u.finalBody[lang]}</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <a href="#register" className="btn-lime">
              {u.finalCta[lang]}
              <Icon name="ArrowRight" size={18} className="rtl:rotate-180" />
            </a>
            <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
              <Icon name="MessageCircle" size={18} />
              {u.whatsappCta[lang]}
            </a>
          </div>
        </div>
      </section>

      {/* Room for the sticky bar so it never covers the footer's last line. */}
      <div className="h-16 md:hidden" aria-hidden />
      <StickyCta label={c.ctaRegister[lang]} />
    </>
  );
}
