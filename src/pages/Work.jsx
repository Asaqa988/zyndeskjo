import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { inView } from '../components/ui.jsx'
import { DASHBOARD_IMG, MOBILE_IMG } from '../images.js'

const IMGS = [DASHBOARD_IMG, MOBILE_IMG, null, null]

export default function Work({ t }) {
  const [active, setActive] = useState('all')

  // keep each item's image tied to its ORIGINAL position, then filter
  const items = t.items.map((w, i) => ({ ...w, img: IMGS[i], idx: i }))
  const shown = active === 'all' ? items : items.filter((w) => w.g === active)

  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <div className="sec-head">
            <motion.h1 className="display sec-title" {...inView}>{t.title}</motion.h1>
            <motion.p className="sec-sub" {...inView}>{t.sub}</motion.p>
          </div>

          {/* filter chips */}
          <div className="work-filters">
            {Object.entries(t.filters).map(([key, label]) => (
              <button key={key} className={`work-filter ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)} aria-pressed={active === key}>
                {label}
              </button>
            ))}
          </div>

          <motion.div layout className="work-grid">
            <AnimatePresence mode="popLayout">
              {shown.map((w) => (
                <motion.article layout className="work-card" key={w.t}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={`/work/${w.idx}`} className="work-card-link">
                  <div className="work-media">
                    <span className="demo-tag">{t.demoNote}</span>
                    {w.img ? (
                      <img src={w.img} alt={w.t} loading="lazy"
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
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
