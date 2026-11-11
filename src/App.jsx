import { lazy, Suspense, useEffect } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import StayDetail from './pages/StayDetail.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'

// Lazy-loaded so three.js stays out of the main bundle until a tour is opened
const Tour3D = lazy(() => import('./pages/Tour3D.jsx'))

function RouteFallback() {
  return (
    <div className="surface-page flex min-h-[calc(100dvh-4rem)] items-center justify-center text-sm font-light text-white/60">
      Loading…
    </div>
  )
}

function NotFound() {
  return (
    <div className="surface-page flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 text-center text-white">
      <p className="text-xs font-normal uppercase tracking-[0.2em] text-white/50">404</p>
      <h1 className="mt-3 text-3xl font-light tracking-tight">Page not found</h1>
      <Link
        to="/"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
      >
        Go home
      </Link>
    </div>
  )
}

// Start every page at the top when the route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  // The 3D tour fills the whole viewport, so no footer there
  const showFooter = !pathname.startsWith('/tour')

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/stay/:id" element={<StayDetail />} />
            <Route path="/tour/:id" element={<Tour3D />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}