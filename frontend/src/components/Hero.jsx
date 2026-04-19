import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const SparkleIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
)

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '2K+', label: 'Products' },
  { value: '4.9★', label: 'Rating' },
]

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-2">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(201,169,110,0.05) 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, rgba(201,169,110,0.04) 0%, transparent 35%)`
          }}
        />
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container-custom w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-80px)] py-16 lg:py-0">

          {/* Left Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Badge */}
            <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
                <SparkleIcon />
                New Season Arrivals 2025
              </span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <h1 className="font-display font-bold leading-[1.1] text-text-primary">
                <span className="block text-5xl sm:text-6xl lg:text-7xl">Dress to</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-primary italic">Impress</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl">Every Day</span>
              </h1>
            </div>

            {/* Subtext */}
            <div className="animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <p className="text-text-muted text-lg leading-relaxed max-w-md">
                Discover curated fashion collections that blend style with comfort. From casual everyday wear to statement pieces — find your perfect fit.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <button
                id="hero-shop-now-btn"
                onClick={() => navigate('/collection')}
                className="btn-primary flex items-center gap-2"
              >
                Shop Now <ArrowRight />
              </button>
              <button
                id="hero-explore-btn"
                onClick={() => navigate('/collection')}
                className="btn-outline"
              >
                Explore Collections
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-surface-border" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {/* Image container with decorative frame */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
              <div className="absolute top-4 right-4 bottom-4 left-8 bg-surface-card rounded-2xl" />

              {/* Main hero image area */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-card border border-surface-border">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80"
                  alt="Click2Buy Fashion Hero"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

                {/* Floating badge — trending */}
                <div className="absolute top-4 left-4 glass px-3 py-2 rounded-full flex items-center gap-2 animate-float">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-text-primary">Trending Now</span>
                </div>

                {/* Floating badge — offer */}
                <div className="absolute bottom-4 right-4 glass px-4 py-3 rounded-xl">
                  <p className="text-xs text-text-muted">Limited Offer</p>
                  <p className="text-lg font-bold text-primary">30% OFF</p>
                  <p className="text-xs text-text-muted">New Arrivals</p>
                </div>
              </div>

              {/* Decorative dot */}
              <div className="absolute -top-6 -right-6 w-20 h-20 border border-primary/20 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-float">
        <p className="text-xs uppercase tracking-widest text-text-muted">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}

export default Hero
