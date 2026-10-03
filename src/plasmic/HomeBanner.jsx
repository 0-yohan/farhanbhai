import { useEffect, useState } from 'react'
import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-react'
import { PLASMIC } from './plasmic-init'

// The marketing-owned area of the homepage. Renders the Plasmic component named
// "HomeBanner". If it doesn't exist or isn't published yet, renders nothing, so
// the shop looks exactly as before.
const COMPONENT = 'HomeBanner'

export default function HomeBanner() {
  const [exists, setExists] = useState(false)

  useEffect(() => {
    let cancelled = false
    PLASMIC.maybeFetchComponentData(COMPONENT)
      .then((data) => !cancelled && setExists(Boolean(data)))
      .catch(() => {}) // network/config problem: leave the shop untouched
    return () => {
      cancelled = true
    }
  }, [])

  if (!exists) return null
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent component={COMPONENT} />
    </PlasmicRootProvider>
  )
}
