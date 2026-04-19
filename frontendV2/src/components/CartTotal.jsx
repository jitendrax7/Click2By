import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  const subtotal = getCartAmount() || 0
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="card-dark p-6 !cursor-default !transform-none">
      <Title text1="Order" text2="Summary" />

      <div className="space-y-4 mt-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="text-text-primary font-medium">{currency}{subtotal.toFixed(2)}</span>
        </div>

        <div className="h-px bg-surface-border" />

        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Shipping</span>
          <span className="text-text-primary font-medium">
            {subtotal === 0 ? '—' : `${currency}${delivery_fee}.00`}
          </span>
        </div>

        <div className="h-px bg-surface-border" />

        <div className="flex justify-between items-center">
          <span className="text-text-primary font-semibold">Total</span>
          <span className="text-primary font-bold text-xl font-display">{currency}{total.toFixed(2)}</span>
        </div>

        {subtotal > 0 && subtotal < 50 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs text-primary">
            Add {currency}{(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTotal
