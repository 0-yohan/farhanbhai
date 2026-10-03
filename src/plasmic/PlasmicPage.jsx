import { PageParamsProvider, PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-react'
import { PLASMIC } from './plasmic-init'
import { usePlasmicStatus } from './plasmicData'
import { ShopActionsContext } from '../context/ShopActionsContext'

// Any path other than "/" is looked up as a Plasmic page, so marketing can add
// pages (/about, /halloween-sale, ...) without a code change.
const goToShop = () => window.location.assign('/')

function NotFound() {
  return (
    <main className="shop">
      <section className="hero">
        <h2>Page not found</h2>
        <p className="muted"><a href="/">Back to the shop</a></p>
      </section>
    </main>
  )
}

export default function PlasmicPage({ path }) {
  const status = usePlasmicStatus(path)
  if (status === 'loading') return null
  if (status === 'missing') return <NotFound />
  return (
    // The cart and checkout live on "/", so from here those actions go there.
    <ShopActionsContext.Provider value={{ onBuyNow: goToShop, onOpenCart: goToShop }}>
      <PlasmicRootProvider loader={PLASMIC}>
        <PageParamsProvider
          route={path}
          query={Object.fromEntries(new URLSearchParams(window.location.search))}
        >
          <PlasmicComponent component={path} />
        </PageParamsProvider>
      </PlasmicRootProvider>
    </ShopActionsContext.Provider>
  )
}
