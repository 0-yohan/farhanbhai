import ProductGrid from '../components/ProductGrid'
import { useShopActions } from '../context/ShopActionsContext'

export default function ProductGridBlock({ className }) {
  const { onBuyNow } = useShopActions()
  return (
    <div className={className}>
      <ProductGrid onBuyNow={onBuyNow} />
    </div>
  )
}
