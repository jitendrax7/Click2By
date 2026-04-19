import React, { useState } from 'react'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="relative overflow-hidden bg-dark-2 py-20">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 65%)'
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container-custom relative text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-semibold">Newsletter</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Get 20% off your<br />
            <span className="italic text-primary">first order</span>
          </h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Subscribe to receive exclusive offers, style guides, and early access to new collections.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-green-400 animate-scale-in">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p className="font-medium">You're subscribed! Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="input-dark flex-1 rounded-lg"
                id="newsletter-email"
              />
              <button
                type="submit"
                id="newsletter-submit-btn"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-text-faint text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterBox
