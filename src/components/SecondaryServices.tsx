import { SlidersHorizontal, Square, Phone } from 'lucide-react'

const sliding = [
  'Sliding glass door repair',
  'Sliding door roller replacement',
  'Sliding door track repair',
  'Patio door repair & maintenance',
  'Sliding door handle & lock repair',
  'Sliding glass panel replacement',
  'Screen door replacement & installation',
]

const glass = [
  'Glass replacement (windows & doors)',
  'Bathroom mirror installation',
  'Shower glass replacement',
  'Broken shower door replacement',
  'Patio & entry door glass repair',
  'Screen installation & repair',
  'Commercial glass services',
]

export function SecondaryServices() {
  return (
    <section className="pt-[74px] pb-[120px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Headline */}
          <div className="lg:sticky lg:top-28">
            <span className="section-tag">Additional Services</span>
            <h2
              className="mt-3 mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
                color: 'var(--blue-deep)',
                lineHeight: 1.2,
              }}
            >
              More Glass &amp; Door Services in Myrtle Beach
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--mid)', maxWidth: 380 }}>
              Beyond shower doors, USA Top Glass handles the full spectrum of glass
              and door work — from sliding door repairs to full glass replacements
              for homes and businesses.
            </p>
            <a href="tel:+18437428228" className="btn-primary">
              Call for Any Glass Need
              <Phone size={15} />
            </a>
          </div>

          {/* Right — Two stacked cards */}
          <div className="flex flex-col gap-5">

            {[
              { icon: SlidersHorizontal, title: 'Sliding Door Services', items: sliding },
              { icon: Square,            title: 'Glass Replacement & More', items: glass },
            ].map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="p-7 rounded-xl"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px rgba(27,79,138,0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--blue-light)' }}
                  >
                    <Icon size={19} style={{ color: 'var(--blue-deep)' }} />
                  </div>
                  <h3
                    className="font-semibold text-base"
                    style={{ color: 'var(--dark)', fontFamily: 'var(--font-body)' }}
                  >
                    {title}
                  </h3>
                </div>

                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--blue-mid)' }}
                      />
                      <span className="text-sm" style={{ color: 'var(--mid)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  )
}
