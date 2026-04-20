import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'

/* ── Icons ──────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)
const CartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const HeartIcon = ({ filled }) => (
  <svg width="19" height="19" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const UserIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const OrdersIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
)
const SignOutIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

const Navbar = () => {
  const { getCartCount, token, logout, navigate, search, setSearch, setShowSearch, wishlist } = useContext(ShopContext)
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const searchInputRef = useRef(null)

  /* scroll glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* auto-focus search */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus()
  }, [searchOpen])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      setShowSearch(true)
      navigate('/collection')
      setSearchOpen(false)
    }
  }

  const closeMobile = () => setMobileOpen(false)
  const cartCount   = getCartCount()

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-[0_1px_0_rgba(201,169,110,0.1)]' : 'bg-transparent'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMobile}>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-dark font-display font-bold text-xs md:text-sm">C</span>
              </div>
              <span className="font-display font-bold text-lg md:text-xl tracking-tight text-text-primary group-hover:text-primary transition-colors duration-200">
                Click<span className="text-primary">2</span>Buy
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active !text-text-primary' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1 md:gap-2">

              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 animate-fade-in">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="hidden md:block w-40 lg:w-56 bg-[#1a1a24] border border-[#2a2a38] rounded-full px-4 py-1.5 text-sm text-text-primary placeholder-[#555566] outline-none focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearch('') }}
                      className="text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                    >
                      <CloseIcon />
                    </button>
                  </form>
                ) : (
                  <button
                    id="navbar-search-btn"
                    onClick={() => setSearchOpen(true)}
                    className="text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </button>
                )}
              </div>

              {/* Wishlist — visible on all sizes */}
              <Link
                to="/wishlist"
                className="relative text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                aria-label="Wishlist"
              >
                <HeartIcon filled={wishlist.length > 0} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-primary text-dark text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                id="navbar-cart-btn"
                className="relative text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                aria-label="Cart"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-primary text-dark text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login button (desktop only, when logged out) */}
              {!token && (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden md:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-dark bg-primary hover:bg-primary-light px-3 py-1.5 rounded transition-all duration-200"
                >
                  Login
                </button>
              )}

              {/* Hamburger — always shown on mobile */}
              <button
                id="navbar-menu-btn"
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>

              {/* Desktop: profile icon (only when logged in) */}
              {token && (
                <button
                  onClick={() => setMobileOpen(true)}
                  className="hidden md:flex text-[#9b9b9b] hover:text-primary transition-colors p-1.5"
                  aria-label="Account menu"
                >
                  <UserIcon />
                </button>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 animate-fade-up">
              <div className="flex items-center gap-2 bg-[#1a1a24] border border-[#2a2a38] rounded-full px-4 py-2">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder-[#555566] outline-none"
                />
                <button type="button" onClick={() => { setSearchOpen(false); setSearch('') }} className="text-[#9b9b9b]">
                  <CloseIcon />
                </button>
              </div>
            </form>
          )}
        </div>
      </header>

      {/* ══════════════ SIDEBAR / MOBILE MENU ══════════════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeMobile}
          />

          {/* Panel */}
          <div className="relative ml-auto w-[280px] sm:w-80 h-full bg-[#111118] border-l border-[#2a2a38] flex flex-col animate-slide-in-right">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#2a2a38]">
              <span className="font-display font-bold text-lg text-text-primary">
                Click<span className="text-primary">2</span>Buy
              </span>
              <button onClick={closeMobile} className="text-[#9b9b9b] hover:text-primary transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* ── Profile section (shown when logged in) ── */}
            {token && (
              <div className="px-5 py-4 border-b border-[#2a2a38] bg-[#1a1a24]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <UserIcon />
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-semibold">My Account</p>
                    <p className="text-[#555566] text-xs">Signed in</p>
                  </div>
                </div>

                {/* Account quick links */}
                <div className="mt-4 space-y-1">
                  <button
                    onClick={() => { navigate('/orders'); closeMobile() }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9b9b9b] hover:text-text-primary hover:bg-[#2a2a38] transition-all text-left"
                  >
                    <OrdersIcon />
                    My Orders
                  </button>
                  <button
                    onClick={() => { navigate('/wishlist'); closeMobile() }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9b9b9b] hover:text-text-primary hover:bg-[#2a2a38] transition-all text-left"
                  >
                    <HeartIcon />
                    My Wishlist
                    {wishlist.length > 0 && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-[#9b9b9b] hover:text-text-primary hover:bg-[#1a1a24]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Wishlist link (visible in nav for quick access on mobile) */}
              <NavLink
                to="/wishlist"
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-[#9b9b9b] hover:text-text-primary hover:bg-[#1a1a24]'
                  }`
                }
              >
                Wishlist
                {wishlist.length > 0 && (
                  <span className="ml-auto text-xs bg-primary/20 text-primary font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </NavLink>
            </nav>

            {/* Bottom auth buttons */}
            <div className="px-5 py-5 border-t border-[#2a2a38] space-y-2">
              {token ? (
                <button
                  onClick={() => { logout(); closeMobile() }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#2a2a38] text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 hover:border-red-500/30 transition-all"
                >
                  <SignOutIcon />
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { navigate('/login'); closeMobile() }}
                    className="w-full btn-primary justify-center text-sm"
                  >
                    Sign In
                  </button>
                  <p className="text-center text-xs text-[#555566]">
                    Don't have an account?{' '}
                    <button
                      onClick={() => { navigate('/login'); closeMobile() }}
                      className="text-primary hover:underline"
                    >
                      Register
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
