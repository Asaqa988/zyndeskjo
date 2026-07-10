import { useState, useEffect } from 'react'

// Live studio-status band: ticking Amman clock + pulsing "online" indicator.
export default function StatusStrip({ t }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Amman', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="status-strip">
      <div className="container status-inner">
        <span className="status-item"><span className="status-dot" aria-hidden="true" />{t.live}</span>
        <span className="status-item status-dim">{t.ops}</span>
        <span className="status-item status-dim">{t.agents}</span>
        <span className="status-item status-time">
          {t.loc} <b style={{ direction: 'ltr' }}>{time}</b>
        </span>
      </div>
    </div>
  )
}
