import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookModal from '../components/BookModal.jsx'
import { getListingById } from '../data/listings.js'

export default function StayDetail() {
  const { id } = useParams()
  const stay = getListingById(id)

  const [activeImage, setActiveImage] = useState(0)
  const [guests, setGuests] = useState(1)
  const [bookingOpen, setBookingOpen] = useState(false)

  if (!stay) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Stay not found</h1>
        <p className="mt-3 max-w-md text-sm text-neutral-600">
          We couldn't find a stay with the id “{id}”. It may have been removed or the link may be
          wrong.
        </p>
        <Link
          to="/explore"
          className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Browse stays
        </Link>
      </div>
    )
  }

  const {
    title,
    location,
    rating,
    reviewCount,
    beds,
    baths,
    guests: maxGuests,
    tags,
    images,
    description,
    amenities,
    host,
    pricePerNight,
    tour3d,
  } = stay

  const hasMultiple = images.length > 1
  const goPrev = () => setActiveImage((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setActiveImage((i) => (i + 1) % images.length)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="text-sm text-neutral-500 transition hover:text-neutral-900"
      >
        ← Back to stays
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-neutral-600">
          <span>
            <span aria-hidden="true">★</span> {rating.toFixed(2)}
          </span>
          <span aria-hidden="true">·</span>
          <span>{reviewCount} reviews</span>
          <span aria-hidden="true">·</span>
          <span>{location}</span>
        </p>
      </header>

      {/* Gallery */}
      <section className="mt-6" aria-label="Photos">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-100">
          <img
            src={images[activeImage]}
            alt={`${title} — photo ${activeImage + 1}`}
            className="h-full w-full object-cover"
          />
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-900 shadow backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-900 shadow backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <span aria-hidden="true">›</span>
              </button>
              <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                {activeImage + 1} / {images.length}
              </span>
            </>
          )}
          {tour3d && (
            <Link
              to={`/tour/${id}`}
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-neutral-900 shadow backdrop-blur transition hover:bg-white"
            >
              <span aria-hidden="true">◎</span> Explore in 3D
            </Link>
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === activeImage}
                className={[
                  'h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:h-20 sm:w-32',
                  i === activeImage
                    ? 'ring-neutral-900'
                    : 'ring-transparent opacity-70 hover:opacity-100',
                ].join(' ')}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Main column */}
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-lg font-semibold">Hosted by {host.name}</h2>
              <p className="mt-1 text-sm text-neutral-600">
                {maxGuests} guests · {beds} {beds === 1 ? 'bed' : 'beds'} · {baths}{' '}
                {baths === 1 ? 'bath' : 'baths'}
              </p>
            </div>
            <img
              src={host.avatarUrl}
              alt={host.name}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-neutral-200"
            />
          </div>

          <section className="border-b border-neutral-200 py-6">
            <p className="leading-relaxed text-neutral-700">{description}</p>
            {tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="py-6">
            <h2 className="text-lg font-semibold">What this place offers</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {amenities.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Price card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
            <p className="text-2xl font-semibold">
              ${pricePerNight}
              <span className="text-sm font-normal text-neutral-500"> / night</span>
            </p>

            <label className="mt-5 block text-sm">
              <span className="mb-1 block font-medium text-neutral-700">Guests</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="mt-4 w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Reserve
            </button>

            {tour3d && (
              <Link
                to={`/tour/${id}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-900 px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                <span aria-hidden="true">◎</span> Explore in 3D
              </Link>
            )}

            <p className="mt-4 text-center text-xs text-neutral-500">
              You won't be charged yet.
            </p>
          </div>
        </aside>
      </div>

      <BookModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        stay={stay}
        initialGuests={guests}
      />
    </div>
  )
}