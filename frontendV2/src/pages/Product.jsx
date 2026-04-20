import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import RelatedProducts from '../components/ReletedProducts'
import { toast } from '../components/Notify'

const StarRating = ({ rating = 4, count = 122 }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" fill={i < rating ? '#c9a96e' : 'none'} stroke="#c9a96e" strokeWidth="1.5" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
    <span className="text-text-muted text-sm">({count} reviews)</span>
  </div>
)

const tabs = ['Description', 'Reviews', 'Sizing Guide']

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, toggleWishlist, isWishlisted } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('Description')
  const [adding, setAdding] = useState(false)

  // Scroll to top whenever the product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId])

  useEffect(() => {
    const found = products.find((item) => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image[0])
      setSize('')
    }
  }, [productId, products])

  const handleAddToCart = async () => {
    if (!size) { toast.error('Please select a size'); return }
    setAdding(true)
    await addToCart(productData._id, size)
    setTimeout(() => setAdding(false), 800)
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-dark pt-20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="skeleton aspect-square rounded-2xl" />
            <div className="space-y-4 pt-6">
              <div className="skeleton h-8 w-2/3 rounded" />
              <div className="skeleton h-6 w-1/3 rounded" />
              <div className="skeleton h-24 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Collection', to: '/collection' },
    { label: productData.category, to: `/collection` },
    { label: productData.name },
  ]

  return (
    <div className="min-h-screen bg-dark pt-20 animate-fade-in">
      <div className="container-custom py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-faint mb-8">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-primary transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-text-muted">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">

          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto hide-scrollbar sm:max-h-[520px] sm:w-20">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImage(img)}
                  className={`shrink-0 w-16 sm:w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    image === img ? 'border-primary' : 'border-surface-border hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt={`${productData.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group w-full flex items-start">
              <div className="w-full rounded-2xl overflow-hidden bg-surface-card flex items-center justify-center">
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Wishlist button on image */}
              <button
                onClick={() => toggleWishlist(productData._id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isWishlisted(productData._id)
                    ? 'bg-red-500 text-white'
                    : 'glass text-text-muted hover:text-red-400'
                }`}
              >
                <svg width="18" height="18" fill={isWishlisted(productData._id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-2">{productData.category}</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
                {productData.name}
              </h1>
            </div>

            <StarRating />

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold font-display text-primary">
                {currency}{productData.price}
              </span>
              <span className="text-text-faint text-sm line-through">
                {currency}{Math.round(productData.price * 1.3)}
              </span>
              <span className="text-xs px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 font-medium">
                Save 30%
              </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed">
              {productData.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-text-primary">Select Size</p>
                <button className="text-xs text-primary hover:text-primary-light transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s === size ? '' : s)}
                    className={`w-12 h-12 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${
                      s === size
                        ? 'bg-primary text-dark border-primary shadow-glow-gold-sm'
                        : 'bg-transparent text-text-muted border-surface-border hover:border-primary/60 hover:text-text-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <button
                id="product-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary flex-1 justify-center min-w-[160px]"
              >
                {adding ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Adding...
                  </span>
                ) : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(productData._id)}
                className={`btn-outline px-5 ${isWishlisted(productData._id) ? '!border-red-500 !text-red-400' : ''}`}
              >
                <svg width="16" height="16" fill={isWishlisted(productData._id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: '100% Authentic', icon: '✓' },
                { label: 'Free Returns', icon: '↩' },
                { label: '7-Day Return', icon: '🛡' },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-3 rounded-lg bg-surface-card border border-surface-border">
                  <p className="text-primary text-lg mb-1">{badge.icon}</p>
                  <p className="text-text-faint text-[10px] uppercase tracking-wider">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-surface-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary -mb-px'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-8 text-text-muted text-sm leading-relaxed">
            {activeTab === 'Description' && (
              <p>
                {productData.description} This garment is crafted from premium materials, ensuring both comfort and durability. Perfect for everyday wear and designed to maintain its quality wash after wash. Each piece is individually quality-checked before dispatch.
              </p>
            )}
            {activeTab === 'Reviews' && (
              <div className="space-y-6">
                {[
                  { name: 'Sarah M.', rating: 5, comment: 'Absolutely love this! The quality is superb and the fit is perfect.', date: '2 days ago' },
                  { name: 'James T.', rating: 4, comment: 'Great product, fast delivery. Would definitely order again.', date: '1 week ago' },
                ].map((review, i) => (
                  <div key={i} className="card-dark p-4 !cursor-default !transform-none">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-text-primary font-medium text-sm">{review.name}</p>
                        <StarRating rating={review.rating} count={null} />
                      </div>
                      <span className="text-xs text-text-faint">{review.date}</span>
                    </div>
                    <p className="text-text-muted text-sm mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Sizing Guide' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-surface-border">
                      {['Size', 'Chest (in)', 'Waist (in)', 'Hip (in)'].map((h) => (
                        <th key={h} className="text-left py-2 px-4 text-text-faint font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[['S', '34-36', '28-30', '36-38'], ['M', '38-40', '32-34', '40-42'], ['L', '42-44', '36-38', '44-46'], ['XL', '46-48', '40-42', '48-50']].map((row) => (
                      <tr key={row[0]} className="border-b border-surface-border hover:bg-surface-hover transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`py-2.5 px-4 ${ci === 0 ? 'text-primary font-semibold' : 'text-text-muted'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
      </div>
    </div>
  )
}

export default Product
