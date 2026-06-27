'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { trackEvent, trackPixel } from '@/lib/analytics'

const bookingUrl = 'https://calendly.com/aftertheflashmedia/30min'
const calendlyEmbedUrl = `${bookingUrl}?hide_gdpr_banner=1&background_color=f4efe6&text_color=1b1916&primary_color=b26450`

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement; resize?: boolean }) => void
    }
  }
}

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

export default function RealtorBooking() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [emailError, setEmailError] = useState('')
  const [useIframeFallback, setUseIframeFallback] = useState(false)
  const calRef = useRef<HTMLDivElement>(null)
  const calInit = useRef(false)

  const initCalendly = useCallback(() => {
    if (calInit.current || !window.Calendly || !calRef.current) return
    if (calRef.current.querySelector('iframe')) {
      calInit.current = true
      return
    }

    try {
      window.Calendly.initInlineWidget({
        url: calendlyEmbedUrl,
        parentElement: calRef.current,
      })
      calInit.current = true
    } catch {
      setUseIframeFallback(true)
    }
  }, [])

  // Fire a Lead when a discovery call is actually booked in the inline
  // Calendly widget (the iframe posts a calendly.event_scheduled message).
  // Note: bookings completed in a separate Calendly tab cannot be observed
  // here — only inline-widget completions fire this.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== 'string' || !e.origin.includes('calendly.com')) return
      let data = e.data
      if (typeof data === 'string') {
        try { data = JSON.parse(data) } catch { return }
      }
      if (data?.event === 'calendly.event_scheduled') {
        trackEvent('calendly_booked', { source: 'realtors_lp' })
        trackPixel('Lead', { content_category: 'Discovery Call' })
        trackPixel('Schedule', { content_category: 'Discovery Call' })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    initCalendly()
  }, [initCalendly])

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      if (!calRef.current?.querySelector('iframe')) {
        setUseIframeFallback(true)
      }
    }, 3500)

    return () => window.clearTimeout(fallbackTimer)
  }, [])

  function validateEmail(value: string) {
    if (!value) { setEmailError(''); return }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    setEmailError(valid ? '' : 'Please enter a valid email address')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (emailError) return
    setSubmitState('sending')

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '')
    const details = String(data.get('details') ?? '')

    if (!name || !email || !phone || !details) {
      setSubmitState('error')
      return
    }

    // Reuse the homepage inquiry endpoint (Resend).
    const payload = {
      name,
      email,
      phone,
      service: 'Realtor Listing Content',
      message: `Property area + timeline:\n${details}`,
    }

    trackEvent('inquiry_submitted', { service: 'Realtor Listing Content', source: 'realtors_lp' })
    trackPixel('Lead', { content_category: 'Realtor Listing Content' })

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Inquiry failed')

      form.reset()
      setSubmitState('sent')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section className="band rl-book" id="book">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initCalendly}
        onReady={initCalendly}
      />
      <div className="shell">
        <div className="section-head reveal" style={{ maxWidth: '46ch' }}>
          <span className="section-index">Book the Call</span>
          <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5.6vw,4.6rem)' }}>
            Find the right<br />shape for the shoot.
          </h2>
          <p className="lede">
            Grab a free 15-minute call and we&apos;ll talk through the property, your
            timeline, and which package fits. Prefer we reach out? Use the short form.
          </p>
        </div>

        <div className="rl-book-grid">
          <div className="rl-book-cal">
            <div className="rl-book-head">
              <span className="booking-label">15-min quote call</span>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('calendly_click', { source: 'realtors_open_tab' })}
              >
                Open in Calendly ↗
              </a>
            </div>
            {useIframeFallback ? (
              <iframe
                className="calendly-inline-widget reveal"
                title="Book a 30-minute discovery call with After the Flash"
                src={calendlyEmbedUrl}
                loading="lazy"
              />
            ) : (
              <div ref={calRef} className="calendly-inline-widget reveal" data-url={calendlyEmbedUrl} />
            )}
          </div>

          <div className="rl-fallback reveal">
            {submitState === 'sent' ? (
              <div className="form-success" style={{ padding: '1rem 0' }}>
                <p className="form-success-eyebrow">Request received</p>
                <h3 className="form-success-heading">We&apos;ll reach out within the hour.</h3>
                <p className="form-success-body">
                  Want to lock a time now? Pick a slot in the calendar to book your
                  discovery call.
                </p>
                <div className="form-success-actions">
                  <a
                    className="rl-cta"
                    href="#book"
                    onClick={() => trackEvent('calendly_click', { source: 'realtors_success' })}
                  >
                    Go to the Calendar <span className="arr" />
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h3>Want a quote instead? We&apos;ll reply within the hour.</h3>
                <p>Leave your details and we&apos;ll get back to you within the hour.</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field">
                    <label htmlFor="rl-name">Name</label>
                    <input id="rl-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="rl-email">Email</label>
                    <input
                      id="rl-email" name="email" type="email"
                      placeholder="you@example.com"
                      autoComplete="email" inputMode="email" required
                      onBlur={e => validateEmail(e.target.value)}
                      onChange={e => { if (emailError) validateEmail(e.target.value) }}
                    />
                    {emailError && <span className="field-error">{emailError}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="rl-phone">Phone</label>
                    <input id="rl-phone" name="phone" type="tel" placeholder="(205) 555-0199" autoComplete="tel" inputMode="tel" required />
                  </div>
                  <div className="field">
                    <label htmlFor="rl-details">Property area + timeline</label>
                    <textarea
                      id="rl-details" name="details"
                      placeholder="Where's the listing, and when does it need to go live?"
                      required
                    />
                  </div>
                  <div className="form-actions" style={{ marginTop: 0 }}>
                    <button className="btn-line" type="submit" disabled={submitState === 'sending' || !!emailError}>
                      <span className="ln" />
                      {submitState === 'sending' ? 'Sending…' : 'Request a Callback'}
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
      </div>
    </section>
  )
}
