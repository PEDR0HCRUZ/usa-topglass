import { Star, Shield, Zap, FileCheck, Award, Clock } from 'lucide-react'

const items = [
  { icon: Star, label: '5-Star Google Rated', sub: 'Verified Reviews' },
  { icon: Shield, label: 'Licensed & Insured', sub: 'Myrtle Beach, SC' },
  { icon: Zap, label: 'Fast Response', sub: 'Reply in Under 3 Hours' },
  { icon: FileCheck, label: 'Free Estimates', sub: 'No Obligation Quote' },
  { icon: Award, label: '1-Year Labor Warranty', sub: 'On Every Install' },
  { icon: Clock, label: 'Same-Week Scheduling', sub: 'Available Now' },
]

export function TrustBar() {
  return (
    <section data-section="trust" style={{ backgroundColor: 'var(--blue-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-[37px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 py-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Icon size={18} color="rgba(168,212,245,0.9)" />
              </div>
              <div>
                <div
                  className="text-white font-semibold text-xs leading-tight"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
