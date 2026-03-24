import { useState, useCallback } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { Lightbox } from './Lightbox'

const photos = [
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20pg%201.JPG',                                    label: 'Frameless Shower Door' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20pg%202.JPG',                                    label: 'Custom Glass Enclosure' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20pg%203.JPG',                                    label: 'Shower Door Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20pg%204.JPG',                                    label: 'Frameless Glass Enclosure' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.00.jpeg',        label: 'Frameless Shower with Tub' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg',        label: 'Corner Shower Enclosure' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01%20(1).jpeg', label: 'Shower with Plants' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg',        label: 'Corner Glass Enclosure' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg', label: 'Sunroom Glass Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg', label: 'Glass Room Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202024-12-26%20at%2018.12.17.jpeg',        label: 'Decorative Glass Panel' },
  { src: 'https://usa-topglass.vercel.app/media/projects/614f4c98-2ffe-4b44-a5e8-5249394d1354.jpg',                  label: 'Custom Shower Door' },
  { src: 'https://usa-topglass.vercel.app/media/projects/Antes%20.jpeg',                                              label: 'Before Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/Durante.jpeg',                                               label: 'During Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/Durante(1).jpeg',                                            label: 'During Installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/18.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/19.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/20.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/21.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/22.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/23.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/23a.png', label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/24.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/24b.png', label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/25.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/25(1).png', label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/26.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/31.png',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/33.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/35.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/36.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/37.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/38.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/39.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/40.jpg',  label: 'Glass Project' },
  { src: 'https://usa-topglass.vercel.app/media/projects/41.png',  label: 'Glass Project' },
]

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close  = useCallback(() => setLightbox(null), [])
  const prev   = useCallback(() => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [])
  const next   = useCallback(() => setLightbox(i => i !== null ? (i + 1) % photos.length : null), [])

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
