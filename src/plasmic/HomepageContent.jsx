import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-react'
import { PLASMIC } from './plasmic-init'
import { usePlasmicStatus } from './plasmicData'

// The marketing-owned homepage. Renders the Plasmic component named
// "HomepageContent" once it's published; until then (or if Plasmic is
// unreachable) renders `fallback`, the original code-owned layout.
const COMPONENT = 'HomepageContent'

export default function HomepageContent({ fallback }) {
  const status = usePlasmicStatus(COMPONENT)
  if (status === 'loading') return null
  if (status === 'missing') return fallback
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent component={COMPONENT} />
    </PlasmicRootProvider>
  )
}
