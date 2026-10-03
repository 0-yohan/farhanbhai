import ProductGrid from '../components/ProductGrid'
import { useShopActions } from '../context/ShopActionsContext'

export default function ProductGridBlock({ heading, subheading, className }) {
  const { onBuyNow } = useShopActions()
  return (
    <div className={className}>
      <ProductGrid onBuyNow={onBuyNow} heading={heading || undefined} subheading={subheading || undefined} />
    </div>
  )
}
