import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useShopActions } from '../context/ShopActionsContext'

// Plasmic-facing wrapper: lets the editor pick a product by id instead of
// passing a whole object, and wires "Buy now" to the real checkout.
export default function ProductCardBlock({ productId, className }) {
  const { onBuyNow } = useShopActions()
  const product = products.find((p) => p.id === productId) || products[0]
  return (
    <div className={className}>
      <ProductCard product={product} onBuyNow={onBuyNow} />
    </div>
  )
}
