import { useState } from 'react'

// Optional: add a number in international format, digits only (e.g. '2348012345678').
// Leave empty to hide the WhatsApp link.
const WHATSAPP_NUMBER = ''

const labelClass = 'mb-2 block text-xs font-normal uppercase tracking-[0.12em] text-white/70'
const fieldClass =
  'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white placeholder-white/35 outline-none transition focus:border-white/50 focus:bg-white/10'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (sent) setSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit — replace with a real API call or email service later
    console.log('Contact form submitted:', form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] surface-page px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-normal uppercase tracking-[0.2em] text-white/50">Contact</p>
        <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-5xl">Let’s talk</h1>
        <p className="mt-4 text-base font-light leading-relaxed text-white/70">
          Questions about a stay, a 3D tour, or hosting with Lumen? Send us a note and we’ll get
          back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={update('name')}
              placeholder="Your name"
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={update('message')}
              placeholder="How can we help?"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200 sm:w-auto"
          >
            Send message
          </button>

          {sent && (
            <p role="status" className="text-sm font-light text-emerald-300">
              Thanks — your message was received (demo, nothing was actually sent).
            </p>
          )}
        </form>

        {WHATSAPP_NUMBER && (
          <p className="mt-10 text-sm font-light text-white/60">
            Prefer chat?{' '}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4 transition hover:text-white/80"
            >
              Message us on WhatsApp
            </a>
          </p>
        )}
      </div>
    </div>
  )
}