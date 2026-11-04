import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AUTO_ADVANCE_MS = 3000

export default function StayCard({ stay }) {
  const { id, title, location, pricePerNight, rating, images, tour3d } = stay

  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  // Auto-advance every 3s; paused while hovered; cleaned up on unhover/unmount
  useEffect(() => {
    if (hovered || images.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [hovered, images.length])

  return (
    <Link
      to={`/stay/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? title : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={[
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
              i === index ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ))}
        {tour3d && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-900 backdrop-blur">
            3D tour
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-semibold text-neutral-900">{title}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-neutral-700">
            <span aria-hidden="true">★</span>
            {rating.toFixed(2)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-neutral-500">{location}</p>
        <p className="mt-3 text-sm text-neutral-900">
          <span className="font-semibold">${pricePerNight}</span>
          <span className="text-neutral-500"> / night</span>
        </p>
      </div>
    </Link>
  )
}