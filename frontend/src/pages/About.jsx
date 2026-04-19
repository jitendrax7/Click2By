import React from 'react'
import NewsletterBox from '../components/NewsletterBox'

const values = [
  {
    id: 'quality',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Quality Assurance',
    description: 'Every garment passes through a rigorous 12-point quality check before it reaches your doorstep. We accept nothing less than perfection.',
  },
  {
    id: 'convenience',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Convenience First',
    description: 'Shop from anywhere, anytime. Our mobile-first experience ensures your style journey is just a tap away, with fast checkout and easy returns.',
  },
  {
    id: 'service',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Exceptional Service',
    description: 'Our dedicated support team is available 24/7 to help with sizing, styling advice, or any questions along the way.',
  },
]

const About = () => {
  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Hero section */}
      <div className="bg-dark-2 border-b border-surface-border">
        <div className="container-custom py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-semibold">Our Story</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-4">
            About <span className="italic text-primary">Click2Buy</span>
          </h1>
          <p className="text-text-muted max-w-lg mx-auto leading-relaxed">
            Born from a passion for accessible luxury fashion.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/20 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&auto=format&fit=crop&q=80"
                alt="About Click2Buy"
                className="relative rounded-2xl w-full shadow-card aspect-[4/3] object-cover"
              />
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary mb-3">Who We Are</p>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                  Fashion made <span className="italic">accessible</span>
                </h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                Click2Buy was founded with a simple belief: great style shouldn't come with a hefty price tag or confusing shopping experience. We curate premium clothing from trusted designers and make it easy for everyone to dress their best.
              </p>
              <p className="text-text-muted leading-relaxed">
                From everyday essentials to statement pieces, every item in our collection is hand-picked for quality, style, and value. We believe fashion is a form of self-expression, and we're here to help you express yours.
              </p>
              <div>
                <p className="font-semibold text-text-primary mb-2">Our Mission</p>
                <p className="text-text-muted leading-relaxed">
                  To democratize fashion by delivering premium quality clothing at honest prices, with a shopping experience that's fast, easy, and enjoyable from browse to doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark-2 border-y border-surface-border py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center stagger-children">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '2,000+', label: 'Products Listed' },
              { value: '99%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <div key={stat.label} className="card-dark p-6 !cursor-default">
                <p className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">Our Promise</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Why Choose <span className="italic text-primary">Us</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {values.map((val) => (
              <div key={val.id} className="card-dark p-8 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-dark transition-all duration-300">
                  {val.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-3">{val.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  )
}

export default About
