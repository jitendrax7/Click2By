import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const ProductItem = ({ id, image, name, price, category }) => {
  const { currency, toggleWishlist, isWishlisted } = useContext(ShopContext)
  const wishlisted = isWishlisted(id)

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(id)
  }

  return (
    <Link to={`/product/${id}`} className="block group product-card">
      <div className="card-dark overflow-hidden">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-hover rounded-t-xl">
          <img
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover Overlay */}
          <div className="product-card-overlay">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-dark/80 text-text-muted hover:bg-primary hover:text-dark'
              }`}
              aria-label="Wishlist"
            >
              <HeartIcon filled={wishlisted} />
            </button>
            <Link
              to={`/product/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-dark/80 text-text-muted hover:bg-primary hover:text-dark flex items-center justify-center transition-all duration-200"
              aria-label="Quick view"
            >
              <EyeIcon />
            </Link>
          </div>

          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-dark/70 rounded-md">
              <span className="text-[10px] uppercase tracking-widest text-text-muted">{category}</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-text-primary text-sm font-medium leading-tight truncate group-hover:text-primary transition-colors duration-200">
            {name}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-primary font-bold text-base">
              {currency}{price}
            </p>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" fill={i < 4 ? '#c9a96e' : 'none'} stroke="#c9a96e" strokeWidth="1.5" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
