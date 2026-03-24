

import { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'

export function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Trustindex renders the widget next to the script tag itself
    const script = document.createElement('script')
    script.src = 'https://cdn.trustindex.io/loader.js?a1f734167b317692bc2634aa608'
    script.async = true
    containerRef.current.appendChild(script)
  }, [])

  return (
    <section id="reviews" className="py-[92px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-tag">Customer Reviews</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--blue-deep)' }}>
            5-Star Reviews From Real
            <br />
            Homeowners in Myrtle Beach
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--mid)' }}>
            Homeowners across Myrtle Beach trust USA Top Glass for frameless shower door
            installations, glass replacements, and sliding door services.
          </p>
        </div>

        {/* Trustindex widget — o script injeta o widget aqui dentro */}
        <div ref={containerRef} />

        <div className="text-center mt-10">
          <a href="tel:+18437428228" className="btn-primary">
            Call a 5-Star Company — (843) 742-8228
            <Phone size={16} />
          </a>
        </div>

      </div>
    </section>
  )
}
