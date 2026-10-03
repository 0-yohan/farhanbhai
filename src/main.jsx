import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

// Plasmic code is lazy so shoppers on "/" never download it unless configured.
const PlasmicHost = lazy(() => import('./plasmic/PlasmicHost'))
const PlasmicPage = lazy(() => import('./plasmic/PlasmicPage'))
const path = window.location.pathname.replace(/\/+$/, '') || '/'

// "/" = the shop, "/plasmic-host" = Plasmic Studio's canvas host,
// anything else = a page marketing built in Plasmic.
function Route() {
  if (path === '/') return <App />
  return (
    <Suspense fallback={null}>
      {path === '/plasmic-host' ? <PlasmicHost /> : <PlasmicPage path={path} />}
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <Route />
    </CartProvider>
  </StrictMode>,
)
