import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import StayDetail from './pages/StayDetail.jsx'

// Lazy-loaded so three.js stays out of the main bundle until a tour is opened
const Tour3D = lazy(() => import('./pages/Tour3D.jsx'))

function RouteFallback() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center text-sm text-neutral-500">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/stay/:id" element={<StayDetail />} />
            <Route path="/tour/:id" element={<Tour3D />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}