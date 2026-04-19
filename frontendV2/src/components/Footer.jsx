import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-2 border-t border-surface-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-dark font-display font-bold text-sm">C</span>
              </div>
              <span className="font-display font-bold text-xl text-text-primary group-hover:text-primary transition-colors">
                Click<span className="text-primary">2</span>Buy
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              Premium fashion for the modern individual. Curated collections that blend style, comfort, and sustainability.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-surface-card border border-surface-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-200"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-faint font-semibold mb-5">Company</p>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted text-sm hover:text-primary transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-faint font-semibold mb-5">Support</p>
            <ul className="space-y-3">
              {['FAQ', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted text-sm hover:text-primary transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-faint font-semibold mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 shrink-0 text-primary" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                547009 Willms Station,<br />Suite 350, Washington, USA
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0 text-primary" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +1 (485) 555-0757
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0 text-primary" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                admin@click2buy.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-faint text-xs">
            © {year} Click2Buy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-faint">
            <a href="#" className="hover:text-text-muted transition-colors">Terms</a>
            <a href="#" className="hover:text-text-muted transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-muted transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
