import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'

/* Cycles through words with a vertical slide — used in the hero. */
export function RotatingText({ items, interval = 2200 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])
  return (
    <span className="rotating">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="acid"
          initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* Custom cursor: acid dot + trailing ring */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 25 })
  const ry = useSpring(y, { stiffness: 250, damping: 25 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 4); y.set(e.clientY - 4) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className="cursor-ring" style={{ x: rx, y: ry, translateX: -15, translateY: -15 }} />
    </>
  )
}

/* Magnetic hover wrapper */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

/* Infinite marquee band */
export function MarqueeBand({ items, inverse = false, speed = 18, className = '', onClick }) {
  const row = items.map((it, i) => <span className="marquee-item" key={i}>{it}</span>)
  return (
    <div className={`marquee-band ${inverse ? 'inverse' : ''} ${className}`} onClick={onClick}>
      <motion.div className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
        {row}{row}
      </motion.div>
    </div>
  )
}

/* Kinetic line-by-line reveal */
export function RevealLines({ lines, className = '', lineClass = () => '', as: Tag = 'h1', delay = 0 }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // Observe the un-clipped `.line` box (always in view) and let the
        // variant propagate to the inner span — putting whileInView directly on
        // the translated inner span breaks: its initial y:110% pushes it outside
        // this overflow:hidden parent, so the IntersectionObserver never fires.
        <motion.span className="line" key={i}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.span style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
            transition={{ duration: 0.7, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={lineClass(i)}>
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

/* Section fade-in helper */
export const inView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

/* Stat cell whose number counts up the first time it scrolls into view.
   Splits "87%" / "50+" / "24/7" into prefix + number + suffix so the
   formatting is preserved while only the number animates. */
export function StatCounter({ v, l }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '-40px' })
  const parts = String(v).match(/^(\D*)([\d.]+)([\s\S]*)$/)
  const val = useCountUp(parts ? parts[2] : v, seen)
  const shown = parts && val != null ? `${parts[1]}${val}${parts[3]}` : v
  return (
    <div className="stat-cell" ref={ref}>
      <div className="stat-v" style={{ direction: 'ltr' }}>{shown}</div>
      <div className="stat-l">{l}</div>
    </div>
  )
}

/* Odometer-style stat (counts up when visible) */
export function useCountUp(target, visible) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    const num = parseFloat(String(target).replace(/[^\d.]/g, ''))
    if (isNaN(num)) { setVal(null); return }
    let raf, start
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1200, 1)
      setVal(Math.round(num * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, visible])
  return val
}
