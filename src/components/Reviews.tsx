import { Star, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'

const reviews = [
  {
    name: 'James Stanton',
    date: '1 week ago',
    rating: 5,
    text: 'USA TOP GLASS provided the labor to replace three dual-pane windows that had fogged up and were under manufacture\'s warranty. They were punctual, courteous and skilled at their "art". They managed to extract the fogged window panes without damaging or scaring the PVC window frames. I\'m glad to write this review and recommend them.',
    color: '#4285F4',
  },
  {
    name: 'Amy Eatmon',
    date: '4 months ago',
    rating: 5,
    text: 'We purchased 4 glass shower doors and glass window replacement from USA Top Glass. Miguel and their team were great to work with and did impeccable work. Their pricing is also very fair. We highly recommend USA Top Glass!',
    color: '#E91E63',
  },
  {
    name: 'Jackie Carroll',
    date: '2 months ago',
    rating: 5,
    text: 'Professional work! USA Top Glass Company will give you an excellent glass installation for your shower. Beautiful work!',
    color: '#FF9800',
  },
  {
    name: 'Stacey Bertling',
    date: '4 months ago',
    rating: 5,
    text: 'The owner and family are very friendly, helpful in making vision come to reality and reasonable in price with excellent work ethic and craftmanship. I would highly recommend. God bless this business and family.',
    color: '#9C27B0',
  },
  {
    name: 'Cheryl Santamaria',
    date: '5 months ago',
    rating: 5,
    text: 'I had a bathroom walk in shower put in, and the doors to the shower were not working correctly after several attempts by someone else. I called USA Top Glass, and I am so happy that I did. They fixed my shower doors perfectly.',
    color: '#009688',
  },
  {
    name: 'Tom Bentzel',
    date: '8 months ago',
    rating: 5,
    text: 'The USA Top Glass guys did a great job installing a shower door I had ordered separately. They were prompt, professional, quick, and thorough. I\'d definitely use them again.',
    color: '#795548',
  },
  {
    name: 'Mark Johnson',
    date: '1 year ago',
    rating: 5,
    text: 'USA Top Glass installed very nice Heavy Duty Glass Doors for our new shower. They were professional and on time. They will take care of your needs!',
    color: '#607D8B',
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} fill="#F4B400" color="#F4B400" />
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <div className="relative group" style={{ lineHeight: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {/* Tooltip */}
      <div
        className="absolute right-0 top-6 z-20 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
      >
        <div className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold shadow-lg"
          style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#1A1A1A' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Posted on Google
        </div>
      </div>
    </div>
  )
}

function ReviewCard({ r, expanded, onToggle }: { r: typeof reviews[number]; expanded: boolean; onToggle: () => void }) {
  const short = r.text.length > 110
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 1px 8px rgba(10,22,40,0.08)',
        border: '1px solid rgba(10,22,40,0.07)',
        height: '100%',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: r.color }}>
            {r.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-sm leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--dark)' }}>{r.name}</div>
            <div className="text-xs" style={{ color: 'var(--chrome)', fontFamily: 'var(--font-body)' }}>{r.date}</div>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex items-center gap-1.5">
        <Stars n={r.rating} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#4285F4"/><path d="M7 12l3.5 3.5L17 8.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--mid)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
        {short && !expanded ? r.text.slice(0, 110) + '…' : r.text}
      </p>
      {short && (
        <button
          onClick={e => { e.stopPropagation(); onToggle() }}
          className="text-xs font-semibold text-left"
          style={{ color: 'var(--blue-mid)', fontFamily: 'var(--font-body)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

const GAP = 16

export function Reviews() {
  const total = reviews.length
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useLayoutEffect(() => {
    if (!containerRef.current) return
    setContainerWidth(containerRef.current.offsetWidth)
    const ro = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const visible = isMobile ? 1 : 4
  const itemWidth = containerWidth > 0
    ? (containerWidth - GAP * (visible - 1)) / visible
    : 0

  const clonesBefore = reviews.slice(-visible)
  const clonesAfter = reviews.slice(0, visible)
  const items = [...clonesBefore, ...reviews, ...clonesAfter]

  const [index, setIndex] = useState(visible)
  const [animated, setAnimated] = useState(true)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isTransitioning = useRef(false)
  const isPaused = useRef(false)

  useEffect(() => {
    setAnimated(false)
    setIndex(visible)
  }, [visible])

  const goTo = (next: number) => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    setAnimated(true)
    setIndex(next)
  }

  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  const handleTransitionEnd = () => {
    isTransitioning.current = false
    if (index <= visible - 1) {
      setAnimated(false)
      setIndex(index + total)
    } else if (index >= visible + total) {
      setAnimated(false)
      setIndex(index - total)
    }
  }

  useEffect(() => {
    if (!animated) {
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    }
  }, [animated])

  useEffect(() => {
    setExpandedKey(null)
  }, [index])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) goTo(index + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [index])

  const offset = itemWidth > 0 ? -(index * (itemWidth + GAP)) : 0

  return (
    <section id="reviews" className="py-[92px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-tag">Customer Reviews</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--blue-deep)', marginTop: '0.25rem', marginBottom: '1rem' }}>
            5-Star Reviews From Real
            <br />
            Homeowners in Myrtle Beach
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--mid)' }}>
            Homeowners across Myrtle Beach trust USA Top Glass for frameless shower door
            installations, glass replacements, and sliding door services.
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-12">
          <div
            className="relative"
            onMouseEnter={() => { isPaused.current = true }}
            onMouseLeave={() => { isPaused.current = false }}
          >
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--blue-light)', color: 'var(--blue-deep)', boxShadow: '0 2px 8px rgba(10,22,40,0.1)', border: 'none', cursor: 'pointer' }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next arrow */}
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--blue-light)', color: 'var(--blue-deep)', boxShadow: '0 2px 8px rgba(10,22,40,0.1)', border: 'none', cursor: 'pointer' }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

            {/* Track */}
            <div ref={containerRef} style={{ overflow: 'hidden' }}>
              <div
                ref={trackRef}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  display: 'flex',
                  gap: `${GAP}px`,
                  transform: `translateX(${offset}px)`,
                  transition: animated ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                  visibility: containerWidth > 0 ? 'visible' : 'hidden',
                }}
              >
                {items.map((r, i) => (
                  <div key={i} style={{ flex: `0 0 ${itemWidth}px`, minWidth: 0 }}>
                    <ReviewCard
                      r={r}
                      expanded={expandedKey === r.name}
                      onToggle={() => setExpandedKey(k => k === r.name ? null : r.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(10,22,40,0.08)' }}>
          <div className="flex items-center gap-2">
            <GoogleIcon />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="#F4B400" color="#F4B400" />)}
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--dark)', fontFamily: 'var(--font-display)' }}>5-Star Rated on Google</span>
          </div>
          <span className="hidden sm:inline" style={{ color: 'var(--border)' }}>·</span>
          <a href="tel:+18437428228" className="btn-primary">
            Call a 5-Star Company — (843) 742-8228
            <Phone size={16} />
          </a>
        </div>

      </div>
    </section>
  )
}
