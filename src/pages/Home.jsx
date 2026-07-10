import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MarqueeBand, RevealLines, Magnetic, inView, StatCounter } from '../components/ui.jsx'
import RoiCalculator from '../components/RoiCalculator.jsx'
import { DASHBOARD_IMG, MOBILE_IMG, HERO_IMG } from '../images.js'
import { TECH_STACK } from '../i18n.js'

function WorkPreview({ item, img, note }) {
  return (
    <motion.article className="work-card" {...inView}>
      <div className="work-media">
        <span className="demo-tag">{note}</span>
        <img src={img} alt={item.t} loading="lazy"
          onError={(e) => { e.currentTarget.outerHTML = `<div class="work-media-fallback">${item.t}</div>` }} />
      </div>
      <div className="work-body">
        <span className="work-cat">{item.c}</span>
        <h3 className="display">{item.t}</h3>
        <p>{item.d}</p>
      </div>
    </motion.article>
  )
}

export default function Home({ t, tw }) {
  const navigate = useNavigate()
  const journeyRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start start', 'end end'] })
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-58%'])

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-coords">31.98°N — 35.87°E / AMMAN</div>
        <div className="container hero-grid">
          <div className="hero-text">
            <motion.div className="hero-tag" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <span className="tick" />
              <span className="mono-label">{t.heroTag}</span>
            </motion.div>
            <RevealLines as="h1" className="display hero-h" lines={t.heroLines} delay={0.55}
              lineClass={(i) => (i === 1 ? 'acid' : i === 2 ? 'hollow' : '')} />
            <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              {t.heroSub}
            </motion.p>
            <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <Magnetic><button className="btn btn-acid" onClick={() => navigate('/contact')}>{t.cta1} ↗</button></Magnetic>
              <Magnetic><button className="btn btn-line" onClick={() => navigate('/work')}>{t.cta2}</button></Magnetic>
            </motion.div>
          </div>
          <motion.div className="hero-visual" aria-hidden="true"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <img src={HERO_IMG} alt=""
              onError={(e) => { const w = e.currentTarget.closest('.hero-visual'); if (w) w.style.display = 'none' }} />
          </motion.div>
        </div>
        <MarqueeBand items={tw.marquee} speed={16} />
      </section>

      {/* HORIZONTAL JOURNEY */}
      <section ref={journeyRef} className="journey" style={{ height: '300vh' }}>
        <div className="journey-sticky">
          <div className="journey-head container" style={{ maxWidth: 'none' }}>
            <span className="mono-label">{t.journeyLabel}</span>
            <h2 className="display journey-title">01 → 04</h2>
          </div>
          <motion.div className="journey-track" style={{ x: trackX }}>
            {t.journey.map((s) => (
              <div className="journey-card" key={s.n}>
                <div className="jc-num">{s.n}</div>
                <h3 className="display">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="display sec-title">{t.workLabel}</h2>
            <Magnetic><Link className="btn btn-line" to="/work">{t.workCta} ↗</Link></Magnetic>
          </div>
          <div className="work-grid">
            <WorkPreview item={tw.work.items[0]} img={DASHBOARD_IMG} note={tw.work.demoNote} />
            <WorkPreview item={tw.work.items[1]} img={MOBILE_IMG} note={tw.work.demoNote} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="display sec-title">{t.testiLabel}</h2>
          </div>
          <div className="testi-grid">
            {t.testimonials.map((it, i) => (
              <motion.figure className="testi-card" key={i}
                {...inView} transition={{ ...inView.transition, delay: i * 0.08 }}>
                <span className="testi-mark" aria-hidden="true">“</span>
                <blockquote className="testi-q">{it.q}</blockquote>
                <figcaption className="testi-cap">
                  <span className="testi-author">{it.a}</span>
                  <span className="testi-role">{it.r}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="display sec-title">{t.roi.label}</h2>
            <p className="sec-sub">{t.roi.sub}</p>
          </div>
          <RoiCalculator t={t.roi} />
        </div>
      </section>

      {/* STATS (count up on scroll) */}
      <section className="section">
        <div className="container">
          <div className="stats-band">
            {t.stats.map((s) => (
              <StatCounter key={s.l} v={s.v} l={s.l} />
            ))}
          </div>
        </div>
      </section>

      {/* BUILT WITH — tech marquee */}
      <section className="stack-section">
        <div className="container"><span className="mono-label stack-label">{t.stackLabel}</span></div>
        <MarqueeBand items={TECH_STACK} speed={24} inverse />
      </section>

      {/* CTA BAND */}
      <MarqueeBand items={[t.bandCta]} speed={12} className="cta-band" onClick={() => navigate('/contact')} />
    </main>
  )
}
