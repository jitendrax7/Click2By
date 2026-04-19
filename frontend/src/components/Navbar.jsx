import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'

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

const HeartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const { getCartCount, token, logout, navigate, search, setSearch, setShowSearch } = useContext(ShopContext)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchInputRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
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

  const cartCount = getCartCount()

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark shadow-[0_1px_0_rgba(201,169,110,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-dark font-display font-bold text-sm">C</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-text-primary group-hover:text-primary transition-colors duration-200">
                Click<span className="text-primary">2</span>Buy
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active !text-text-primary' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">

              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 animate-fade-in">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="hidden md:block w-48 lg:w-64 bg-surface-card border border-surface-border rounded-full px-4 py-1.5 text-sm text-text-primary placeholder-text-faint outline-none focus:border-primary transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearch('') }}
                      className="text-text-muted hover:text-primary transition-colors"
                    >
                      <CloseIcon />
                    </button>
                  </form>
                ) : (
                  <button
                    id="navbar-search-btn"
                    onClick={() => setSearchOpen(true)}
                    className="text-text-muted hover:text-primary transition-colors duration-200 p-1"
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/collection"
                className="hidden sm:block text-text-muted hover:text-primary transition-colors duration-200 p-1"
                aria-label="Wishlist"
              >
                <HeartIcon />
              </Link>

              {/* Profile / Auth */}
              <div className="relative" ref={profileRef}>
                <button
                  id="navbar-profile-btn"
                  onClick={() => token ? setProfileOpen(p => !p) : navigate('/login')}
                  className="text-text-muted hover:text-primary transition-colors duration-200 p-1"
                  aria-label="Account"
                >
                  <UserIcon />
                </button>
                {token && profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 glass-dark rounded-xl border border-surface-border shadow-card overflow-hidden animate-scale-in">
                    <div className="py-2">
                      <button
                        onClick={() => { navigate('/orders'); setProfileOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={() => { navigate('/place-order'); setProfileOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                      >
                        Checkout
                      </button>
                      <div className="border-t border-surface-border my-1" />
                      <button
                        onClick={() => { logout(); setProfileOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                id="navbar-cart-btn"
                className="relative text-text-muted hover:text-primary transition-colors duration-200 p-1"
                aria-label="Cart"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-primary text-dark text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Hamburger (mobile) */}
              <button
                id="navbar-menu-btn"
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-text-muted hover:text-primary transition-colors p-1"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>

          {/* Mobile search bar (below header on search open) */}
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 animate-fade-up">
              <div className="flex items-center gap-2 bg-surface-card border border-surface-border rounded-full px-4 py-2">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-faint outline-none"
                />
                <button type="button" onClick={() => { setSearchOpen(false); setSearch('') }} className="text-text-muted">
                  <CloseIcon />
                </button>
              </div>
            </form>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto w-72 h-full bg-surface glass shadow-card flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-6 border-b border-surface-border">
              <span className="font-display font-bold text-lg text-text-primary">
                Click<span className="text-primary">2</span>Buy
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-muted hover:text-primary transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 flex flex-col px-6 py-8 gap-1 stagger-children">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-sm font-medium uppercase tracking-widest transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="p-6 border-t border-surface-border space-y-3">
              {token ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false) }}
                  className="w-full btn-outline text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setMobileOpen(false) }}
                  className="w-full btn-primary text-sm justify-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
