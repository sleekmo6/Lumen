import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StayCard from '../components/StayCard.jsx'
import { listings } from '../data/listings.js'

// Swap this URL to change the hero photo
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1782392230060-be8a3984a58c?auto=format&fit=crop&w=2400&q=80'

// Dark gradient so white text stays readable on any photo
const HERO_OVERLAY =
  'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.78) 100%)'

const labelClass = 'mb-3 block text-xs font-normal uppercase tracking-[0.12em] text-white/90'
const fieldClass =
  'w-full rounded-full border border-white/50 bg-white/5 px-5 py-3 text-sm font-light text-white placeholder-white/70 backdrop-blur-sm outline-none transition focus:border-white focus:bg-white/10 [color-scheme:dark]'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.8v8h3.2z" />
    </svg>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [where, setWhere] = useState('')
  const [arrival, setArrival] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // "Where" seeds the Explore search. Dates and guests are visual-only for now.
    const q = where.trim()
    navigate({
      pathname: '/explore',
      search: q ? `?q=${encodeURIComponent(q)}` : '',
    })
  }

  const scrollToStays = () =>
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-neutral-900">
        <img
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: HERO_OVERLAY }}
        />

        <div className="relative z-10 w-full max-w-5xl px-5 pb-28 pt-28 sm:px-8">
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book unique accommodation and impressions
          </h1>

          <div className="mt-10 h-px w-full bg-white/50" />

          <form
            onSubmit={handleSearch}
            className="mt-12 grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]"
          >
            <div>
              <label htmlFor="where" className={labelClass}>
                Where
              </label>
              <input
                id="where"
                type="text"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Anywhere"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="arrival" className={labelClass}>
                Arrival
              </label>
              <input
                id="arrival"
                type="date"
                value={arrival}
                onChange={(e) => {
                  const v = e.target.value
                  setArrival(v)
                  if (checkout && v && checkout <= v) setCheckout('')
                }}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="checkout" className={labelClass}>
                Check out
              </label>
              <input
                id="checkout"
                type="date"
                min={arrival || undefined}
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="guests" className={labelClass}>
                Guests
              </label>
              <div className="relative">
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="" className="text-neutral-900">
                    The guests
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="text-neutral-900">
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 sm:col-span-2 lg:col-span-1 lg:w-auto"
            >
              Start Search
            </button>
          </form>
        </div>

        {/* Bottom row: social, scroll cue, local copy */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex items-end justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Lumen on X"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 transition hover:bg-neutral-200"
              >
                <XIcon />
              </a>
              <a
                href="#"
                aria-label="Lumen on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 transition hover:bg-neutral-200"
              >
                <FacebookIcon />
              </a>
            </div>
            <button
              type="button"
              onClick={scrollToStays}
              className="ml-4 hidden items-center gap-3 text-sm font-light text-white/90 transition hover:text-white sm:flex"
            >
              Scroll
              <span aria-hidden="true" className="block h-6 w-px animate-pulse bg-white/70" />
            </button>
          </div>

          <p className="max-w-[11rem] text-right text-sm font-light leading-snug text-white/90 sm:max-w-none">
            Over 300 unique stays,
            <br />
            starting right here in Lagos
          </p>
        </div>
      </section>

      {/* Featured stays */}
      <section id="featured" className="bg-neutral-950 px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Featured stays</h2>
              <p className="mt-2 text-sm font-light text-white/60">
                Hand-picked places you can walk through before you book.
              </p>
            </div>
            <Link
              to="/explore"
              className="shrink-0 text-sm font-light text-white/80 underline-offset-4 transition hover:text-white hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}