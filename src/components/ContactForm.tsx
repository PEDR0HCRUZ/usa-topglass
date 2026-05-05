import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// 1. Go to https://web3forms.com
// 2. Enter contact@usatopglass.com and click "Create Access Key"
// 3. Paste the key below
const WEB3FORMS_KEY = 'e04abc3a-76bd-4cd2-a412-ca121f684aac'

type Status = 'idle' | 'loading' | 'success' | 'error'

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New Estimate Request — USA Top Glass')
    data.append('from_name', 'USA Top Glass Website')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        setPhone('')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    borderColor: 'var(--border)',
    backgroundColor: 'var(--bg)',
    color: 'var(--dark)',
  }
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'var(--blue-mid)')
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'var(--border)')

  return (
    <section data-section="contact" id="contact" className="pt-[92px] pb-[140px]" style={{ background: 'linear-gradient(135deg, #0F2346 0%, #1B4F8A 55%, #2E86C1 100%)' }}>
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
          <form onSubmit={handleSubmit} className="rounded-xl p-8" style={{ backgroundColor: 'var(--surface)' }}>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle size={48} style={{ color: '#22c55e' }} />
                <h3 className="text-xl font-bold" style={{ color: 'var(--blue-deep)' }}>Request Sent!</h3>
                <p className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  Thank you! We'll get back to you shortly with your free estimate.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm underline"
                  style={{ color: 'var(--blue-mid)' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Your Name *</label>
                    <input type="text" name="name" required placeholder="John Smith"
                      className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                      style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Phone Number *</label>
                    <input type="tel" name="phone" required placeholder="(843) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                      style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Email Address</label>
                    <input type="email" name="email" placeholder="john@email.com"
                      className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                      style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--blue-deep)' }}>Service Needed</label>
                    <select name="service"
                      className="w-full px-4 py-3 text-sm rounded border outline-none transition-all"
                      style={inputStyle} onFocus={focusIn} onBlur={focusOut}
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
                  <textarea name="message" rows={4} placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 text-sm rounded border outline-none transition-all resize-none"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 mb-4 p-3 rounded" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                    <AlertCircle size={16} />
                    <span className="text-sm">Something went wrong. Please try again or call us directly.</span>
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'loading' ? (
                    <><Loader size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Request a Free Estimate</>
                  )}
                </button>
              </>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}
