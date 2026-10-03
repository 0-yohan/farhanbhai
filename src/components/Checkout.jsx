import { useEffect, useState } from 'react'

const STEPS = [
  '> Establishing secure tunnel...',
  '> Routing through 7 proxies...',
  '> Wiping browser history...',
  '> Encrypting order #6661031...',
  '> Contacting supplier...',
  '> Supplier is here. Look closely at your screen...',
]
const STEP_MS = 650

export default function Checkout({ onDone }) {
  const [shown, setShown] = useState(1)

  useEffect(() => {
    if (shown < STEPS.length) {
      const t = setTimeout(() => setShown((n) => n + 1), STEP_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(onDone, 1100)
    return () => clearTimeout(t)
  }, [shown, onDone])

  const pct = Math.round((shown / STEPS.length) * 100)

  return (
    <div className="terminal">
      <div className="terminal-box">
        {STEPS.slice(0, shown).map((s, i) => (
          <p key={i} className={i === STEPS.length - 1 ? 'warn' : ''}>{s}</p>
        ))}
        <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="muted">{pct}% <span className="cursor">█</span></p>
      </div>
    </div>
  )
}
