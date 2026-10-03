import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onBuyNow }) {
  const { add } = useCart()
  return (
    <article className="card">
      <span className="card-tag">{product.tag}</span>
      <div className="baggie" aria-hidden="true">
        <span>{product.emoji}</span>
      </div>
      <h3 className="card-title">{product.street}</h3>
      <p className="card-desc">{product.desc}</p>
      <div className="card-price">${product.price.toFixed(2)}</div>
      <div className="card-actions">
        <button className="btn btn-ghost" onClick={() => add(product.id)}>+ Add to bag</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            add(product.id)
            onBuyNow()
          }}
        >
          Buy now ⚡
        </button>
      </div>
      <p className="fineprint">*contains: {product.real}</p>
    </article>
  )
}
