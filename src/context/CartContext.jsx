import { createContext, useContext, useMemo, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [qty, setQty] = useState({}) // { [productId]: quantity }

  const value = useMemo(() => {
    const lines = products
      .filter((p) => qty[p.id])
      .map((p) => ({ ...p, qty: qty[p.id] }))
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.qty * l.price, 0),
      add: (id) => setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 })),
      remove: (id) =>
        setQty((q) => {
          const next = { ...q }
          if (next[id] > 1) next[id] -= 1
          else delete next[id]
          return next
        }),
      clear: () => setQty({}),
    }
  }, [qty])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
