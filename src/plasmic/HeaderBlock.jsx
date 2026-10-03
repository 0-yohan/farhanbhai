import Header from '../components/Header'
import { useShopActions } from '../context/ShopActionsContext'

// Plasmic-facing wrapper: wires the bag button to the real cart, and treats
// empty text props as "use the default copy".
export default function HeaderBlock({ tagline, tickerText, className }) {
  const { onOpenCart } = useShopActions()
  return (
    <div className={className}>
      <Header onOpenCart={onOpenCart} tagline={tagline || undefined} tickerText={tickerText || undefined} />
    </div>
  )
}
