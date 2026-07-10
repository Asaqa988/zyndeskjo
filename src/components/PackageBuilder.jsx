import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Magnetic } from './ui.jsx'

// Toggle services → live scope summary → hand off to the contact form.
export default function PackageBuilder({ t }) {
  const navigate = useNavigate()
  const [sel, setSel] = useState([])

  const toggle = (k) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))
  const chosen = t.options.filter((o) => sel.includes(o.k))

  const send = () => {
    const msg = `${t.selected}: ${chosen.map((o) => o.t).join(', ')}.`
    try { sessionStorage.setItem('zyn_scope', msg) } catch { /* ignore */ }
    navigate('/contact')
  }

  return (
    <div className="builder">
      <div className="builder-options">
        {t.options.map((o) => (
          <button key={o.k} className={`builder-opt ${sel.includes(o.k) ? 'on' : ''}`}
            onClick={() => toggle(o.k)} aria-pressed={sel.includes(o.k)}>
            <span className="builder-check" aria-hidden="true">{sel.includes(o.k) ? '✕' : '+'}</span>
            {o.t}
          </button>
        ))}
      </div>
      <div className="builder-scope">
        <span className="builder-scope-label">{t.selected}</span>
        {chosen.length === 0 ? (
          <p className="builder-empty">{t.empty}</p>
        ) : (
          <ul className="builder-list">
            {chosen.map((o) => <li key={o.k}>{o.t}</li>)}
          </ul>
        )}
        <Magnetic>
          <button className="btn btn-acid" disabled={!chosen.length} onClick={send}>{t.cta}</button>
        </Magnetic>
      </div>
    </div>
  )
}
