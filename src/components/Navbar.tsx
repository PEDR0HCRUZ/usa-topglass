

import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo-blue.webp"
              alt="USA Top Glass"
              className="h-[50px] w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '#services' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'About', href: '#about' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-blue-700"
                style={{ color: 'var(--mid)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/18437428228"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-70"
              style={{ backgroundColor: 'rgba(37,211,102,0.1)' }}
              aria-label="WhatsApp"
            >
              <img src="/icon-whatsapp.svg" alt="WhatsApp" width={18} height={18} />
            </a>
            <a href="tel:+18437428228" className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.85rem' }}>
              <Phone size={14} />
              (843) 742-8228
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded"
            onClick={() => setOpen(!open)}
            style={{ color: 'var(--blue-deep)' }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile menu — overlay panel */}
      {open && (
        <div
          className="fixed top-0 left-0 right-0 z-50 md:hidden"
          style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <a href="#" onClick={() => setOpen(false)}>
              <img src="/logo-blue.webp" alt="USA Top Glass" className="h-[50px] w-auto" />
            </a>
            <button
              className="p-2 rounded"
              onClick={() => setOpen(false)}
              style={{ color: 'var(--blue-deep)' }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <div className="px-4 py-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '#services' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'About', href: '#about' },
              { label: 'Reviews', href: '#reviews' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium border-b last:border-0"
                style={{ color: 'var(--mid)', borderColor: 'var(--border)' }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 pb-2">
              <a href="tel:+18437428228" className="btn-primary justify-center">
                <Phone size={15} /> (843) 742-8228
              </a>
              <a href="https://wa.me/18437428228" target="_blank" rel="noreferrer" className="btn-secondary justify-center">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
