import React, { useState } from 'react'
import NewsletterBox from '../components/NewsletterBox'
import { toast } from '../components/Notify'

const contactInfo = [
  {
    id: 'address',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    value: '547009 Willms Station, Suite 350\nWashington, USA',
  },
  {
    id: 'phone',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+1 (485) 555-0757',
  },
  {
    id: 'email',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'admin@click2buy.com',
  },
  {
    id: 'hours',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Hours',
    value: 'Mon–Fri: 9am–6pm EST\nSat–Sun: 10am–4pm EST',
  },
]

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const onChange = (e) => setFormData((d) => ({ ...d, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success('Message sent! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Page Header */}
      <div className="bg-dark-2 border-b border-surface-border">
        <div className="container-custom py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-semibold">Get in Touch</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-4">
            Contact <span className="italic text-primary">Us</span>
          </h1>
          <p className="text-text-muted max-w-md mx-auto">
            Have a question, a style query, or just want to say hello? We're here for it.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left — Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Our Store</h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  Visit us, call us, or shoot us an email — we love hearing from our community.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.id} className="card-dark p-4 flex items-start gap-4 !cursor-default !transform-none">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-faint mb-1">{info.label}</p>
                      <p className="text-text-muted text-sm whitespace-pre-line">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Careers CTA */}
              <div className="card-dark p-6 border-primary/20 !cursor-default !transform-none">
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">Careers at Click2Buy</h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">
                  Join our growing team building the future of fashion e-commerce.
                </p>
                <button className="btn-outline text-sm">
                  View Open Positions
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div>
              <div className="card-dark p-6 sm:p-8 !cursor-default !transform-none">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">Send a Message</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-text-faint mb-1.5">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Your name"
                        required
                        className="input-dark"
                        id="contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-text-faint mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Your email"
                        required
                        className="input-dark"
                        id="contact-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-faint mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={onChange}
                      placeholder="How can we help?"
                      className="input-dark"
                      id="contact-subject"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-faint mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={onChange}
                      placeholder="Tell us more..."
                      required
                      rows={5}
                      className="input-dark resize-none"
                      id="contact-message"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={sending}
                    className="btn-primary w-full justify-center"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  )
}

export default Contact
