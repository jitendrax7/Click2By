import React from 'react'
import { Link } from 'react-router-dom'

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0d0d14] border-t border-[#2a2a38]">

      {/* ── Main grid ── */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand — full-width on xs, 2 cols on sm, 1 col on lg */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center shrink-0">
                <span className="text-dark font-display font-bold text-xs">C</span>
              </div>
              <span className="font-display font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                Click<span className="text-primary">2</span>Buy
              </span>
            </Link>

            <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-[260px]">
              Premium fashion for the modern individual. Curated collections blending style, comfort &amp; sustainability.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center text-[#555566] hover:text-primary hover:border-primary/40 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#555566] font-semibold mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Home',     to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact',  to: '/contact' },
                { label: 'Careers',  to: '#' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#9b9b9b] text-sm hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#555566] font-semibold mb-4">Support</p>
            <ul className="space-y-2.5">
              {['FAQ', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#9b9b9b] text-sm hover:text-primary transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#555566] font-semibold mb-4">Contact Us</p>
            <ul className="space-y-3">

              {/* Address */}
              <li className="flex items-start gap-2.5">
                <svg className="shrink-0 mt-0.5 text-primary" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-[#9b9b9b] text-sm leading-snug">
                  547009 Willms Station,<br />Suite 350, Washington
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0 text-primary" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+14855550757" className="text-[#9b9b9b] text-sm hover:text-primary transition-colors">
                  +1 (485) 555-0757
                </a>
              </li>

              {/* Email — updated to jx7@gmail.com */}
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0 text-primary" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:jx7@gmail.com" className="text-[#9b9b9b] text-sm hover:text-primary transition-colors break-all">
                  jx7@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#2a2a38]">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555566] text-xs text-center sm:text-left">
            © {year} Click2Buy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#555566]">
            <a href="#" className="hover:text-[#9b9b9b] transition-colors">Terms</a>
            <span className="opacity-40">·</span>
            <a href="#" className="hover:text-[#9b9b9b] transition-colors">Privacy</a>
            <span className="opacity-40">·</span>
            <a href="#" className="hover:text-[#9b9b9b] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
