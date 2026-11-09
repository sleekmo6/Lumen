import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
]

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  // On the home page the bar is transparent over the hero, then turns dark once you scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = !isHome || scrolled

  return (
    <header
      className={[
        'z-50 w-full border-b transition-colors duration-300',
        isHome ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        solid
          ? 'border-white/10 bg-neutral-950/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          to="/"
          className={`flex items-center gap-2.5 rounded-md text-xl font-light tracking-[0.18em] text-white ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full border border-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          LUMEN
        </Link>

        <ul className="flex items-center gap-5 sm:gap-8">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'block rounded-sm border-b py-1 text-sm font-light tracking-wide transition-colors duration-200',
                    focusRing,
                    isActive
                      ? 'border-white text-white'
                      : 'border-transparent text-white/70 hover:text-white',
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