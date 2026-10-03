import { useCart } from '../context/CartContext'

export default function Header({ onOpenCart }) {
  const { count } = useCart()
  return (
    <header className="header">
      <div className="header-inner">
        <div>
          <div className="logo glitch" data-text="THE CANDY CARTEL">THE CANDY CARTEL</div>
          <div className="tagline">Discreet shipping · Lab-tested purity · No questions asked</div>
        </div>
        <button className="cart-btn" onClick={onOpenCart} aria-label={`Open bag, ${count} items`}>
          🛍️ Bag
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
      <div className="ticker" aria-hidden="true">
        <span>
          🔒 256-bit encrypted &nbsp;★&nbsp; Rated 5⭐ by the neighborhood kids &nbsp;★&nbsp; Ships in unmarked
          envelopes &nbsp;★&nbsp; Same-night delivery on Oct 31 &nbsp;★&nbsp; Ask for "the usual" &nbsp;★&nbsp;
        </span>
        <span>
          🔒 256-bit encrypted &nbsp;★&nbsp; Rated 5⭐ by the neighborhood kids &nbsp;★&nbsp; Ships in unmarked
          envelopes &nbsp;★&nbsp; Same-night delivery on Oct 31 &nbsp;★&nbsp; Ask for "the usual" &nbsp;★&nbsp;
        </span>
      </div>
    </header>
  )
}
