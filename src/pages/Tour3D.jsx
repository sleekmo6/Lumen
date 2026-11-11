import { Link, useParams } from 'react-router-dom'
import ApartmentScene from '../three/ApartmentScene.jsx'
import { getListingById } from '../data/listings.js'

export default function Tour3D() {
  const { id } = useParams()
  const stay = getListingById(id)

  if (!stay || !stay.tour3d) {
    return (
      <div className="surface-page flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">No 3D tour available</h1>
        <p className="mt-3 max-w-md text-sm font-light text-white/65">
          {stay ? 'This stay doesn’t have a 3D tour yet.' : 'We couldn’t find that stay.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {stay && (
            <Link
              to={`/stay/${stay.id}`}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-light text-white transition hover:bg-white/10"
            >
              Back to stay
            </Link>
          )}
          <Link
            to="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
          >
            Go home
          </Link>
        </div>
      </div>
    )
  }

  return (
    // Navbar is 4rem tall, so this fills the rest of the viewport exactly.
    <div className="flex h-[calc(100dvh-4rem)] flex-col bg-lumen-deep text-white">
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <Link
          to={`/stay/${stay.id}`}
          className="shrink-0 text-sm font-light text-white/70 transition hover:text-white"
        >
          ← Back to stay
        </Link>
        <h1 className="truncate text-sm font-light sm:text-base">{stay.title}</h1>
      </div>

      <div className="relative min-h-0 flex-1">
        <ApartmentScene modelPath={stay.modelPath} />
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
          Drag to rotate · Scroll or pinch to zoom
        </p>
      </div>
    </div>
  )
}