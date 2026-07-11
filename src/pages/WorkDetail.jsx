import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { inView } from '../components/ui.jsx'
import { DASHBOARD_IMG, MOBILE_IMG } from '../images.js'

const IMGS = [DASHBOARD_IMG, MOBILE_IMG, null, null]

export default function WorkDetail({ t }) {
  const { id } = useParams()
  const idx = Number(id)
  const w = t.items[idx]
  if (!w) return <Navigate to="/work" replace />
  const img = IMGS[idx]

  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <Link to="/work" className="post-back">← {t.title}</Link>
          <span className="work-cat" style={{ display: 'block', marginTop: 22 }}>{w.c}</span>
          <motion.h1 className="display sec-title" style={{ marginTop: 8 }} {...inView}>{w.t}</motion.h1>
          <motion.p className="sec-sub" style={{ maxWidth: 640, marginTop: 22 }} {...inView}>{w.d}</motion.p>
          {img && (
            <motion.div className="work-detail-media" {...inView}>
              <img src={img} alt={w.t} loading="lazy"
                onError={(e) => { const p = e.currentTarget.parentElement; if (p) p.style.display = 'none' }} />
            </motion.div>
          )}
          <div className="stats-band work-detail-stats">
            {w.m.map(([v, l]) => (
              <div className="stat-cell" key={l}>
                <div className="stat-v">{v}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
