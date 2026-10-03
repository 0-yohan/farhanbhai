import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ onBuyNow }) {
  return (
    <main className="shop">
      <section className="hero">
        <h2>Today's Stash</h2>
        <p className="muted">Fresh batch just dropped. Supplies are limited. Act fast before they find us.</p>
      </section>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onBuyNow={onBuyNow} />
        ))}
      </div>
    </main>
  )
}
