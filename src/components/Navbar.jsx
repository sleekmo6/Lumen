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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Frosted glass over the hero; a bit more solid after scroll, on inner pages, or with the menu open
  const solid = !isHome || scrolled || menuOpen

  return (
    <>
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

          {/* Desktop / tablet */}
          <div className="hidden items-center gap-8 sm:flex">
            <ul className="flex items-center gap-8">
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

            <Link
              to="/login"
              className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm font-light text-white/90 transition hover:bg-white/15 hover:text-white ${focusRing}`}
            >
              <span aria-hidden="true">👤</span>
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 sm:hidden ${focusRing}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile soft menu */}
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/30 sm:hidden"
          />
          <div
            id="mobile-menu"
            className="menu-in fixed inset-x-3 top-[4.5rem] z-[45] rounded-2xl border border-white/10 bg-stone-900/80 p-2 shadow-2xl backdrop-blur-xl sm:hidden"
          >
            <ul className="flex flex-col">
              {links.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      [
                        'block rounded-xl px-4 py-3 text-base font-light transition-colors',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/75 hover:bg-white/5 hover:text-white',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-1 border-t border-white/10 pt-1">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 rounded-xl px-4 py-3 text-base font-light transition-colors',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/75 hover:bg-white/5 hover:text-white',
                    ].join(' ')
                  }
                >
                  <span aria-hidden="true">👤</span>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}