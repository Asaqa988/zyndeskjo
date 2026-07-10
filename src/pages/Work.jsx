import { motion } from 'framer-motion'
import { inView } from '../components/ui.jsx'
import { DASHBOARD_IMG, MOBILE_IMG } from '../images.js'

const IMGS = [DASHBOARD_IMG, MOBILE_IMG, null, null]

export default function Work({ t }) {
  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <div className="sec-head">
            <motion.h1 className="display sec-title" {...inView}>{t.title}</motion.h1>
            <motion.p className="sec-sub" {...inView}>{t.sub}</motion.p>
          </div>
          <div className="work-grid">
            {t.items.map((w, i) => (
              <motion.article className="work-card" key={w.t}
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}>
                <div className="work-media">
                  <span className="demo-tag">{t.demoNote}</span>
                  {IMGS[i] ? (
                    <img src={IMGS[i]} alt={w.t} loading="lazy"
                      onError={(e) => { e.currentTarget.outerHTML = `<div class="work-media-fallback">${w.t}</div>` }} />
                  ) : (
                    <div className="work-media-fallback">{w.t}</div>
                  )}
                </div>
                <div className="work-body">
                  <span className="work-cat">{w.c}</span>
                  <h3 className="display">{w.t}</h3>
                  <p>{w.d}</p>
                  <div className="work-metrics">
                    {w.m.map(([v, l]) => (
                      <div key={l}><b>{v}</b><span>{l}</span></div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
