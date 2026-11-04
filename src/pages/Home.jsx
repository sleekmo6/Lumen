import { Link } from 'react-router-dom'
import StayCard from '../components/StayCard.jsx'
import { listings } from '../data/listings.js'

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Stays you can step into
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Explore stays in 3D before you book.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-neutral-600 sm:text-lg">
          Walk through every room, check the light and the layout, and book with confidence.
        </p>
        <div className="mt-8">
          <Link
            to="/explore"
            className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Start exploring
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Featured stays</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      </section>
    </div>
  )
}