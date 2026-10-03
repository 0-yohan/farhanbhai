import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { useCart } from '../context/CartContext'

const COLORS = ['#ff7a00', '#9b5cff', '#39ff14', '#ffffff']

export default function Reveal({ onReset }) {
  const { lines } = useCart()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const end = Date.now() + 2500
    let raf
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors: COLORS })
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors: COLORS })
      if (Date.now() < end) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => cancelAnimationFrame(raf)
  }, [])

  const share = async () => {
    const url = window.location.origin + import.meta.env.BASE_URL
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <div className="reveal">
      <div className="reveal-box">
        <div className="pumpkin" aria-hidden="true">🎃</div>
        <h1>HAPPY HALLOWEEN!</h1>
        <p className="reveal-sub">You just tried to buy drugs online… from a <strong>candy store</strong>. 😂</p>

        {lines.length > 0 && (
          <div className="receipt">
            <h3>Your "order" was actually:</h3>
            <ul>
              {lines.map((l) => (
                <li key={l.id}>
                  <span className="strike">{l.street}</span> → <strong>{l.real}</strong>
                  {l.qty > 1 && ` ×${l.qty}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="muted">Nothing was charged. Nothing was sent. Nobody's coming. Except maybe your dentist. 🦷</p>

        <div className="reveal-actions">
          <button className="btn btn-primary" onClick={share}>
            {copied ? '✓ Link copied!' : '📋 Prank someone else'}
          </button>
          <button className="btn btn-ghost" onClick={onReset}>↺ Reset for the next victim</button>
        </div>
      </div>
    </div>
  )
}
