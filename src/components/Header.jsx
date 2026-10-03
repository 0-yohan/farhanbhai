import { useCart } from '../context/CartContext'

export const DEFAULT_TAGLINE = 'Discreet shipping · Lab-tested purity · No questions asked'
export const DEFAULT_TICKER =
  '🔒 256-bit encrypted  ★  Rated 5⭐ by the neighborhood kids  ★  Ships in unmarked envelopes  ★  Same-night delivery on Oct 31  ★  Ask for "the usual"  ★ '

// tagline / tickerText are optional so marketing can edit them in Plasmic;
// the defaults are the original copy.
export default function Header({ onOpenCart, tagline = DEFAULT_TAGLINE, tickerText = DEFAULT_TICKER }) {
  const { count } = useCart()
  return (
    <header className="header">
      <div className="header-inner">
        <div>
          <div className="logo glitch" data-text="THE CANDY CARTEL">THE CANDY CARTEL</div>
          <div className="tagline">{tagline}</div>
        </div>
        <button className="cart-btn" onClick={onOpenCart} aria-label={`Open bag, ${count} items`}>
          🛍️ Bag
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
      <div className="ticker" aria-hidden="true">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </header>
  )
}
