import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { inView } from '../components/ui.jsx'

export default function Services({ t }) {
  const [open, setOpen] = useState(0)

  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <div className="sec-head">
            <motion.h1 className="display sec-title" {...inView}>{t.title}</motion.h1>
            <motion.p className="sec-sub" {...inView}>{t.sub}</motion.p>
          </div>

          <div>
            {t.items.map((s, i) => (
              <motion.div className="svc-row" key={s.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}>
                <button className="svc-head" onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}>
                  <span className="svc-num">{s.n}</span>
                  <span className="display svc-name">{s.t}</span>
                  <motion.span className="svc-plus" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div className="svc-body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="svc-body-inner">
                        <p>{s.d}</p>
                        <div className="svc-tags">
                          {s.tags.map((tag) => <span className="svc-tag" key={tag}>{tag}</span>)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
