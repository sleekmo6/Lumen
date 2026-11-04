import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
]

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          to="/"
          className={`flex items-center gap-2 rounded-md text-xl font-semibold tracking-tight text-neutral-900 ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-neutral-900"
          />
          Lumen
        </Link>

        <ul className="flex items-center gap-1 rounded-full bg-neutral-100 p-1">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'block rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    focusRing,
                    isActive
                      ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-neutral-200'
                      : 'text-neutral-500 hover:text-neutral-900',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}