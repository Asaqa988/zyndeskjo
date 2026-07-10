import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Magnetic } from './ui.jsx'

// Share of repetitive work we assume is automatable — conservative.
const AUTOMATABLE = 0.7

function Field({ label, min, max, value, onChange, prefix = '', suffix = '' }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="roi-field">
      <span className="roi-field-top">
        <span className="roi-field-label">{label}</span>
        <span className="roi-field-val" style={{ direction: 'ltr' }}>{prefix}{value}{suffix}</span>
      </span>
      <input type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))} aria-label={label}
        style={{ '--pct': `${pct}%` }} />
    </label>
  )
}

export default function RoiCalculator({ t }) {
  const navigate = useNavigate()
  const [team, setTeam] = useState(8)
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(15)

  const hoursYear = Math.round(team * hours * 52 * AUTOMATABLE)
  const savings = Math.round(hoursYear * rate)
  const fmt = (n) => n.toLocaleString('en-US')

  return (
    <div className="roi">
      <div className="roi-inputs">
        <Field label={t.team} min={1} max={200} value={team} onChange={setTeam} />
        <Field label={t.hours} min={1} max={40} value={hours} onChange={setHours} suffix="h" />
        <Field label={t.rate} min={3} max={100} value={rate} onChange={setRate} prefix="$" />
      </div>
      <div className="roi-result">
        <span className="roi-result-label">{t.resultLabel}</span>
        <span className="roi-money" style={{ direction: 'ltr' }}>${fmt(savings)}</span>
        <div className="roi-sub-metric">
          <b style={{ direction: 'ltr' }}>{fmt(hoursYear)}</b>
          <span>{t.hoursLabel}</span>
        </div>
        <p className="roi-note">{t.note}</p>
        <Magnetic><button className="btn btn-acid" onClick={() => navigate('/contact')}>{t.cta}</button></Magnetic>
      </div>
    </div>
  )
}
