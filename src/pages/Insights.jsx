import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { inView } from '../components/ui.jsx'

export default function Insights({ t }) {
  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <div className="sec-head">
            <motion.h1 className="display sec-title" {...inView}>{t.title}</motion.h1>
            <motion.p className="sec-sub" {...inView}>{t.sub}</motion.p>
          </div>
          <div className="insight-grid">
            {t.posts.map((p, i) => (
              <motion.div key={p.slug}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
                <Link to={`/insights/${p.slug}`} className="insight-card">
                  <div className="insight-meta">
                    <span className="insight-tag">{p.tag}</span>
                    <span>{p.date} · {p.read}</span>
                  </div>
                  <h3 className="display insight-title">{p.title}</h3>
                  <p className="insight-excerpt">{p.excerpt}</p>
                  <span className="insight-more">{t.readMore} →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
