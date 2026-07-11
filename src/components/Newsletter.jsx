import { useState } from 'react'
import { WEB3FORMS_ACCESS_KEY } from '../i18n.js'

export default function Newsletter({ t }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending' || !email) return
    if (!WEB3FORMS_ACCESS_KEY) { setStatus('ok'); setEmail(''); return }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject: 'Newsletter subscribe', from_name: 'Zyndesk Newsletter', email }),
      })
      const data = await res.json()
      if (data.success) { setStatus('ok'); setEmail('') } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div className="newsletter">
      <div className="newsletter-copy">
        <span className="mono-label">{t.label}</span>
        <p className="newsletter-sub">{t.sub}</p>
      </div>
      {status === 'ok' ? (
        <p className="newsletter-ok">{t.ok}</p>
      ) : (
        <form className="newsletter-form" onSubmit={submit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder} aria-label={t.label} required />
          <button type="submit" className="btn btn-acid" disabled={status === 'sending'}>{t.cta}</button>
          {status === 'error' && <span className="newsletter-err">{t.error}</span>}
        </form>
      )}
    </div>
  )
}
