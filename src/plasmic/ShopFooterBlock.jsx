import ShopFooter from '../components/ShopFooter'

export default function ShopFooterBlock({ text, className }) {
  return (
    <div className={className}>
      <ShopFooter text={text || undefined} />
    </div>
  )
}
