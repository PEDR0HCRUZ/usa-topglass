import { Phone, MessageCircle, Mail, MapPin, Send } from 'lucide-react'

export function ContactForm() {
  return (
    <section data-section="contact" id="contact" className="py-[92px]" style={{ backgroundColor: 'var(--blue-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag" style={{ color: '#A8D4F5' }}>Free Estimate</span>
          <h2 className="text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            Get Your Free Estimate Today
          </h2>
          <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Fast response. Honest pricing. Professional installation.
            <br />Serving Myrtle Beach, SC and all surrounding areas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — Contact Info */}
          <div className="space-y-5">
            <p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-display)' }}>
              Prefer to talk directly?
            </p>

            {[
              { icon: Phone,         label: 'Call Us',   value: '(843) 742-8228',           href: 'tel:+18437428228',               color: '#A8D4F5' },
              { icon: MessageCircle, label: 'WhatsApp',  value: '+1 (843) 742-8228',         href: 'https://wa.me/18437428228',      color: '#A8D4F5' },
              { icon: Mail,          label: 'Email',     value: 'contact@usatopglass.com',   href: 'mailto:contact@usatopglass.com', color: '#A8D4F5' },
              { icon: MapPin,        label: 'Location',  value: '9658 N Kings Hwy\nMyrtle Beach, SC 29572', href: null,             color: '#A8D4F5' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {label}
                  </div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#fff' }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: '#fff', whiteSpace: 'pre-line' }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* Right — Form */}
          <form onSubmit={(e) => e.preventDefault()} className="rounded-xl p-8" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Your Name *</label>
                <input type="text" required placeholder="John Smith"
                  className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--dark)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--blue-mid)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Phone Number *</label>
                <input type="tel" required placeholder="(843) 000-0000"
                  className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--dark)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--blue-mid)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Email Address</label>
                <input type="email" placeholder="john@email.com"
                  className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--dark)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--blue-mid)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Service Needed</label>
                <select className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--dark)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--blue-mid)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                >
                  <option value="">Select a service...</option>
                  <option>Frameless Shower Door Installation</option>
                  <option>Custom Shower Door</option>
                  <option>Shower Door Replacement</option>
                  <option>Sliding Door Repair</option>
                  <option>Other Glass Service</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Message / Project Details</label>
              <textarea rows={4} placeholder="Tell us about your project..."
                className="w-full px-4 py-3 text-sm rounded border outline-none transition-all resize-none"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--dark)' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--blue-mid)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              <Send size={16} />
              Request a Free Estimate
            </button>

          </form>

        </div>
      </div>
    </section>
  )
}
