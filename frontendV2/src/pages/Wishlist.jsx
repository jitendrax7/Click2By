import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import ProductItem from '../components/ProductItem'

const Wishlist = () => {
  const { products, wishlist, toggleWishlist } = useContext(ShopContext)

  const wishlistProducts = products.filter((p) => wishlist.includes(p._id))

  const clearAll = () => {
    // Copy array first since toggleWishlist mutates state
    ;[...wishlist].forEach((id) => toggleWishlist(id))
  }

  return (
    <div className="min-h-screen bg-dark pt-20">

      {/* ── Page Header ── */}
      <div className="bg-[#0d0d14] border-b border-[#2a2a38]">
        <div className="container-custom py-7 md:py-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-1.5 font-semibold">Saved Items</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary">My Wishlist</h1>
              {wishlistProducts.length > 0 && (
                <p className="text-[#9b9b9b] mt-1 text-sm">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
                </p>
              )}
            </div>

            {wishlistProducts.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-[#555566] hover:text-red-400 transition-colors border border-[#2a2a38] hover:border-red-500/30 rounded-lg px-3 py-2"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-10">

        {wishlistProducts.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-20 md:py-28 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center mb-6">
              <svg width="38" height="38" fill="none" stroke="#555566" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-[#9b9b9b] text-sm mb-8 max-w-xs leading-relaxed">
              Save your favourite items and come back to them anytime. Start browsing our collections!
            </p>
            <Link to="/collection" className="btn-primary">
              Browse Collections
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

        ) : (
          /* ── Product Grid ── */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 stagger-children">
            {wishlistProducts.map((item) => (
              <div key={item._id} className="relative group">
                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(item._id)}
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 shadow-lg"
                >
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
