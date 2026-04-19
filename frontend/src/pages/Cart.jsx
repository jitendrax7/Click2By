import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { Link } from 'react-router-dom'
import CartTotal from '../components/CartTotal'
import Popup from '../components/Popup'

const TrashIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [onClose, setOnClose] = useState(false)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const temp = []
      for (const itemId in cartItems) {
        for (const s in cartItems[itemId]) {
          if (cartItems[itemId][s] > 0) {
            temp.push({ _id: itemId, size: s, quantity: cartItems[itemId][s] })
          }
        }
      }
      setCartData(temp)
    }
  }, [cartItems, products])

  const isEmpty = cartData.length === 0

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="container-custom py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Your</p>
          <h1 className="font-display text-4xl font-bold text-text-primary">Shopping Cart</h1>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mb-6">
              <svg width="36" height="36" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Your cart is empty</h2>
            <p className="text-text-muted mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/collection" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartData.map((item, index) => {
                const product = products.find((p) => p._id === item._id)
                if (!product) return null
                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="card-dark p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 !cursor-default !transform-none animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
                  >
                    {/* Image */}
                    <Link to={`/product/${item._id}`} className="shrink-0">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item._id}`}>
                        <p className="text-text-primary font-medium hover:text-primary transition-colors truncate">
                          {product.name}
                        </p>
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-primary font-bold">{currency}{product.price}</span>
                        <span className="text-xs px-2 py-0.5 bg-surface-hover border border-surface-border rounded text-text-muted">
                          {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Quantity + Delete */}
                    <div className="flex items-center gap-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover transition-all"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm text-text-primary font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary hover:bg-surface-hover transition-all"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-text-primary font-semibold w-16 text-right">
                        {currency}{(product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-text-faint hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <CartTotal />

                {/* Promo Code */}
                <div className="card-dark p-4 !cursor-default !transform-none">
                  <p className="text-xs uppercase tracking-widest text-text-faint mb-3">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="input-dark flex-1 text-sm !py-2"
                    />
                    <button className="btn-outline !py-2 !px-4 text-xs">Apply</button>
                  </div>
                </div>

                <button
                  id="cart-checkout-btn"
                  onClick={() => cartData.length > 0 ? navigate('/place-order') : setOnClose(true)}
                  className="btn-primary w-full justify-center text-base"
                >
                  Proceed to Checkout
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>

                <Link to="/collection" className="block text-center text-sm text-text-muted hover:text-primary transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <Popup onClose={setOnClose} status="red" message="Please add items to your cart before checking out." />
      )}
    </div>
  )
}

export default Cart
