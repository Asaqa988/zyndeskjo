import { motion } from 'framer-motion'
import { RevealLines, MarqueeBand, inView } from '../components/ui.jsx'

export default function About({ t, tw }) {
  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <motion.span className="mono-label" {...inView}>{t.title}</motion.span>
          <div style={{ height: 30 }} />
          <RevealLines as="h1" className="display manifesto" lines={t.manifesto}
            lineClass={(i) => (i === 2 || i === 3 ? 'accent' : '')} />
          <motion.p className="about-body" {...inView}>{t.body}</motion.p>
        </div>
      </section>

      <MarqueeBand items={tw.marquee} speed={16} />

      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <motion.span className="mono-label" {...inView}>{t.valuesLabel}</motion.span>
          <div className="values-grid">
            {t.values.map((v, i) => (
              <motion.div className="value-cell" key={v.t}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}>
                <h3 className="display">{v.t}</h3>
                <p>{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.span className="mono-label" {...inView}>{t.locLabel}</motion.span>
          <motion.h2 className="display sec-title" style={{ marginTop: 20 }} {...inView}>{t.loc}</motion.h2>
        </div>
      </section>
    </main>
  )
}
