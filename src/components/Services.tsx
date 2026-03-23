import { Droplets, Sparkles, RefreshCw, DoorOpen, Layers, Crown, Phone } from 'lucide-react'

const services = [
  {
    icon: Droplets,
    title: 'Frameless Shower Door Installation',
    desc: 'The most popular upgrade for modern bathrooms. Clean lines, easy cleaning, and timeless style. Custom-cut to your exact measurements.',
    tag: 'Most Popular',
  },
  {
    icon: Sparkles,
    title: 'Custom Glass Shower Doors',
    desc: 'Choose from clear, frosted, or patterned glass. We handle all styles and sizes — from walk-in showers to alcove configurations.',
    tag: null,
  },
  {
    icon: RefreshCw,
    title: 'Shower Door Replacement',
    desc: 'Replacing an old or broken shower door? We remove the old unit, prep the space, and install your new frameless door — all in one visit.',
    tag: null,
  },
  {
    icon: DoorOpen,
    title: 'Bathroom Glass Door Installation',
    desc: 'Full bathroom glass door upgrades including hinged and pivot doors. Perfect for bathroom renovations and new construction.',
    tag: null,
  },
  {
    icon: Layers,
    title: 'Shower Glass Installation',
    desc: 'Professional installation of shower glass panels, enclosures, and wet-room glass. Precision-fitted and sealed to prevent leaks.',
    tag: null,
  },
  {
    icon: Crown,
    title: 'Luxury & Modern Shower Doors',
    desc: 'Upgrade to premium hardware finishes — brushed nickel, matte black, chrome. We carry top-of-the-line glass and hardware brands.',
    tag: 'Premium',
  },
]

export function Services() {
  return (
    <section data-section="services" id="services" className="py-[92px]" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-14">
          <span className="section-tag">What We Do</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--blue-deep)' }}>
            Premium Shower Door Installation
            <br />in Myrtle Beach
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--mid)' }}>
            We specialize in custom frameless shower door installation — transforming ordinary
            bathrooms into luxury spaces. Every installation is measured precisely and crafted
            to fit your bathroom perfectly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map(({ icon: Icon, title, desc, tag }) => (
            <div
              key={title}
              className="service-card relative p-8 rounded-lg bg-white"
              style={{ border: '1px solid var(--border)' }}
            >
              {tag && (
                <span
                  className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: tag === 'Premium' ? '#FFF3CD' : 'var(--blue-light)',
                    color: tag === 'Premium' ? '#92640A' : 'var(--blue-deep)',
                  }}
                >
                  {tag}
                </span>
              )}
              <div className="mb-4">
                <Icon size={24} style={{ color: 'var(--blue-deep)' }} />
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--dark)' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="tel:+18437428228" className="btn-primary">
            <Phone size={16} />
            Call to Check Options &amp; Pricing — (843) 742-8228
          </a>
        </div>

      </div>
    </section>
  )
}
