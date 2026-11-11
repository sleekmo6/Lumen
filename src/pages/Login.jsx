import { useState } from 'react'
import { Link } from 'react-router-dom'

const labelClass = 'mb-2 block text-xs font-normal uppercase tracking-[0.12em] text-white/70'
const fieldClass =
  'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white placeholder-white/35 outline-none transition focus:border-white/50 focus:bg-white/10'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock sign-in — replace with real auth (e.g. Supabase) later. Never log passwords.
    console.log('Sign in (mock):', { email })
    setStatus('Signed in (demo). No real account was used.')
    setPassword('')
  }

  return (
    <div className="surface-page flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <p className="text-xs font-normal uppercase tracking-[0.2em] text-white/50">Welcome back</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">Sign in to Lumen</h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
          Save stays, keep track of requests and pick up where you left off.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className={labelClass}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status) setStatus('')
              }}
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={labelClass}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={fieldClass}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
          >
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 text-xs text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={() => setStatus('Google sign-in isn’t connected yet (UI only).')}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-light text-white transition hover:bg-white/10"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <GoogleIcon />
          </span>
          Continue with Google
        </button>

        {status && (
          <p role="status" className="mt-5 text-center text-sm font-light text-emerald-300">
            {status}
          </p>
        )}

        <p className="mt-8 text-center text-sm font-light text-white/60">
          <Link to="/" className="underline underline-offset-4 transition hover:text-white">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}