import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { RegisterForm } from '@/components/course/RegisterForm';
import { StartsIn } from '@/components/qa/StartsIn';
import { StickyCta } from '@/components/qa/StickyCta';
import { CourseSchema, FaqSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import {
  QA_COURSE, QA_COPY, QA_WHY, QA_MODULES, QA_BUILD, QA_FOR, QA_FAQ, QA_TRAINER,
} from '@/data/qa-course';

/**
 * The QA Manual & Automation course, as a single page.
 *
 * This is the whole site's front door while the Facebook and Instagram
 * campaign runs, so it is built for a visitor who has had one second of an ad:
 * the three things that decide a registration (when, how much, what do I walk
 * away with) sit above the fold, the form is one tap away at every point, and
 * the page ends at the form rather than at a menu of other things to read.
 *
 * Shared by `/` and `/qa-course` so there is one page to keep right.
 */
export function QaLanding({ locale }: { locale: string }) {
  const lang = locale === 'ar' ? 'ar' : 'en';
  const c = QA_COPY;

  const facts = [
    { icon: 'CalendarDays', value: QA_COURSE.startLabel[lang], label: c.facts.start[lang] },
    { icon: 'CalendarClock', value: QA_COURSE.days[lang], label: c.facts.days[lang] },
    { icon: 'Clock', value: QA_COURSE.time[lang], label: c.facts.time[lang] },
    { icon: 'Hourglass', value: `${QA_COURSE.hours}`, label: c.facts.hours[lang] },
    { icon: 'Laptop', value: 'Zoom', label: c.facts.format[lang] },
    { icon: 'Wallet', value: `${QA_COURSE.feeJod}`, label: c.facts.fee[lang] },
  ];

  const faq = QA_FAQ.map((f) => ({ q: f.q[lang], a: f.a[lang] }));

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

      {/* HERO + FACTS */}
      <section className="pb-12 pt-28 sm:pt-32">
        <div className="container-z flex max-w-5xl flex-col gap-8">
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{c.badge[lang]}</span>
              <StartsIn lang={lang} />
            </div>
            <h1 className="max-w-[22ch] text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
              {c.title[lang]}
            </h1>
            <p className="max-w-[62ch] text-lg leading-relaxed text-navy-medium">{c.subtitle[lang]}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#register" className="btn btn-primary">
                <span className="inline-flex items-center gap-2">
                  {c.ctaRegister[lang]}
                  <Icon name="ArrowRight" size={18} className="rtl:rotate-180" />
                </span>
              </a>
              <a href={QA_COURSE.syllabusUrl} download className="btn btn-secondary">
                <span className="inline-flex items-center gap-2">
                  <Icon name="FileText" size={18} />
                  {c.ctaSyllabus[lang]}
                </span>
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {facts.map((f) => (
              <li key={f.label} className="glass flex flex-col gap-1 rounded-glass p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-navy-ice text-navy">
                  <Icon name={f.icon} size={17} />
                </span>
                <span className="pt-1 text-base font-bold leading-tight text-ink">{f.value}</span>
                <span className="text-xs leading-snug text-navy-medium">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="section-pad scroll-mt-24">
        <div className="container-z max-w-5xl">
          <SectionHeading title={c.whyTitle[lang]} subtitle={c.whySubtitle[lang]} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {QA_WHY.map((w) => (
              <div key={w.title.en} className="glass flex gap-4 rounded-glass p-6">
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

      {/* CURRICULUM */}
      <section id="curriculum" className="section-pad scroll-mt-24">
        <div className="container-z max-w-5xl">
          <SectionHeading title={c.curriculumTitle[lang]} subtitle={c.curriculumSubtitle[lang]} />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {QA_MODULES.map((m) => (
              <li key={m.n} className="glass flex flex-col gap-3 rounded-glass p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-navy text-sm font-bold text-white">
                      {m.n}
                    </span>
                    <h3 className="pt-1 text-lg font-bold leading-snug text-ink">{m.title[lang]}</h3>
                  </div>
                  <span className="shrink-0 rounded-pill bg-navy-ice px-3 py-1 text-xs font-bold text-navy">
                    {m.hours} {c.hoursUnit[lang]}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-navy-medium">{m.body[lang]}</p>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {m.tags.map((tag) => (
                    <span key={tag} className="rounded-pill border border-navy-ice px-2.5 py-0.5 text-xs text-navy-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BUILD + AUDIENCE */}
      <section className="section-pad">
        <div className="container-z grid max-w-5xl gap-4 md:grid-cols-2">
          {[
            { title: c.buildTitle[lang], items: QA_BUILD, icon: 'Rocket' },
            { title: c.forTitle[lang], items: QA_FOR, icon: 'Users' },
          ].map((col) => (
            <div key={col.title} className="glass flex flex-col gap-4 rounded-glass p-6 sm:p-7">
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

      {/* TRAINER */}
      <section id="trainer" className="section-pad scroll-mt-24">
        <div className="container-z max-w-5xl">
          <SectionHeading title={c.trainerTitle[lang]} subtitle={c.trainerSubtitle[lang]} />
          <div className="glass mt-10 flex flex-col gap-5 rounded-glass p-6 sm:p-8">
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

      {/* REGISTER */}
      <section id="register" className="section-pad scroll-mt-24">
        <div className="container-z flex max-w-3xl flex-col gap-6">
          <SectionHeading title={c.registerTitle[lang]} subtitle={c.registerSubtitle[lang]} />
          <RegisterForm course={QA_COURSE.id} />
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="scroll-mt-24">
        <FaqAccordion title={c.faqTitle[lang]} items={faq} />
      </div>

      {/* Room for the sticky bar so it never covers the footer's last line. */}
      <div className="h-16 md:hidden" aria-hidden />
      <StickyCta label={c.ctaRegister[lang]} />
    </>
  );
}
