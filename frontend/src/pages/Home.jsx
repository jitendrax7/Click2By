import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const categories = [
  {
    id: 'men',
    label: "Men's",
    subtitle: 'Sharp & Sophisticated',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
    filter: 'Men',
  },
  {
    id: 'women',
    label: "Women's",
    subtitle: 'Elegant & Bold',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    filter: 'Women',
  },
  {
    id: 'kids',
    label: "Kids'",
    subtitle: 'Fun & Comfortable',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop&q=80',
    filter: 'Kids',
  },
]

const PromoBanner = () => (
  <section className="bg-primary py-5 overflow-hidden">
    <div className="flex animate-[shimmerScroll_20s_linear_infinite] whitespace-nowrap">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="inline-flex items-center gap-6 mx-8 text-dark text-sm font-semibold uppercase tracking-widest">
          <span>Free Shipping Over $50</span>
          <span className="w-1.5 h-1.5 rounded-full bg-dark/40 inline-block" />
          <span>New Arrivals Every Week</span>
          <span className="w-1.5 h-1.5 rounded-full bg-dark/40 inline-block" />
          <span>Easy 7-Day Returns</span>
          <span className="w-1.5 h-1.5 rounded-full bg-dark/40 inline-block" />
        </span>
      ))}
    </div>
  </section>
)

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Promo Ticker */}
      <PromoBanner />

      {/* Categories */}
      <section className="section bg-dark-2">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">Shop by</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Browse <span className="italic text-primary">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/collection?category=${cat.filter}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-primary mb-1">{cat.subtitle}</p>
                  <h3 className="font-display text-2xl font-bold text-text-primary">{cat.label}</h3>
                  <div className="flex items-center gap-2 mt-3 text-text-muted text-sm group-hover:text-primary transition-colors">
                    Shop Now
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
