export const DEFAULT_TEXT = 'Parody website · 100% candy · No real products or payments · Happy Halloween 🎃'

export default function ShopFooter({ text = DEFAULT_TEXT }) {
  return <footer className="footer">{text}</footer>
}
