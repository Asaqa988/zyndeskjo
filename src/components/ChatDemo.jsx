import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SendIcon } from '../icons.jsx'

function pickReply(text, replies) {
  const q = text.toLowerCase()
  if (/(service|do you|offer|خدم|تقدم|ماذا)/.test(q)) return replies.services
  if (/(where|location|address|أين|موقع|عنوان)/.test(q)) return replies.location
  if (/(contact|phone|call|email|تواصل|هاتف|اتصال|رقم)/.test(q)) return replies.contact
  if (/(price|cost|much|سعر|تكلفة|كم)/.test(q)) return replies.price
  return replies.default
}

export default function ChatDemo({ t }) {
  const [messages, setMessages] = useState([{ from: 'ai', text: t.hello }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    setMessages([{ from: 'ai', text: t.hello }])
  }, [t])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const msg = (text ?? input).trim()
    if (!msg || typing) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'ai', text: pickReply(msg, t.replies) }])
    }, 1100)
  }

  return (
    <motion.div className="glass chat-box"
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="chat-head">
        <div className="chat-avatar">Z</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Zyn — Zyndesk AI</div>
          <div className="chat-status">● online</div>
        </div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i} className={`msg ${m.from === 'ai' ? 'msg-ai' : 'msg-user'}`}
              initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}>
              {m.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" className="msg msg-ai typing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <i /><i /><i />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="chips">
        {t.chips.map((c) => (
          <button key={c} className="chip" onClick={() => send(c)}>{c}</button>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={t.placeholder}
          aria-label={t.placeholder} />
        <button className="btn btn-primary chat-send" onClick={() => send()} aria-label={t.send}>
          <SendIcon />
        </button>
      </div>
    </motion.div>
  )
}
