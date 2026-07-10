import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LINKEDIN_URL, PHONE } from '../i18n.js'
import { Cursor } from './ui.jsx'
import ChatWidget from './ChatWidget.jsx'
import StatusStrip from './StatusStrip.jsx'

function Links({ t, onClick }) {
  const routes = [
    ['/', t.nav.home], ['/services', t.nav.services], ['/work', t.nav.work],
    ['/about', t.nav.about], ['/contact', t.nav.contact],
  ]
  return routes.map(([to, label]) => (
    <NavLink key={to} to={to} end={to === '/'} onClick={onClick}
      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
      {label}
    </NavLink>
  ))
}

export default function Layout({ t, lang, setLang, children }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <Cursor />
      <nav className="nav">
        <div className="container nav-inner">
          <NavLink to="/" className="nav-logo">ZYNDESK<span className="reg">®</span></NavLink>
          <div className="nav-links">
            <Links t={t} />
            <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button className="nav-link nav-cta" onClick={() => navigate('/contact')}>{t.nav.cta}</button>
          </div>
          <div style={{ display: 'flex' }} className="nav-mobile-controls">
            <button className="lang-btn nav-burger" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              {open ? '✕' : 'MENU'}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="nav-mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Links t={t} onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* acid veil page transition */}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="veil" />
      </AnimatePresence>

      {children}

      <StatusStrip t={t.status} />

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">ZYNDESK<span className="reg">®</span></div>
            <p>{t.footer.tag}</p>
          </div>
          <div className="footer-links">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`tel:${PHONE}`}>{t.nav.contact}</a>
          </div>
          <p>{t.footer.rights}</p>
        </div>
      </footer>

      <ChatWidget t={t.chat} />
    </>
  )
}
