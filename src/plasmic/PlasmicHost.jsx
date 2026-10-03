import { PlasmicCanvasHost } from '@plasmicapp/loader-react'
import './plasmic-init' // registers the code components for Studio

// Served at /plasmic-host. Plasmic Studio loads this page in an iframe to render
// the project's canvas together with our registered code components.
export default function PlasmicHost() {
  return <PlasmicCanvasHost />
}
