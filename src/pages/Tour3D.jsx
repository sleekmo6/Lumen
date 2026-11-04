import { Link, useParams } from 'react-router-dom'
import ApartmentScene from '../three/ApartmentScene.jsx'
import { getListingById } from '../data/listings.js'

export default function Tour3D() {
  const { id } = useParams()
  const stay = getListingById(id)

  if (!stay || !stay.tour3d) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          No 3D tour available
        </h1>
        <p className="mt-2 max-w-md text-sm text-neutral-600">
          {stay
            ? 'This stay doesn’t have a 3D tour yet.'
            : 'We couldn’t find that stay.'}
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Go home
        </Link>
      </div>
    )
  }

  return (
    // Navbar is 4rem tall, so this fills the rest of the viewport exactly.
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      <div className="flex items-center gap-4 border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
        <Link
          to={`/stay/${stay.id}`}
          className="shrink-0 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
        >
          ← Back to stay
        </Link>
        <h1 className="truncate text-sm font-semibold text-neutral-900 sm:text-base">
          {stay.title}
        </h1>
      </div>

      <div className="relative min-h-0 flex-1">
        <ApartmentScene modelPath={stay.modelPath} />
        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
          Drag to rotate · Scroll or pinch to zoom
        </p>
      </div>
    </div>
  )
}