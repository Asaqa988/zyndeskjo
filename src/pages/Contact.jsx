import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealLines, inView } from '../components/ui.jsx'
import { LINKEDIN_URL, PHONE, PHONE_DISPLAY, WEB3FORMS_ACCESS_KEY, CONTACT_EMAIL } from '../i18n.js'

export default function Contact({ t }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [faq, setFaq] = useState(-1)

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    // honeypot: bots fill hidden fields, humans can't see them
    if (e.target.botcheck?.checked) return

    // No access key configured yet → fall back to the visitor's mail app so the
    // form still works out of the box. Add WEB3FORMS_ACCESS_KEY in i18n.js to
    // receive real submissions straight to your inbox.
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Project inquiry — ${name || 'New lead'}`)
      const body = encodeURIComponent(`${msg}\n\n— ${name}${email ? ` <${email}>` : ''}`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Project inquiry — ${name || 'New lead'}`,
          from_name: 'Zyndesk Website',
          name, email, message: msg,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
        setName(''); setEmail(''); setMsg('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <RevealLines as="h1" className="display contact-h" lines={t.title}
            lineClass={(i) => (i === 0 ? '' : 'acid')} />
          <motion.p className="sec-sub" style={{ marginTop: 26 }} {...inView}>{t.sub}</motion.p>

          <div className="contact-grid">
            <motion.div className="contact-rows" {...inView}>
              <a className="contact-row" href={`tel:${PHONE}`}>
                <span className="cr-label">{t.phoneL}</span>
                <span className="cr-value" style={{ direction: 'ltr' }}>{PHONE_DISPLAY}</span>
              </a>
              <div className="contact-row hoverable">
                <span className="cr-label">{t.addressL}</span>
                <span className="cr-value">{t.address}</span>
              </div>
              <a className="contact-row" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <span className="cr-label">{t.linkedinL}</span>
                <span className="cr-value">{t.linkedin} ↗</span>
              </a>
            </motion.div>

            <motion.form className="contact-form" onSubmit={submit} {...inView}>
              {status === 'ok' ? (
                <div className="form-done">
                  <span className="form-done-title">{t.sentTitle}</span>
                  <p>{t.sentMsg}</p>
                </div>
              ) : (
                <>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.formName} aria-label={t.formName} required />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.formEmail} aria-label={t.formEmail} required />
                  <textarea rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.formMsg} aria-label={t.formMsg} required />
                  {/* honeypot (hidden) */}
                  <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <button type="submit" className="form-send" disabled={status === 'sending'}>
                    {status === 'sending' ? t.sending : `${t.formSend} →`}
                  </button>
                  {status === 'error' && <span className="form-hint form-error">{t.errorMsg}</span>}
                  <span className="form-hint">{t.formHint}</span>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container">
          <div className="sec-head">
            <h2 className="display sec-title">{t.faqLabel}</h2>
          </div>
          <div>
            {t.faq.map((f, i) => (
              <motion.div className="svc-row" key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}>
                <button className="svc-head" onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>
                  <span className="svc-name faq-q">{f.q}</span>
                  <motion.span className="svc-plus" animate={{ rotate: faq === i ? 45 : 0 }}>+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div className="svc-body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="svc-body-inner"><p>{f.a}</p></div>
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
