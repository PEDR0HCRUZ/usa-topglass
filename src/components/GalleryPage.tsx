import { useState, useCallback } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { Lightbox } from './Lightbox'

type Photo = { src: string; label: string }

interface Props {
  photos: Photo[]
}

export function GalleryPage({ photos }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close  = useCallback(() => setLightbox(null), [])
  const prev   = useCallback(() => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length])
  const next   = useCallback(() => setLightbox(i => i !== null ? (i + 1) % photos.length : null), [photos.length])

  return (
    <>
      {/* Hero strip */}
      <section style={{ backgroundColor: 'var(--blue-deep)', paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-tag" style={{ color: '#A8D4F5' }}>Our Portfolio</span>
          <h1 className="text-white mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Our Work — Full Gallery
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '0 auto 2rem' }}>
            Browse every project we've completed across Myrtle Beach and surrounding areas.
            Custom frameless shower doors, glass enclosures, sunrooms and more.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+18437428228" className="btn-white">
              Call for a Free Estimate <Phone size={15} />
            </a>
            <a href="https://wa.me/18437428228" target="_blank" rel="noreferrer" className="btn-white"
               style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.8)', color: '#fff' }}>
              WhatsApp Us <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ backgroundColor: 'var(--bg)', padding: '64px 0 96px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}
          >
            {photos.map((p, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{ aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                className="group"
              >
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
                  className="group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        items={photos.map(p => ({ src: p.src, alt: p.label }))}
        index={lightbox}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  )
}
