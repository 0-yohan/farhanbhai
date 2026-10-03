// Plasmic loader + code component registry. Imported by both the /plasmic-host
// page (so Studio sees the components) and wherever Plasmic content renders.
//
// The project id and public token are meant to be public (they only allow
// reading published content). Never put a Plasmic *secret* token here.
import { initPlasmicLoader } from '@plasmicapp/loader-react'
import { products } from '../data/products'
import { DEFAULT_TAGLINE, DEFAULT_TICKER } from '../components/Header'
import { DEFAULT_HEADING, DEFAULT_SUBHEADING } from '../components/ProductGrid'
import { DEFAULT_TEXT } from '../components/ShopFooter'
import HeaderBlock from './HeaderBlock'
import ShopFooterBlock from './ShopFooterBlock'
import ProductCardBlock from './ProductCardBlock'
import ProductGridBlock from './ProductGridBlock'

export const hasPlasmicConfig = Boolean(
  import.meta.env.VITE_PLASMIC_PROJECT_ID && import.meta.env.VITE_PLASMIC_PUBLIC_TOKEN,
)

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: import.meta.env.VITE_PLASMIC_PROJECT_ID || '',
      token: import.meta.env.VITE_PLASMIC_PUBLIC_TOKEN || '',
    },
  ],
  // true = load unpublished drafts (local/staging); false = published only.
  preview: import.meta.env.VITE_PLASMIC_PREVIEW === 'true',
})

PLASMIC.registerComponent(HeaderBlock, {
  name: 'ShopHeader',
  displayName: 'Shop Header',
  description: 'The site header with logo, tagline, ticker and bag button.',
  props: {
    tagline: { type: 'string', displayName: 'Tagline', defaultValue: DEFAULT_TAGLINE },
    tickerText: {
      type: 'string',
      displayName: 'Ticker text',
      description: 'Scrolling text under the header.',
      defaultValue: DEFAULT_TICKER,
    },
  },
})

PLASMIC.registerComponent(ShopFooterBlock, {
  name: 'ShopFooter',
  displayName: 'Shop Footer',
  description: 'The site footer line.',
  props: {
    text: { type: 'string', displayName: 'Text', defaultValue: DEFAULT_TEXT },
  },
})

PLASMIC.registerComponent(ProductCardBlock, {
  name: 'ProductCard',
  displayName: 'Product Card',
  description: 'One product from the catalog. Copy and price come from the product data.',
  props: {
    productId: {
      type: 'choice',
      displayName: 'Product',
      options: products.map((p) => ({ value: p.id, label: p.street })),
      defaultValue: products[0].id,
    },
  },
})

PLASMIC.registerComponent(ProductGridBlock, {
  name: 'ProductGrid',
  displayName: 'Product Grid',
  description: 'The full product grid with its heading.',
  props: {
    heading: { type: 'string', displayName: 'Heading', defaultValue: DEFAULT_HEADING },
    subheading: { type: 'string', displayName: 'Subheading', defaultValue: DEFAULT_SUBHEADING },
  },
})
