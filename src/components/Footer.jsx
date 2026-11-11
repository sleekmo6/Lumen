import { Link } from 'react-router-dom'

// Add the 3D model's source/credit here (e.g. 'Apartment model by Name, CC BY 4.0').
// Leave empty to hide it.
const MODEL_CREDIT = ''

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-lumen-foot px-5 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-light tracking-[0.18em]">LUMEN</p>
          <p className="mt-2 max-w-xs text-sm font-light text-white/60">
            Unique stays you can walk through. Lagos first.
          </p>
        </div>

        <ul className="flex gap-8 text-sm font-light text-white/70">
          <li>
            <Link to="/explore" className="transition hover:text-white">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs font-light leading-relaxed text-white/45">
        <p>
          Photos from{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition hover:text-white/70"
          >
            Unsplash
          </a>
          .{MODEL_CREDIT ? ` ${MODEL_CREDIT}.` : ''}
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Lumen. Demo project.</p>
      </div>
    </footer>
  )
}