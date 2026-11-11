import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

// Same mark as the favicon. To use your own artwork, replace public/logo.svg
// (or point this at /logo.png). If the file can't load, a CSS mark is shown instead.
const LOGO_SRC = '/logo.svg'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
  { to: '/contact', label: 'Contact' },
]

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0'

function LogoMark() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </span>
    )
  }

  return (
    <img
      src={LOGO_SRC}
      alt=""
      className="h-8 w-8 object-contain"
      onError={() => setFailed(true)}
    />
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Over the hero: light frosted glass. After scroll / other pages: a bit more solid, still soft.
  const solid = !isHome || scrolled

  return (
    <header
      className={[
        'z-50 w-full border-b border-white/10 backdrop-blur-xl transition-colors duration-300',
        isHome ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        solid ? 'bg-stone-900/70' : 'bg-black/20',
      ].join(' ')}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-md text-lg font-light tracking-[0.18em] text-white sm:text-xl ${focusRing}`}
        >
          <LogoMark />
          <span>LUMEN</span>
        </Link>

        <ul className="flex items-center gap-4 sm:gap-8">
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'block rounded-sm border-b py-1 text-sm font-light tracking-wide transition-all duration-300',
                    focusRing,
                    isActive
                      ? 'border-white/60 text-white'
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