import { useEffect, useRef } from 'react'
import { SCARE_IMAGE, playScream } from '../lib/scare'

export default function Jumpscare({ onDone }) {
  const screamed = useRef(false) // StrictMode runs effects twice in dev; scream once

  useEffect(() => {
    if (!screamed.current) {
      screamed.current = true
      playScream()
    }
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="jumpscare">
      <img src={SCARE_IMAGE} alt="" />
      <div className="flash" />
    </div>
  )
}
