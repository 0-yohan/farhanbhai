import { products } from '../data/products'
import ProductCard from './ProductCard'

export const DEFAULT_HEADING = "Today's Stash"
export const DEFAULT_SUBHEADING = 'Fresh batch just dropped. Supplies are limited. Act fast before they find us.'

export default function ProductGrid({ onBuyNow, heading = DEFAULT_HEADING, subheading = DEFAULT_SUBHEADING }) {
  return (
    <main className="shop">
      <section className="hero">
        <h2>{heading}</h2>
        <p className="muted">{subheading}</p>
      </section>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onBuyNow={onBuyNow} />
        ))}
      </div>
    </main>
  )
}
