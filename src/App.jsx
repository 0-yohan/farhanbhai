import { useCallback, useState } from 'react'
import { useCart } from './context/CartContext'
import AgeGate from './components/AgeGate'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Jumpscare from './components/Jumpscare'
import Reveal from './components/Reveal'

// gate → shop → checkout → scare → reveal
export default function App() {
  const [stage, setStage] = useState('gate')
  const [cartOpen, setCartOpen] = useState(false)
  const { clear } = useCart()

  const startCheckout = () => {
    setCartOpen(false)
    setStage('checkout')
  }
  const toScare = useCallback(() => setStage('scare'), [])
  const toReveal = useCallback(() => setStage('reveal'), [])
  const reset = () => {
    clear()
    setStage('gate')
  }

  if (stage === 'gate') return <AgeGate onEnter={() => setStage('shop')} />
  if (stage === 'checkout') return <Checkout onDone={toScare} />
  if (stage === 'scare') return <Jumpscare onDone={toReveal} />
  if (stage === 'reveal') return <Reveal onReset={reset} />

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />
      <ProductGrid onBuyNow={startCheckout} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={startCheckout} />
      <footer className="footer">Parody website · 100% candy · No real products or payments · Happy Halloween 🎃</footer>
    </>
  )
}
