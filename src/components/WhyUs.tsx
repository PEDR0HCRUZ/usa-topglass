import { useEffect, useRef, useState } from 'react'
import { Phone, Star, Shield, Clock, Scissors, MapPin, ThumbsUp, DollarSign, Wrench } from 'lucide-react'

const reasons = [
  { icon: Scissors,   text: 'Specialized in frameless shower door installation' },
  { icon: Wrench,     text: 'Custom-cut glass — measured and fitted on site' },
  { icon: Shield,     text: 'Licensed & insured technicians' },
  { icon: Star,       text: '5-Star Google reputation' },
  { icon: Clock,      text: 'Fast response — reply in under 3 hours' },
  { icon: DollarSign, text: 'Free, no-obligation estimates' },
  { icon: MapPin,     text: 'Serving Myrtle Beach & surrounding areas' },
  { icon: ThumbsUp,   text: "We treat your home like it's our own" },
]

type Slide = { type: 'image' | 'video'; src: string }

const slides: Slide[] = [
  { type: 'image', src: '/media/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg' },
  { type: 'image', src: '/media/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg' },
  { type: 'image', src: '/media/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg' },
  { type: 'image', src: '/media/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg' },
  { type: 'video', src: '/media/WhatsApp%20Video%202025-02-28%20at%2016.33.08%20(1).mp4' },
]

const INTERVAL = 5000
const FADE_MS  = 800
const SEAL_TEXT = 'LICENSED & INSURED • MYRTLE BEACH SC • USA TOP GLASS • '

export function WhyUs() {
  const [visible, setVisible] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(prev => (prev + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === visible) { v.currentTime = 0; v.play().catch(() => {}) }
      else v.pause()
    })
  }, [visible])

  return (
    <section
      data-section="whyus"
      id="about"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #0F2346 0%, #1B4F8A 55%, #2E86C1 100%)' }}
    >
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .seal-ring { animation: spin-slow 14s linear infinite; }
        @keyframes fade-in-up-center {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .whyus-flag-card { animation: fade-in-up-center 0.6s ease forwards; animation-delay: 0.8s; opacity: 0; }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left ── */}
          <div className="whyus-left order-2 lg:order-1">
            <span className="section-tag" style={{ color: 'rgba(168,212,245,0.9)' }}>
              Why Choose Us
            </span>
            <h2
              className="text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15 }}
            >
              Why Homeowners
              <br />Choose USA Top Glass
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '460px' }}>
              From your first call to the final installation, we deliver exceptional
              results — on time, within budget, and with zero hassle.
            </p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10">
              {reasons.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
                  >
                    <Icon size={15} color="#A8D4F5" />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{text}</span>
                </li>
              ))}
            </ul>

            <a href="tel:+18437428228" className="btn-white">
              Call Now for a Free Estimate
              <Phone size={16} />
            </a>
          </div>

          {/* ── Right ── */}
          <div className="whyus-right order-1 lg:order-2 relative pt-14 px-8 lg:pt-0 lg:px-0">

            {/* Rotating seal — top right, 25% larger (135px) */}
            <div className="absolute z-20 whyus-seal" style={{ width: 180, height: 180 }}>
              <svg className="seal-ring absolute inset-0 w-full h-full" viewBox="0 0 180 180">
                <defs>
                  <path
                    id="seal-circle"
                    d="M 90 90 m -70 0 a 70 70 0 1 1 140 0 a 70 70 0 1 1 -140 0"
                  />
                </defs>
                <text
                  fontSize="9"
                  fontFamily="var(--font-body)"
                  fontWeight="600"
                  letterSpacing="2.6"
                  fill="rgba(255,255,255,0.9)"
                >
                  <textPath href="#seal-circle">{SEAL_TEXT}</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/utg-icon.svg" alt="UTG" style={{ width: 62, height: 56 }} />
              </div>
            </div>

            {/* Slideshow */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/5', boxShadow: '0 32px 80px rgba(0,0,0,0.45)' }}
            >
              {slides.map((slide, i) =>
                slide.type === 'image' ? (
                  <img
                    key={i}
                    src={slide.src}
                    alt="USA Top Glass installation"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: visible === i ? 1 : 0,
                      transition: `opacity ${FADE_MS}ms ease`,
                      zIndex: visible === i ? 2 : 1,
                    }}
                  />
                ) : (
                  <video
                    key={i}
                    ref={el => { videoRefs.current[i] = el }}
                    src={slide.src}
                    muted
                    playsInline
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: visible === i ? 1 : 0,
                      transition: `opacity ${FADE_MS}ms ease`,
                      zIndex: visible === i ? 2 : 1,
                    }}
                  />
                )
              )}
              {/* Inner gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(15,35,70,0.5) 0%, transparent 50%)',
                  zIndex: 2,
                }}
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
