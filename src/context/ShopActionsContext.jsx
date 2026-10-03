import { createContext, useContext } from 'react'

// Lets components rendered outside App's own tree (e.g. Plasmic-edited content)
// trigger shop actions. Defaults are no-ops so the components also work in
// Plasmic Studio's canvas, where there is no shop.
export const ShopActionsContext = createContext({ onBuyNow: () => {}, onOpenCart: () => {} })

export const useShopActions = () => useContext(ShopActionsContext)
