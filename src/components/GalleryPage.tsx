import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react'

const photos = [
  { src: '/media/projects/carrossel%20pg%201.JPG',                                    label: 'Frameless Shower Door' },
  { src: '/media/projects/carrossel%20pg%202.JPG',                                    label: 'Custom Glass Enclosure' },
  { src: '/media/projects/carrossel%20pg%203.JPG',                                    label: 'Shower Door Installation' },
  { src: '/media/projects/carrossel%20pg%204.JPG',                                    label: 'Frameless Glass Enclosure' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.00.jpeg',        label: 'Frameless Shower with Tub' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg',        label: 'Corner Shower Enclosure' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01%20(1).jpeg', label: 'Shower with Plants' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg',        label: 'Corner Glass Enclosure' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg', label: 'Sunroom Glass Installation' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg', label: 'Glass Room Installation' },
  { src: '/media/projects/WhatsApp%20Image%202024-12-26%20at%2018.12.17.jpeg',        label: 'Decorative Glass Panel' },
  { src: '/media/projects/614f4c98-2ffe-4b44-a5e8-5249394d1354.jpg',                  label: 'Custom Shower Door' },
  { src: '/media/projects/Antes%20.jpeg',                                              label: 'Before Installation' },
  { src: '/media/projects/Durante.jpeg',                                               label: 'During Installation' },
  { src: '/media/projects/Durante(1).jpeg',                                            label: 'During Installation' },
  { src: '/media/projects/18.png',  label: 'Glass Project' },
  { src: '/media/projects/19.png',  label: 'Glass Project' },
  { src: '/media/projects/20.png',  label: 'Glass Project' },
  { src: '/media/projects/21.png',  label: 'Glass Project' },
  { src: '/media/projects/22.png',  label: 'Glass Project' },
  { src: '/media/projects/23.png',  label: 'Glass Project' },
  { src: '/media/projects/23a.png', label: 'Glass Project' },
  { src: '/media/projects/24.png',  label: 'Glass Project' },
  { src: '/media/projects/24b.png', label: 'Glass Project' },
  { src: '/media/projects/25.png',  label: 'Glass Project' },
  { src: '/media/projects/25(1).png', label: 'Glass Project' },
  { src: '/media/projects/26.png',  label: 'Glass Project' },
  { src: '/media/projects/31.png',  label: 'Glass Project' },
  { src: '/media/projects/33.jpg',  label: 'Glass Project' },
  { src: '/media/projects/35.jpg',  label: 'Glass Project' },
  { src: '/media/projects/36.jpg',  label: 'Glass Project' },
  { src: '/media/projects/37.jpg',  label: 'Glass Project' },
  { src: '/media/projects/38.jpg',  label: 'Glass Project' },
  { src: '/media/projects/39.jpg',  label: 'Glass Project' },
  { src: '/media/projects/40.jpg',  label: 'Glass Project' },
  { src: '/media/projects/41.png',  label: 'Glass Project' },
]

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close  = useCallback(() => setLightbox(null), [])
  const prev   = useCallback(() => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [])
  const next   = useCallback(() => setLightbox(i => i !== null ? (i + 1) % photos.length : null), [])

  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, prev, next])

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
              <Phone size={15} /> Call for a Free Estimate
            </a>
            <a href="https://wa.me/18437428228" target="_blank" rel="noreferrer" className="btn-white"
               style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.8)', color: '#fff' }}>
              <MessageCircle size={15} /> WhatsApp Us
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

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            <X size={20} />
          </button>

          {/* Image + adjacent arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0"
              style={{ position: 'absolute', left: '-52px', backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', zIndex: 10 }}
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].label}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '6px', userSelect: 'none', display: 'block' }}
            />

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0"
              style={{ position: 'absolute', right: '-52px', backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', zIndex: 10 }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Counter */}
          <p className="absolute bottom-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lightbox + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  )
}
