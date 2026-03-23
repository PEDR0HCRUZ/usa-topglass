import { Phone, Mail, MessageCircle } from 'lucide-react'

const services = [
  'Frameless Shower Door Installation',
  'Custom Glass Shower Doors',
  'Shower Door Replacement',
  'Bathroom Glass Installation',
  'Sliding Door Repair',
  'Glass Replacement',
  'Screen Installation & Repair',
]

const areas = [
  'Myrtle Beach, SC',
  'North Myrtle Beach, SC',
  'Conway, SC',
  'Surfside Beach, SC',
  'Garden City, SC',
  'Pawleys Island, SC',
  'Horry County area',
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F1E35' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[65px] pb-[37px]">

        <div className="grid md:grid-cols-[1fr_2fr] gap-20 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src="/logo-hori-branco.svg" alt="USA Top Glass" className="h-9 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Your trusted glass & shower door specialists in Myrtle Beach, SC.
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, val: '(843) 742-8228', href: 'tel:+18437428228' },
                { icon: MessageCircle, val: 'WhatsApp Us', href: 'https://wa.me/18437428228' },
                { icon: Mail, val: 'contact@usatopglass.com', href: 'mailto:contact@usatopglass.com' },
              ].map(({ icon: Icon, val, href }) => (
                <div key={val} className="flex items-start gap-2.5">
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(168,212,245,0.7)' }} />
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                       className="text-xs hover:opacity-80" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {val}
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Services + Areas */}
          <div className="flex justify-between gap-10">

            {/* Services */}
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
                Our Services
              </h4>
              <ul className="space-y-4">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-xs hover:opacity-80 transition-opacity"
                       style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
                Service Area
              </h4>
              <ul className="space-y-2.5">
                {areas.map((a) => (
                  <li key={a} className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
             style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span>© {new Date().getFullYear()} USA Top Glass · All Rights Reserved · Myrtle Beach, SC</span>
          <span>Licensed & Insured</span>
        </div>

      </div>
    </footer>
  )
}
