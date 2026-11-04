import { useEffect, useMemo, useState } from 'react'

const SERVICE_FEE_RATE = 0.1

function toInputDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const [y1, m1, d1] = checkIn.split('-').map(Number)
  const [y2, m2, d2] = checkOut.split('-').map(Number)
  const diff = Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)
  return Math.max(0, Math.round(diff / 86400000))
}

export default function BookModal({ open, onClose, stay, initialGuests = 1 }) {
  const today = useMemo(() => toInputDate(new Date()), [])
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(initialGuests)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Reset every time the modal opens
  useEffect(() => {
    if (open) {
      setCheckIn('')
      setCheckOut('')
      setGuests(initialGuests)
      setSubmitted(false)
      setError('')
    }
  }, [open, initialGuests])

  // Escape to close + lock body scroll
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open || !stay) return null

  const nights = nightsBetween(checkIn, checkOut)
  const subtotal = nights * stay.pricePerNight
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE)
  const total = subtotal + serviceFee

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut) {
      setError('Please choose both a check-in and a check-out date.')
      return
    }
    if (nights < 1) {
      setError('Check-out must be after check-in.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${stay.title}`}
    >
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              ✓
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">Request sent (demo)</h2>
            <p className="mt-2 text-sm text-neutral-600">
              {stay.title}
              <br />
              {checkIn} → {checkOut} · {nights} {nights === 1 ? 'night' : 'nights'} · {guests}{' '}
              {guests === 1 ? 'guest' : 'guests'}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Estimated total ${total.toLocaleString()}. No payment was taken.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Request to book</h2>
                <p className="mt-1 text-sm text-neutral-500">{stay.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-neutral-700">Check-in</span>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    const v = e.target.value
                    setCheckIn(v)
                    if (checkOut && v && nightsBetween(v, checkOut) < 1) setCheckOut('')
                  }}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-neutral-700">Check-out</span>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
                />
              </label>
            </div>

            <label className="mt-3 block text-sm">
              <span className="mb-1 block font-medium text-neutral-700">Guests</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900"
              >
                {Array.from({ length: stay.guests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-6 space-y-2 rounded-2xl bg-neutral-50 p-4 text-sm">
              {nights > 0 ? (
                <>
                  <div className="flex justify-between text-neutral-600">
                    <span>
                      ${stay.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
                    </span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Service fee (est.)</span>
                    <span>${serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold text-neutral-900">
                    <span>Estimated total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <p className="text-neutral-500">Select your dates to see an estimate.</p>
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Confirm
            </button>
            <p className="mt-3 text-center text-xs text-neutral-500">
              Demo only. You won't be charged.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}