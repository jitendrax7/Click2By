import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import axios from 'axios'

const statusConfig = {
  'Order Placed': { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  'Packing': { color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  'Shipped': { color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  'Out for delivery': { color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
  'Delivered': { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
}

const getStatusStyle = (status) =>
  statusConfig[status] || { color: 'text-text-muted', bg: 'bg-surface-hover border-surface-border' }

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (res.data.success) {
        const allItems = []
        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })
        setOrderData(allItems.reverse())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="container-custom py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Account</p>
          <h1 className="font-display text-4xl font-bold text-text-primary">My Orders</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-dark p-5 flex gap-5 !cursor-default !transform-none">
                <div className="skeleton w-20 h-20 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-1/2 rounded" />
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton h-4 w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mb-6">
              <svg width="36" height="36" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1" ry="1"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">No orders yet</h2>
            <p className="text-text-muted mb-8">Your order history will appear here once you make a purchase.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orderData.map((item, index) => {
              const { color, bg } = getStatusStyle(item.status)
              return (
                <div
                  key={index}
                  className="card-dark p-5 !cursor-default !transform-none animate-fade-up"
                  style={{ animationDelay: `${index * 0.04}s`, animationFillMode: 'both' }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Product image */}
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium truncate">{item.name}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-text-muted">
                        <span className="text-primary font-bold">{currency}{item.price}</span>
                        <span>Qty: {item.quantity}</span>
                        <span className="px-2 py-0.5 border border-surface-border rounded text-xs">{item.size}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-faint">
                        <span>Ordered: {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>Via: {item.paymentMethod}</span>
                        {item.payment && (
                          <span className="text-green-400">✓ Paid</span>
                        )}
                      </div>
                    </div>

                    {/* Status + Track */}
                    <div className="flex flex-col sm:items-end gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${bg} ${color}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                      <button
                        onClick={loadOrderData}
                        className="btn-outline !py-2 !px-4 text-xs"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
