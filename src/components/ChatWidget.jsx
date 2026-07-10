import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function pickReply(text, replies) {
  const q = text.toLowerCase()
  if (/(service|do you|offer|خدم|تقدم|ماذا)/.test(q)) return replies.services
  if (/(where|location|address|أين|موقع|عنوان)/.test(q)) return replies.location
  if (/(contact|phone|call|email|تواصل|هاتف|اتصال|رقم)/.test(q)) return replies.contact
  if (/(price|cost|much|سعر|تكلفة|كم|أسعار)/.test(q)) return replies.price
  return replies.default
}

export default function ChatWidget({ t }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'ai', text: t.hello }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => { setMessages([{ from: 'ai', text: t.hello }]) }, [t])
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  const send = async (text) => {
    const msg = (text ?? input).trim()
    if (!msg || typing) return
    setInput('')
    const next = [...messages, { from: 'user', text: msg }]
    setMessages(next)
    setTyping(true)

    // Build API history (drop the leading AI greeting; API must start with a user turn).
    const history = next
      .map((m) => ({ role: m.from === 'ai' ? 'assistant' : 'user', content: m.text }))
      .filter((_, i) => i > 0)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok) throw new Error('bad status')
      const data = await res.json()
      const reply = (data.reply || '').trim()
      if (!reply) throw new Error('empty')
      setMessages((m) => [...m, { from: 'ai', text: reply }])
    } catch {
      // No endpoint (local dev / not deployed) or an error → scripted fallback.
      setMessages((m) => [...m, { from: 'ai', text: pickReply(msg, t.replies) }])
    } finally {
      setTyping(false)
    }
  }

  // Let other parts of the site open Zyn with a preset question (Ask-Zyn chips).
  useEffect(() => {
    const handler = (e) => { setOpen(true); send(e.detail) }
    window.addEventListener('zyn:ask', handler)
    return () => window.removeEventListener('zyn:ask', handler)
  })

  return (
    <AnimatePresence>
      {!open ? (
        <motion.button key="fab" className="chat-fab" onClick={() => setOpen(true)}
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
          {t.open}
        </motion.button>
      ) : (
        <motion.div key="panel" className="chat-panel"
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}>
          <div className="chat-head">
            <b>ZYN — AI</b>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <motion.div key={i} className={`msg ${m.from === 'ai' ? 'msg-ai' : 'msg-user'}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {m.text}
              </motion.div>
            ))}
            {typing && <div className="msg msg-ai typing"><i /><i /><i /></div>}
          </div>
          <div className="chips">
            {t.chips.map((c) => <button key={c} className="chip" onClick={() => send(c)}>{c}</button>)}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={t.placeholder} aria-label={t.placeholder} />
            <button onClick={() => send()}>→</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
