'use client'

import { FormEvent, useState } from 'react'
import { trackEvent, trackPixel } from '@/lib/analytics'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

// Compact, low-friction lead capture directly under the hero — the primary
// conversion point. Three fields, fires Lead on submit like the bottom form.
export default function RealtorQuoteForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('sending')

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const phone = String(data.get('phone') ?? '')
    const details = String(data.get('details') ?? '')

    const payload = {
      name,
      phone,
      service: 'Realtor Listing Content',
      message: `[Top-of-page quote request]\nProperty area + timeline:\n${details}`,
    }

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Inquiry failed')

      form.reset()
      setSubmitState('sent')
      trackEvent('inquiry_submitted', { service: 'Realtor Listing Content', source: 'realtors_top_form' })
      trackPixel('Lead', { content_category: 'Realtor Listing Content' })
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section className="band rl-quote" id="quote">
      <div className="shell">
        <div className="rl-quote-card reveal">
          {submitState === 'sent' ? (
            <div className="form-success" style={{ padding: '0.5rem 0' }}>
              <p className="form-success-eyebrow">Request received</p>
              <h3 className="form-success-heading">We&apos;ll text you back within the hour.</h3>
              <p className="form-success-body">
                Talk soon — we&apos;ll reach out with a quick quote and next steps.
              </p>
            </div>
          ) : (
            <>
              <div className="rl-quote-head">
                <h2>Get a quote — we&apos;ll text you back within the hour.</h2>
                <p>Three quick details and we&apos;ll reach out with pricing for your listing.</p>
              </div>
              <form className="rl-quote-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="rl-quote-name">Name</label>
                  <input id="rl-quote-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="rl-quote-phone">Phone</label>
                  <input id="rl-quote-phone" name="phone" type="tel" placeholder="(205) 555-0199" autoComplete="tel" inputMode="tel" required />
                </div>
                <div className="field">
                  <label htmlFor="rl-quote-details">Property area + timeline</label>
                  <input id="rl-quote-details" name="details" type="text" placeholder="Where's the listing, and when does it go live?" required />
                </div>
                <div className="rl-quote-actions">
                  <button className="rl-cta" type="submit" disabled={submitState === 'sending'}>
                    {submitState === 'sending' ? 'Sending…' : 'Get My Quote'} <span className="arr" />
                  </button>
                  {submitState === 'error' && (
                    <p className="form-note error">
                      Something went wrong. Try again, or email{' '}
                      <a href="mailto:aftertheflashmedia@gmail.com">aftertheflashmedia@gmail.com</a>.
                    </p>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
