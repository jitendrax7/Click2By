import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import ProductItem from '../components/ProductItem'

const PRODUCTS_PER_PAGE = 12

const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
      active
        ? 'bg-primary text-dark border-primary'
        : 'bg-transparent text-text-muted border-surface-border hover:border-primary/50 hover:text-text-primary'
    }`}
  >
    {label}
  </button>
)

const FilterIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
)

const Collection = () => {
  const { products, search, showSearch, loading } = useContext(ShopContext)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [page, setPage] = useState(1)

  const toggleCategory = (val) => {
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
    setPage(1)
  }

  const toggleSubCategory = (val) => {
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
    setPage(1)
  }

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) {
      copy = copy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length) copy = copy.filter((item) => category.includes(item.category))
    if (subCategory.length) copy = copy.filter((item) => subCategory.includes(item.subCategory))
    return copy
  }

  const sortProducts = (list) => {
    switch (sortType) {
      case 'low-high': return [...list].sort((a, b) => a.price - b.price)
      case 'high-low': return [...list].sort((a, b) => b.price - a.price)
      default: return list
    }
  }

  useEffect(() => {
    setFilterProducts(sortProducts(applyFilter()))
  }, [category, subCategory, search, showSearch, products, sortType])

  const totalPages = Math.ceil(filterProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filterProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  const activeFilters = [...category, ...subCategory]

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Page Header */}
      <div className="bg-dark-2 border-b border-surface-border">
        <div className="container-custom py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Browse</p>
          <h1 className="font-display text-4xl font-bold text-text-primary">All Collections</h1>
          <p className="text-text-muted mt-2 text-sm">{filterProducts.length} products found</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar — Desktop */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="card-dark p-5 !cursor-default !transform-none">
                <p className="text-xs uppercase tracking-widest text-text-faint font-semibold mb-4">Category</p>
                <div className="flex flex-col gap-2">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => toggleCategory(cat)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          category.includes(cat) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'
                        }`}
                      >
                        {category.includes(cat) && (
                          <svg width="8" height="8" fill="none" stroke="#0a0a0f" strokeWidth="3" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="card-dark p-5 !cursor-default !transform-none">
                <p className="text-xs uppercase tracking-widest text-text-faint font-semibold mb-4">Type</p>
                <div className="flex flex-col gap-2">
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
                    <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => toggleSubCategory(sub)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          subCategory.includes(sub) ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'
                        }`}
                      >
                        {subCategory.includes(sub) && (
                          <svg width="8" height="8" fill="none" stroke="#0a0a0f" strokeWidth="3" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {activeFilters.length > 0 && (
                <button
                  onClick={() => { setCategory([]); setSubCategory([]) }}
                  className="w-full text-sm text-text-muted hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 btn-outline text-sm !py-2 !px-4"
              >
                <FilterIcon />
                Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
              </button>

              {/* Active filter chips */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 flex-1">
                  {activeFilters.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary">
                      {f}
                      <button
                        onClick={() => category.includes(f) ? toggleCategory(f) : toggleSubCategory(f)}
                        className="hover:text-primary-light"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Sort */}
              <select
                value={sortType}
                onChange={(e) => { setSortType(e.target.value); setPage(1) }}
                className="input-dark !w-auto text-sm !py-2 !px-3 rounded-lg cursor-pointer"
                id="collection-sort"
              >
                <option value="relevant">Sort: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="card-dark overflow-hidden">
                    <div className="skeleton aspect-[3/4] rounded-t-xl rounded-b-none" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4 w-3/4 rounded" />
                      <div className="skeleton h-4 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg width="56" height="56" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p className="text-text-muted text-lg font-medium mb-2">No products found</p>
                <p className="text-text-faint text-sm">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 stagger-children">
                {paginatedProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-lg border text-sm font-medium transition-all ${
                      page === i + 1
                        ? 'bg-primary text-dark border-primary'
                        : 'border-surface-border text-text-muted hover:border-primary/50 hover:text-text-primary'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative ml-auto w-72 h-full bg-surface glass flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-surface-border">
              <p className="font-semibold text-text-primary">Filters</p>
              <button onClick={() => setFilterDrawerOpen(false)} className="text-text-muted hover:text-primary">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-faint mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <FilterChip key={cat} label={cat} active={category.includes(cat)} onClick={() => toggleCategory(cat)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-faint mb-3">Type</p>
                <div className="flex flex-wrap gap-2">
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
                    <FilterChip key={sub} label={sub} active={subCategory.includes(sub)} onClick={() => toggleSubCategory(sub)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-surface-border">
              <button onClick={() => setFilterDrawerOpen(false)} className="btn-primary w-full justify-center">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collection
