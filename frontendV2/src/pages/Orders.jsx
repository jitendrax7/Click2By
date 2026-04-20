import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import axios from 'axios'

const statusConfig = {
  'Order Placed':     { dot: 'bg-blue-400',   pill: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  'Packing':          { dot: 'bg-yellow-400', pill: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  'Shipped':          { dot: 'bg-purple-400', pill: 'text-purple-400 bg-purple-400/10 border-purple-400/30' },
  'Out for delivery': { dot: 'bg-orange-400', pill: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
  'Delivered':        { dot: 'bg-green-400',  pill: 'text-green-400 bg-green-400/10 border-green-400/30' },
}
const getStatus = (s) => statusConfig[s] || { dot: 'bg-[#555566]', pill: 'text-[#9b9b9b] bg-[#1a1a24] border-[#2a2a38]' }

const RefreshIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
)

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadOrderData = async (silent = false) => {
    if (!token) { setLoading(false); return }
    silent ? setRefreshing(true) : setLoading(true)
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
      setRefreshing(false)
    }
  }

  useEffect(() => { loadOrderData() }, [token])

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="container-custom py-8 md:py-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Account</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary">My Orders</h1>
            {orderData.length > 0 && (
              <p className="text-[#9b9b9b] text-sm mt-1">{orderData.length} item{orderData.length !== 1 ? 's' : ''} total</p>
            )}
          </div>
          {/* Refresh */}
          {token && !loading && (
            <button
              onClick={() => loadOrderData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 text-xs text-[#9b9b9b] hover:text-primary transition-colors border border-[#2a2a38] hover:border-primary/40 rounded-lg px-3 py-2"
            >
              <span className={refreshing ? 'animate-spin' : ''}><RefreshIcon /></span>
              Refresh
            </button>
          )}
        </div>

        {/* Not logged in */}
        {!token ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center mb-6">
              <svg width="36" height="36" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Sign in to view orders</h2>
            <p className="text-[#9b9b9b] mb-8 text-sm max-w-xs">Please sign in to your account to see your order history.</p>
            <button onClick={() => navigate('/login')} className="btn-primary">Sign In</button>
          </div>

        ) : loading ? (
          /* Skeleton */
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#1a1a24] border border-[#2a2a38] rounded-xl p-4 sm:p-5 flex gap-4">
                <div className="skeleton w-20 h-20 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2.5 py-1">
                  <div className="skeleton h-4 w-2/3 rounded" />
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton h-4 w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>

        ) : orderData.length === 0 ? (
          /* Empty */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center mb-6">
              <svg width="36" height="36" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">No orders yet</h2>
            <p className="text-[#9b9b9b] mb-8 text-sm">Your order history will appear here once you make a purchase.</p>
            <Link to="/collection" className="btn-primary">Start Shopping</Link>
          </div>

        ) : (
          /* Orders list */
          <div className="space-y-3 md:space-y-4">
            {orderData.map((item, index) => {
              const { dot, pill } = getStatus(item.status)
              return (
                <div
                  key={index}
                  className="bg-[#1a1a24] border border-[#2a2a38] hover:border-[rgba(201,169,110,0.2)] rounded-xl p-4 sm:p-5 transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${index * 0.04}s`, animationFillMode: 'both' }}
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shrink-0 bg-[#0a0a0f]"
                    />

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-text-primary font-semibold text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-none">
                          {item.name}
                        </p>
                        {/* Status pill */}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold shrink-0 ${pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                          {item.status}
                        </span>
                      </div>

                      {/* Price + Size + Qty */}
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-primary font-bold text-sm">{currency}{item.price}</span>
                        <span className="text-xs text-[#9b9b9b]">×{item.quantity}</span>
                        <span className="text-xs px-1.5 py-0.5 border border-[#2a2a38] rounded text-[#9b9b9b]">{item.size}</span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#555566]">
                        <span>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="opacity-40">·</span>
                        <span>{item.paymentMethod}</span>
                        {item.payment && (
                          <>
                            <span className="opacity-40">·</span>
                            <span className="text-green-400 font-medium">✓ Paid</span>
                          </>
                        )}
                      </div>

                      {/* Track button — inline on desktop */}
                      <button
                        onClick={() => loadOrderData(true)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#9b9b9b] hover:text-primary transition-colors border border-[#2a2a38] hover:border-primary/40 rounded-lg px-3 py-1.5"
                      >
                        <RefreshIcon />
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
