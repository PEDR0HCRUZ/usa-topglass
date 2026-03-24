import { Phone, MessageCircle, Star, Shield, CheckCircle } from 'lucide-react'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Lightbox } from './Lightbox'

type MediaItem = { src: string; type: 'image' | 'video'; alt?: string }

const carouselItems: MediaItem[] = [
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/614f4c98-2ffe-4b44-a5e8-5249394d1354.jpg',                   type: 'image', alt: 'Frameless shower door installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202024-12-26%20at%2018.12.17.jpeg',         type: 'image', alt: 'Decorative glass panel' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2016.02.00.jpeg',         type: 'image', alt: 'Frameless shower with tub' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2016.02.01%20(1).jpeg',  type: 'image', alt: 'Shower with plants' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg',         type: 'image', alt: 'Corner shower enclosure' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg',  type: 'image', alt: 'Sunroom glass installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg',  type: 'image', alt: 'Glass room installation' },
  { src: 'https://usa-topglass.vercel.app/media/projects/carrossel%20infinito/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg',         type: 'image', alt: 'Corner glass enclosure' },
]

export function Hero() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const posRef    = useRef(0)
  const rafRef    = useRef<number>()
  const drag      = useRef({ active: false, startX: 0, startPos: 0, moved: false })
  const [lightbox, setLightbox] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevPhoto     = useCallback(() => setLightbox(i => i !== null ? (i - 1 + carouselItems.length) % carouselItems.length : null), [])
  const nextPhoto     = useCallback(() => setLightbox(i => i !== null ? (i + 1) % carouselItems.length : null), [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const SPEED = 0.35
    let loopWidth = 0
    const tick = () => {
      if (!drag.current.active) {
        posRef.current += SPEED
        if (loopWidth > 0 && posRef.current >= loopWidth) posRef.current -= loopWidth
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => {
      loopWidth = el.scrollWidth / 3
      rafRef.current = requestAnimationFrame(tick)
    }, 80)
    return () => { clearTimeout(timer); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, startX: e.clientX, startPos: posRef.current, moved: false }
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    if (Math.abs(e.clientX - drag.current.startX) > 5) drag.current.moved = true
    posRef.current = drag.current.startPos + (drag.current.startX - e.clientX)
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`
  }
  const onMouseUp = (e: React.MouseEvent) => {
    drag.current.active = false
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.cursor = 'grab'
  }
  const onTouchStart = (e: React.TouchEvent) => { drag.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current, moved: false } }
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!drag.current.active) return
    if (Math.abs(e.touches[0].clientX - drag.current.startX) > 5) drag.current.moved = true
    posRef.current = drag.current.startPos + (drag.current.startX - e.touches[0].clientX)
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${posRef.current}px)`
  }
  const onTouchEnd = () => { drag.current.active = false }

  return (
    <>
    <section className="relative overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://usa-topglass.vercel.app/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.00.jpeg"
          alt="Luxury frameless shower door installation"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(10,25,55,0.96) 0%, rgba(15,50,110,0.88) 50%, rgba(10,25,55,0.80) 100%)' }}
        />
      </div>

      {/* Hero content */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-[114px] w-full">
          <div className="max-w-2xl">

            {/* Trust ticker */}
            <div
              className="mb-8 overflow-hidden rounded-full"
              style={{
                maxWidth: '50%',
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.35)',
                padding: '6px 0',
              }}
            >
              <div style={{ display: 'flex', animation: 'ticker 12s linear infinite', whiteSpace: 'nowrap' }}>
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex items-center gap-3 text-xs font-semibold text-white" style={{ paddingRight: '2rem' }}>
                    <Star size={13} fill="#F4B400" color="#F4B400" />
                    <span>5-Star Google Rated</span>
                    <Shield size={13} />
                    <span>Licensed &amp; Insured</span>
                    <CheckCircle size={13} />
                    <span>Myrtle Beach's #1 Glass Installer</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Headline */}
            <h1 data-gsap="hero-title"
              className="text-white mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 1.15, textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
            >
              Frameless Shower
              <br />
              Door <span style={{ color: '#A8D4F5' }}>Installation</span>
              <br />
              in Myrtle Beach, SC
            </h1>

            <p data-gsap="hero-desc" className="mb-8 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.95)', maxWidth: '520px' }}>
              Transform your bathroom with a beautiful, custom frameless shower
              door. Professional installation · Free estimates · Same-week scheduling available.
            </p>

            {/* CTAs */}
            <div data-gsap="hero-ctas" className="flex flex-wrap gap-4">
              <a href="tel:+18437428228" className="btn-white">
                Call for a Free Estimate
                <Phone size={16} />
              </a>
              <a
                href="https://wa.me/18437428228"
                target="_blank"
                rel="noreferrer"
                className="btn-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', borderColor: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)' }}
              >
                WhatsApp Us
                <MessageCircle size={16} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Carousel — inside the hero, shares the dark background */}
      <div className="relative pt-16 pb-10">

        {/* Fade edges — blend with the hero's dark tones */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(15,35,70,0.85), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(15,35,70,0.85), transparent)' }} />

        <div
          className="relative w-full overflow-hidden select-none"
          style={{ height: '400px', cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={e => { drag.current.active = false; e.currentTarget.style.cursor = 'grab' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex absolute top-0 left-0 h-full"
            style={{ gap: '16px', willChange: 'transform', userSelect: 'none' }}
          >
            {[...carouselItems, ...carouselItems, ...carouselItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 overflow-hidden rounded-lg"
                style={{ width: '340px', height: '400px' }}
                onClick={() => { if (!drag.current.moved) setLightbox(i % carouselItems.length) }}
              >
                {item.type === 'video' ? (
                  <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" draggable={false} />
                ) : (
                  <img src={item.src} alt={item.alt ?? `Project ${i + 1}`} className="w-full h-full object-cover" draggable={false} loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>

    <Lightbox
      items={carouselItems}
      index={lightbox}
      onClose={closeLightbox}
      onPrev={prevPhoto}
      onNext={nextPhoto}
    />
    </>
  )
}
