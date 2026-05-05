import { useState, useCallback } from 'react'
import { SlidersHorizontal, Square, Phone } from 'lucide-react'
import { Lightbox } from './Lightbox'

const services = [
  {
    icon: SlidersHorizontal,
    title: 'Sliding Door Services',
    image: '/media/Videoslidingdoor.mp4',
    imageAlt: 'Sliding glass door repair',
    isVideo: true,
    items: [
      'Sliding glass door repair',
      'Sliding door roller replacement',
      'Sliding door track repair',
      'Patio door repair & maintenance',
      'Sliding door handle & lock repair',
      'Sliding glass panel replacement',
      'Screen door replacement & installation',
    ],
  },
  {
    icon: Square,
    title: 'Glass Replacement & More',
    image: '/media/carousel-medias/WhatsApp%20Image%202026-03-31%20at%2011.55.19.webp',
    imageAlt: 'Glass replacement services',
    isVideo: false,
    items: [
      'Glass replacement (windows & doors)',
      'Bathroom mirror installation',
      'Shower glass replacement',
      'Broken shower door replacement',
      'Patio & entry door glass repair',
      'Screen installation & repair',
      'Commercial glass services',
    ],
  },
]

const lightboxItems = services.map(s => ({ src: s.image, type: (s.isVideo ? 'video' : 'image') as 'image' | 'video', alt: s.imageAlt }))

export function SecondaryServices() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const onClose = useCallback(() => setLightbox(null), [])
  const onPrev  = useCallback(() => setLightbox(i => i !== null ? (i - 1 + services.length) % services.length : null), [])
  const onNext  = useCallback(() => setLightbox(i => i !== null ? (i + 1) % services.length : null), [])

  return (
    <>
    <section id="sliding-door" className="pt-[74px] pb-[120px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 items-start gap-12 lg:gap-16">

          {/* Left — Headline */}
          <div className="lg:sticky lg:top-28">
            <span className="section-tag">Additional Services</span>
            <h2
              className="mt-3 mb-5"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', color: 'var(--blue-deep)', lineHeight: 1.2 }}
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
            {services.map(({ icon: Icon, title, image, imageAlt, isVideo, items }, idx) => (
              <div
                key={title}
                className="rounded-xl overflow-hidden flex flex-col sm:flex-row"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px rgba(27,79,138,0.06)',
                }}
              >
                {/* Left: header + list */}
                <div className="flex flex-col flex-1 px-7 pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--blue-light)' }}
                    >
                      <Icon size={19} style={{ color: 'var(--blue-deep)' }} />
                    </div>
                    <h3 className="font-semibold text-base" style={{ color: 'var(--dark)', fontFamily: 'var(--font-body)' }}>
                      {title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--blue-mid)' }} />
                        <span className="text-sm" style={{ color: 'var(--mid)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: full-height image */}
                <div
                  className="flex-shrink-0 order-first sm:order-last w-full h-72 sm:w-[210px] sm:h-auto"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setLightbox(idx)}
                >
                  {isVideo ? (
                    <video
                      src={image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={imageAlt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>

    <Lightbox items={lightboxItems} index={lightbox} onClose={onClose} onPrev={onPrev} onNext={onNext} />
    </>
  )
}
