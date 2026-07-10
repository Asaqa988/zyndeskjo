import { useState } from 'react'

function Panel({ rows, tag, cls }) {
  return (
    <div className={`compare-panel ${cls}`}>
      <span className="compare-tag">{tag}</span>
      <div className="compare-rows">
        {rows.map(([v, l]) => (
          <div className="compare-row" key={l}>
            <b style={{ direction: 'ltr' }}>{v}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Drag the range to wipe between the "before" and "after" panels.
export default function CompareSlider({ t }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="compare">
      <Panel rows={t.before} tag={t.beforeTag} cls="compare-before" />
      <div className="compare-after-wrap" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Panel rows={t.after} tag={t.afterTag} cls="compare-after" />
      </div>
      <div className="compare-divider" style={{ left: `${pos}%` }} aria-hidden="true"><span /></div>
      <input className="compare-range" type="range" min="0" max="100" value={pos}
        onChange={(e) => setPos(Number(e.target.value))} aria-label={t.label} />
    </div>
  )
}
