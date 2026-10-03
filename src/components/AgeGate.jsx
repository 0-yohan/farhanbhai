import { useState } from 'react'
import { unlockScare } from '../lib/scare'

export default function AgeGate({ onEnter }) {
  const [taunt, setTaunt] = useState(false)

  const enter = () => {
    unlockScare() // must run inside this click so the scream can play later
    onEnter()
  }

  return (
    <div className="gate">
      <div className="gate-box">
        <h1 className="glitch" data-text="THE CANDY CARTEL">THE CANDY CARTEL</h1>
        <p>You must be 18+ to enter.</p>
        <p className="muted">What you see here, stays here. No cops. No snitches. No refunds.</p>
        <div className="gate-actions">
          <button className="btn btn-primary" onClick={enter}>ENTER IF YOU DARE</button>
          <button className="btn btn-ghost" onClick={() => setTaunt(true)}>I'm scared, take me back</button>
        </div>
        {taunt && <p className="taunt">Too scared? Thought so. 🐔 Go on, click enter.</p>}
      </div>
    </div>
  )
}
