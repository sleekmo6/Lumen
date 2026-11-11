import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import StayCard from '../components/StayCard.jsx'
import { listings } from '../data/listings.js'

const PRICE_TIERS = [
  { key: '', label: 'Any price', test: () => true },
  { key: 'lt100', label: 'Under $100', test: (p) => p < 100 },
  { key: '100-200', label: '$100–$200', test: (p) => p >= 100 && p <= 200 },
  { key: 'gt200', label: '$200+', test: (p) => p > 200 },
]

const maxGuests = Math.max(...listings.map((l) => l.guests))

const labelClass = 'mb-2 block text-xs font-normal uppercase tracking-[0.12em] text-white/60'
const fieldClass =
  'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white placeholder-white/35 outline-none transition focus:border-white/50 focus:bg-white/10 [color-scheme:dark]'

export default function Explore() {
  // The URL is the single source of truth, so links from "Start Search" just work.
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const price = searchParams.get('price') ?? ''
  const tourOnly = searchParams.get('tour') === '1'
  const guests = Number(searchParams.get('guests')) || 0
  const from = searchParams.get('from') ?? ''
  const to = searchParams.get('to') ?? ''

  const setParam = (key, value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const tier = PRICE_TIERS.find((t) => t.key === price) ?? PRICE_TIERS[0]
    return listings.filter((stay) => {
      const matchesText =
        !needle ||
        stay.location.toLowerCase().includes(needle) ||
        stay.title.toLowerCase().includes(needle)
      return (
        matchesText &&
        tier.test(stay.pricePerNight) &&
        (!tourOnly || stay.tour3d) &&
        (!guests || stay.guests >= guests)
      )
    })
  }, [q, price, tourOnly, guests])

  const filtersActive = Boolean(q.trim() || price || tourOnly || guests || from || to)

  const clearAll = () => setSearchParams({}, { replace: true })

  return (
    <div className="surface-page min-h-[calc(100dvh-4rem)] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header>
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">Explore stays</h1>
          <p className="mt-2 text-sm font-light text-white/60">
            Search by city or place, then narrow by price, guests and 3D tours.
          </p>
        </header>

        {/* Filters */}
        <section
          aria-label="Search and filters"
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
            <div>
              <label htmlFor="explore-q" className={labelClass}>
                City or place
              </label>
              <input
                id="explore-q"
                type="search"
                value={q}
                onChange={(e) => setParam('q', e.target.value)}
                placeholder="Try “Lagos” or “villa”"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="explore-guests" className={labelClass}>
                Guests
              </label>
              <select
                id="explore-guests"
                value={guests || ''}
                onChange={(e) => setParam('guests', e.target.value)}
                className={fieldClass}
              >
                <option value="" className="text-neutral-900">
                  Any
                </option>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n} className="text-neutral-900">
                    {n}+ {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className={labelClass}>Price per night</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Price range">
                {PRICE_TIERS.map((tier) => {
                  const active = price === tier.key
                  return (
                    <button
                      key={tier.key || 'any'}
                      type="button"
                      onClick={() => setParam('price', tier.key)}
                      aria-pressed={active}
                      className={[
                        'rounded-full border px-4 py-2 text-sm font-light transition',
                        active
                          ? 'border-white bg-white text-neutral-900'
                          : 'border-white/20 text-white/75 hover:border-white/40 hover:text-white',
                      ].join(' ')}
                    >
                      {tier.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={tourOnly}
              onClick={() => setParam('tour', tourOnly ? '' : '1')}
              className="flex items-center gap-3 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-light text-white/85 transition hover:border-white/40 lg:self-auto"
            >
              <span
                aria-hidden="true"
                className={[
                  'relative h-5 w-9 rounded-full transition-colors',
                  tourOnly ? 'bg-white' : 'bg-white/25',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute top-0.5 h-4 w-4 rounded-full transition-all',
                    tourOnly ? 'left-[1.15rem] bg-neutral-900' : 'left-0.5 bg-white',
                  ].join(' ')}
                />
              </span>
              3D tour only
            </button>
          </div>

          {(from || to) && (
            <p className="mt-4 text-xs font-light text-white/50">
              Dates: {from || '…'} → {to || '…'} (availability isn’t checked in this demo)
            </p>
          )}
        </section>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-light text-white/60" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'}
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-light text-white/80 underline-offset-4 transition hover:text-white hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-white/20 px-6 py-16 text-center">
            <h2 className="text-lg font-light">No stays match your search</h2>
            <p className="mt-2 max-w-sm text-sm font-light text-white/60">
              Try a different place, loosen the price range, or turn off the 3D filter.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}