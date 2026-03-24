import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type LightboxItem = { src: string; alt?: string }

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (index === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [index, onClose, onPrev, onNext])

  if (index === null) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', zIndex: 10 }}
      >
        <X size={20} />
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px', padding: '0 64px' }}
      >
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          className="absolute left-0 flex items-center justify-center w-11 h-11 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}
        >
          <ChevronLeft size={22} />
        </button>

        <img
          src={items[index].src}
          alt={items[index].alt ?? `Photo ${index + 1}`}
          style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '6px', userSelect: 'none', display: 'block' }}
        />

        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          className="absolute right-0 flex items-center justify-center w-11 h-11 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {index + 1} / {items.length}
      </p>
    </div>
  )
}
