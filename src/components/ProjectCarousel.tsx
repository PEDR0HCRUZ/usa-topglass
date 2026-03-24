import { useRef, useEffect } from 'react'

type MediaItem = { src: string; type: 'image' | 'video'; alt?: string }

const galleryItems: MediaItem[] = [
  { src: '/media/gallery-medias/carrossel%20pg%201.JPG', type: 'image', alt: 'Frameless shower door installation' },
  { src: '/media/gallery-medias/carrossel%20pg%202.JPG', type: 'image', alt: 'Custom glass shower enclosure' },
  { src: '/media/gallery-medias/carrossel%20pg%203.JPG', type: 'image', alt: 'Shower door installation Myrtle Beach' },
  { src: '/media/gallery-medias/carrossel%20pg%204.JPG', type: 'image', alt: 'Frameless glass enclosure' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202024-12-26%20at%2018.12.17.jpeg', type: 'image', alt: 'Decorative glass panel' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2016.02.00.jpeg', type: 'image', alt: 'Frameless shower with tub' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg', type: 'image', alt: 'Corner shower enclosure' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2016.02.01%20(1).jpeg', type: 'image', alt: 'Shower with plants' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg', type: 'image', alt: 'Corner glass enclosure' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg', type: 'image', alt: 'Sunroom glass installation' },
  { src: '/media/gallery-medias/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg', type: 'image', alt: 'Glass room installation' },
]

export function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>()
  const drag = useRef({ active: false, startX: 0, startPos: 0 })
  const isDraggingMove = useRef(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const SPEED = 0.35
    let loopWidth = 0

    const tick = () => {
      if (!drag.current.active) {
        posRef.current += SPEED
        if (loopWidth > 0 && posRef.current >= loopWidth) {
          posRef.current -= loopWidth
        }
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      loopWidth = el.scrollWidth / 3
      rafRef.current = requestAnimationFrame(tick)
    }, 80)

    return () => {
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Mouse ──────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, startX: e.clientX, startPos: posRef.current }
    isDraggingMove.current = false
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    isDraggingMove.current = true
    const delta = drag.current.startX - e.clientX
    posRef.current = drag.current.startPos + delta
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`
    }
  }

  const onMouseUp = () => {
    drag.current.active = false
  }

  // ── Touch ──────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    drag.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!drag.current.active) return
    const delta = drag.current.startX - e.touches[0].clientX
    posRef.current = drag.current.startPos + delta
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`
    }
  }

  const onTouchEnd = () => {
    drag.current.active = false
  }

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: '400px', cursor: 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Label */}
      <p
        className="absolute top-4 left-6 text-xs font-semibold tracking-widest uppercase z-20 pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}
      >
        Recent Projects
      </p>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      {/* Drag hint */}
      <p
        className="absolute bottom-4 right-6 text-xs z-20 pointer-events-none flex items-center gap-1.5"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        ← drag to explore →
      </p>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex absolute top-0 left-0 h-full"
        style={{ gap: '16px', willChange: 'transform', userSelect: 'none' }}
      >
        {[...galleryItems, ...galleryItems, ...galleryItems].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden"
            style={{ width: '340px', height: '400px' }}
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt ?? `Project ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
