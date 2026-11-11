import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookModal from '../components/BookModal.jsx'
import { getListingById } from '../data/listings.js'

const DEFAULT_AMENITIES = ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Self check-in']

export default function StayDetail() {
  const { id } = useParams()
  const stay = getListingById(id)

  const [activeImage, setActiveImage] = useState(0)
  const [guests, setGuests] = useState(1)
  const [bookingOpen, setBookingOpen] = useState(false)

  // Start fresh when moving between stays
  useEffect(() => {
    setActiveImage(0)
    setGuests(1)
    setBookingOpen(false)
  }, [id])

  if (!stay) {
    return (
      <div className="surface-page flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-xs font-normal uppercase tracking-[0.2em] text-white/50">404</p>
        <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">Stay not found</h1>
        <p className="mt-3 max-w-md text-sm font-light text-white/65">
          We couldn’t find a stay with the id “{id}”. It may have been removed or the link may be
          wrong.
        </p>
        <Link
          to="/explore"
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
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
    area,
    host,
    pricePerNight,
    tour3d,
  } = stay

  const amenityList = amenities?.length ? amenities : DEFAULT_AMENITIES
  const hasMultiple = images.length > 1
  const goPrev = () => setActiveImage((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setActiveImage((i) => (i + 1) % images.length)

  const arrowClass =
    'absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-900 shadow backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'

  return (
    <div className="surface-page min-h-[calc(100dvh-4rem)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Link to="/explore" className="text-sm font-light text-white/60 transition hover:text-white">
          ← Back to stays
        </Link>

        <header className="mt-4">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm font-light text-white/70">
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
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-white/5">
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
                  className={`${arrowClass} left-3`}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className={`${arrowClass} right-3`}
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

          {hasMultiple && (
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
                      ? 'ring-white'
                      : 'opacity-60 ring-transparent hover:opacity-100',
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
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-lg font-light">Hosted by {host.name}</h2>
                <p className="mt-1 text-sm font-light text-white/60">
                  {maxGuests} guests · {beds} {beds === 1 ? 'bed' : 'beds'} · {baths}{' '}
                  {baths === 1 ? 'bath' : 'baths'}
                </p>
              </div>
              <img
                src={host.avatarUrl}
                alt={host.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/20"
              />
            </div>

            <section className="border-b border-white/10 py-6">
              <p className="font-light leading-relaxed text-white/80">{description}</p>
              {tags?.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-light text-white/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="border-b border-white/10 py-6">
              <h2 className="text-lg font-light">What this place offers</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {amenityList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-light text-white/80">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="py-6">
              <h2 className="text-lg font-light">About the area</h2>
              <p className="mt-3 font-light leading-relaxed text-white/75">
                {area ?? `A look at the neighborhood around ${location} is coming soon.`}
              </p>
            </section>
          </div>

          {/* Price card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-2xl font-light">
                ${pricePerNight}
                <span className="text-sm text-white/55"> / night</span>
              </p>

              <label className="mt-5 block text-sm">
                <span className="mb-2 block text-xs font-normal uppercase tracking-[0.12em] text-white/60">
                  Guests
                </span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-light text-white outline-none focus:border-white/50 [color-scheme:dark]"
                >
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="text-neutral-900">
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="mt-4 w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
              >
                Reserve
              </button>

              {tour3d && (
                <Link
                  to={`/tour/${id}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-neutral-900"
                >
                  <span aria-hidden="true">◎</span> Explore in 3D
                </Link>
              )}

              <p className="mt-4 text-center text-xs font-light text-white/50">
                You won’t be charged yet.
              </p>
            </div>
          </aside>
        </div>
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