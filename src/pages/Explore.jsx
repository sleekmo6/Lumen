import { useMemo, useState } from 'react'
import StayCard from '../components/StayCard.jsx'
import { listings } from '../data/listings.js'

const PRICE_STEP = 5
const prices = listings.map((l) => l.pricePerNight)
const PRICE_MIN = Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP
const PRICE_MAX = Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP

const BED_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
]

export default function Explore() {
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [minBeds, setMinBeds] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return listings.filter((stay) => {
      const matchesQuery =
        !q ||
        stay.title.toLowerCase().includes(q) ||
        stay.location.toLowerCase().includes(q)
      return matchesQuery && stay.pricePerNight <= maxPrice && stay.beds >= minBeds
    })
  }, [query, maxPrice, minBeds])

  const filtersActive = query.trim() !== '' || maxPrice !== PRICE_MAX || minBeds !== 0

  const clearAll = () => {
    setQuery('')
    setMaxPrice(PRICE_MAX)
    setMinBeds(0)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Explore stays</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Search by name or place, then narrow by price and bedrooms.
        </p>
      </header>

      {/* Filters */}
      <section
        aria-label="Search and filters"
        className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 sm:p-5"
      >
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_auto] md:items-end">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-700">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “Lagos” or “villa”"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 flex items-center justify-between font-medium text-neutral-700">
              <span>Max price / night</span>
              <span className="text-neutral-900">${maxPrice}</span>
            </span>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-10 w-full accent-neutral-900"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-700">Bedrooms</span>
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(Number(e.target.value))}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900 md:w-28"
            >
              {BED_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Results */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-neutral-600" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-medium text-neutral-700 underline-offset-4 transition hover:text-neutral-900 hover:underline"
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
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No stays match your search</h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600">
            Try a different keyword, raise the price limit, or lower the bedroom count.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}