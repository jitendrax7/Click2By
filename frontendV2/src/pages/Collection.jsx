import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import ProductItem from '../components/ProductItem'

const PRODUCTS_PER_PAGE = 12

const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
      active
        ? 'bg-primary text-dark border-primary'
        : 'bg-transparent text-text-muted border-surface-border hover:border-primary/50 hover:text-text-primary'
    }`}
  >
    {label}
  </button>
)

const CheckRow = ({ label, checked, onClick }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1">
    <div
      onClick={onClick}
      className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
        checked ? 'bg-primary border-primary' : 'border-surface-border group-hover:border-primary/50'
      }`}
    >
      {checked && (
        <svg width="8" height="8" fill="none" stroke="#0a0a0f" strokeWidth="3" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors select-none">
      {label}
    </span>
  </label>
)

const sortOptions = [
  { value: 'relevant', label: 'Most Relevant',    icon: '✦' },
  { value: 'low-high', label: 'Price: Low → High', icon: '↑' },
  { value: 'high-low', label: 'Price: High → Low', icon: '↓' },
]

// Custom sort dropdown — lives outside Collection so it doesn't remount
const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = sortOptions.find((o) => o.value === value) || sortOptions[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative select-none" id="collection-sort">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2.5 text-sm font-medium border rounded-lg px-3.5 py-2 transition-all duration-200 ${
          open
            ? 'border-primary text-text-primary bg-[#1a1a24]'
            : 'border-[#2a2a38] text-[#9b9b9b] hover:border-primary/50 hover:text-text-primary bg-[#1a1a24]'
        }`}
      >
        <span className="text-primary text-xs">{selected.icon}</span>
        <span>{selected.label}</span>
        <svg
          width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" viewBox="0 0 24 24"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a24] border border-[#2a2a38] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-30"
          style={{ animation: 'scaleIn 0.18s ease forwards', transformOrigin: 'top right' }}
        >
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                opt.value === value
                  ? 'text-primary bg-primary/8 font-semibold'
                  : 'text-[#9b9b9b] hover:text-text-primary hover:bg-[#22222e]'
              }`}
            >
              <span className={`text-base w-4 text-center ${opt.value === value ? 'text-primary' : 'text-[#555566]'}`}>
                {opt.icon}
              </span>
              {opt.label}
              {opt.value === value && (
                <svg className="ml-auto" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const Collection = () => {
  const { products, search, showSearch, loading } = useContext(ShopContext)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [page, setPage] = useState(1)

  const toggleCategory = (val) => {
    setCategory((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val])
    setPage(1)
  }

  const toggleSubCategory = (val) => {
    setSubCategory((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val])
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

  const SkeletonCard = () => (
    <div className="card-dark overflow-hidden !transform-none !cursor-default">
      <div className="skeleton aspect-[3/4] rounded-t-xl rounded-b-none" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark pt-20">

      {/* ── Page Header ── */}
      <div className="bg-dark-2 border-b border-surface-border">
        <div className="container-custom py-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Browse</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary">All Collections</h1>
          <p className="text-text-muted mt-1 text-sm">{filterProducts.length} products found</p>
        </div>
      </div>

      <div className="container-custom pt-5 pb-6 sm:pt-7 md:pt-8 md:pb-8">

        {/* ── Toolbar ── */}
        <div className="mb-5 mt-5 space-y-3">
          {/* Row 1: filter toggle (left) + sort (right) */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="xl:hidden inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary border border-surface-border hover:border-primary/40 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              Filters{activeFilters.length > 0 && (
                <span className="ml-0.5 w-4 h-4 bg-primary text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>

            <SortDropdown
              value={sortType}
              onChange={(val) => { setSortType(val); setPage(1) }}
            />
          </div>

          {/* Row 2: active filter chips (only when filters selected) */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary"
                >
                  {f}
                  <button
                    onClick={() => category.includes(f) ? toggleCategory(f) : toggleSubCategory(f)}
                    className="hover:text-primary-light leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={() => { setCategory([]); setSubCategory([]) }}
                className="text-xs text-[#555566] hover:text-red-400 transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>


        {/* ── Body: Sidebar + Grid ── */}
        <div className="flex gap-6 xl:gap-8 items-start">

          {/* ── Sidebar (desktop only, xl+) ── */}
          <aside className="hidden xl:block w-56 shrink-0 sticky top-24 space-y-4">
            {/* Category */}
            <div className="card-dark p-5 !cursor-default !transform-none">
              <p className="text-xs uppercase tracking-widest text-text-faint font-semibold mb-3">Category</p>
              <div className="flex flex-col gap-0.5">
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <CheckRow key={cat} label={cat} checked={category.includes(cat)} onClick={() => toggleCategory(cat)} />
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="card-dark p-5 !cursor-default !transform-none">
              <p className="text-xs uppercase tracking-widest text-text-faint font-semibold mb-3">Type</p>
              <div className="flex flex-col gap-0.5">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
                  <CheckRow key={sub} label={sub} checked={subCategory.includes(sub)} onClick={() => toggleSubCategory(sub)} />
                ))}
              </div>
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={() => { setCategory([]); setSubCategory([]) }}
                className="w-full text-xs text-text-faint hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear all filters
              </button>
            )}
          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg width="52" height="52" fill="none" stroke="#555566" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-text-muted text-lg font-medium mb-1">No products found</p>
                <p className="text-text-faint text-sm">Try adjusting your filters or search terms.</p>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => { setCategory([]); setSubCategory([]) }}
                    className="mt-4 btn-outline text-sm !py-2"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
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

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
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
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
            onClick={() => setFilterDrawerOpen(false)}
          />
          <div className="relative ml-auto w-72 h-full bg-surface glass flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-surface-border">
              <p className="font-semibold text-text-primary">Filters</p>
              <button onClick={() => setFilterDrawerOpen(false)} className="text-text-muted hover:text-primary">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

            <div className="p-5 border-t border-surface-border flex gap-3">
              {activeFilters.length > 0 && (
                <button
                  onClick={() => { setCategory([]); setSubCategory([]) }}
                  className="btn-outline flex-1 text-sm !py-2.5"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="btn-primary flex-1 justify-center text-sm !py-2.5"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collection
