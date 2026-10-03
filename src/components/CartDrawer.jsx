import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { lines, total, add, remove } = useCart()
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h2>Your Bag</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close bag">✕</button>
        </div>

        {lines.length === 0 ? (
          <p className="muted empty">Your bag is empty. The dealer is disappointed.</p>
        ) : (
          <ul className="lines">
            {lines.map((l) => (
              <li key={l.id} className="line">
                <span className="line-emoji">{l.emoji}</span>
                <div className="line-info">
                  <div>{l.street}</div>
                  <div className="muted">${(l.price * l.qty).toFixed(2)}</div>
                </div>
                <div className="qty">
                  <button className="icon-btn" onClick={() => remove(l.id)} aria-label="Remove one">−</button>
                  <span>{l.qty}</span>
                  <button className="icon-btn" onClick={() => add(l.id)} aria-label="Add one">+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-foot">
          <div className="total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="muted small">📦 Ships in an unmarked envelope. Tell no one.</p>
          <button className="btn btn-primary wide" disabled={!lines.length} onClick={onCheckout}>
            Proceed to secure checkout 🔒
          </button>
        </div>
      </aside>
    </>
  )
}
