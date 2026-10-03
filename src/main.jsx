import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

// Plasmic Studio loads this route in an iframe; kept out of the shop bundle.
const PlasmicHost = lazy(() => import('./plasmic/PlasmicHost'))
const isPlasmicHost = window.location.pathname.replace(/\/$/, '') === '/plasmic-host'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      {isPlasmicHost ? (
        <Suspense fallback={null}>
          <PlasmicHost />
        </Suspense>
      ) : (
        <App />
      )}
    </CartProvider>
  </StrictMode>,
)
