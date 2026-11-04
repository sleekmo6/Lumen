import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-neutral-900">
          Lumen
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4',
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
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