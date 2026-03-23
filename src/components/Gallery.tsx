import { ArrowRight } from 'lucide-react'
const photos = [
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01.jpeg', label: 'Frameless Shower Door', location: 'Myrtle Beach, SC' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2016.02.01%20(1).jpeg', label: 'Custom Glass Shower', location: 'North Myrtle Beach' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50.jpeg', label: 'Corner Shower Enclosure', location: 'Myrtle Beach, SC' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(1).jpeg', label: 'Sunroom Glass Installation', location: 'Surfside Beach' },
  { src: '/media/projects/WhatsApp%20Image%202025-01-30%20at%2022.58.50%20(2).jpeg', label: 'Glass Room', location: 'Conway, SC' },
  { src: '/media/projects/WhatsApp%20Image%202024-12-26%20at%2018.12.17.jpeg', label: 'Decorative Glass Panel', location: 'Myrtle Beach, SC' },
]

export function Gallery() {
  return (
    <section data-section="gallery" id="gallery" className="py-[92px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="section-tag">Our Portfolio</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--blue-deep)' }}>
              Our Work — See the Results
            </h2>
            <p className="mt-3 text-base max-w-lg" style={{ color: 'var(--mid)' }}>
              Browse our portfolio of custom frameless shower door installations
              across Myrtle Beach and surrounding areas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/gallery" className="btn-primary">
              See Full Gallery <ArrowRight size={15} />
            </a>
            <a href="#contact" className="btn-secondary">
              Request Your Custom Shower Door <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
