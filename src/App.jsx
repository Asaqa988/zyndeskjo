import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { translations } from './i18n.js'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Per-route document title (browser tab + JS-rendering crawlers)
  useEffect(() => {
    const base = 'ZYNDESK® — AI Studio in Amman, Jordan'
    const pages = {
      '/services': t.nav.services,
      '/work': t.nav.work,
      '/about': t.nav.about,
      '/contact': t.nav.contact,
    }
    const page = pages[location.pathname]
    document.title = page ? `ZYNDESK® — ${page}` : base
  }, [location.pathname, t])

  return (
    <Layout t={t} lang={lang} setLang={setLang}>
      <Routes>
        <Route path="/" element={<Home t={t.home} tw={t} />} />
        <Route path="/services" element={<Services t={t.services} />} />
        <Route path="/work" element={<Work t={t.work} />} />
        <Route path="/about" element={<About t={t.about} tw={t} />} />
        <Route path="/contact" element={<Contact t={t.contact} />} />
        <Route path="*" element={<Home t={t.home} tw={t} />} />
      </Routes>
    </Layout>
  )
}
