import React from 'react'

const policies = [
  {
    id: 'exchange',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'Easy Exchange',
    description: 'Hassle-free exchange within 7 days. No questions asked.',
  },
  {
    id: 'return',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: '7-Day Returns',
    description: 'Free returns on all orders. Your satisfaction is guaranteed.',
  },
  {
    id: 'support',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: '24/7 Support',
    description: 'Real humans, always available. We\'re here whenever you need us.',
  },
  {
    id: 'shipping',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Free Shipping',
    description: 'Free delivery on all orders over $50. Fast and reliable.',
  },
]

const OurPolicy = () => {
  return (
    <section className="section bg-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="card-dark p-6 flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark group-hover:shadow-glow-gold transition-all duration-300">
                {policy.icon}
              </div>
              <div>
                <p className="font-semibold text-text-primary mb-1">{policy.title}</p>
                <p className="text-text-muted text-sm leading-relaxed">{policy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
