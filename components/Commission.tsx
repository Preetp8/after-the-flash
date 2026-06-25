'use client'

import { FormEvent, useState } from 'react'
import { trackEvent, trackPixel } from '@/lib/analytics'
import DateRangePicker from './DateRangePicker'

const bookingUrl = 'https://calendly.com/aftertheflashmedia/30min'

const NOTE_PROMPTS = [
  { label: 'Real Estate', text: 'Listing at [address]. Need photos + video walkthrough. Property is [sq ft / beds / baths]. Going live around [date].' },
  { label: 'Wedding', text: 'Wedding at [venue], [city]. Ceremony at [time], reception until [time]. Looking for full day coverage — ceremony, portraits, and reception.' },
  { label: 'Engagement', text: 'Engagement session for [names]. Outdoor preferred, [location / vibe]. Relaxed and natural feel, no overly posed shots.' },
  { label: 'Graduation', text: 'Graduation portraits for [name], [school / program]. Outdoor session, [city]. Want a mix of formal and candid shots.' },
  { label: 'Brand / Event', text: 'Brand shoot for [business name]. Need [headshots / product / event coverage]. Will be used for [website / social / print].' },
]

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

export default function Commission() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [activePrompt, setActivePrompt] = useState<string | null>(null)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [emailError, setEmailError] = useState('')

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
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Inquiry failed')

      form.reset()
      setActivePrompt(null)
      setDateFrom('')
      setDateTo('')
      setSubmitState('sent')
      trackEvent('inquiry_submitted', { service: String(payload.service ?? ''), budget: String(payload.budget ?? '') })
      trackPixel('Lead', { content_category: String(payload.service ?? '') })
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section className="band alt" id="commission">
      <div className="shell">
        <div className="commission">
          <div className="commission-copy reveal">
            <span className="section-index">V - Inquire</span>
            <h2 className="display">
              Commission<br />a Shoot
            </h2>
            <p className="lede">
              Tell us what you are making. We work across Alabama and the Southeast:
              real estate, events, portraits, and brand content. We read every note.
            </p>
            <div className="contact-meta">
              <div className="item">
                <span className="k">Team</span>
                <span className="v">
                  <a href="mailto:aftertheflashmedia@gmail.com" onClick={() => trackEvent('email_click', { source: 'commission' })}>aftertheflashmedia@gmail.com</a>
                </span>
              </div>
              <div className="item">
                <span className="k">Based</span>
                <span className="v">Alabama &amp; the Southeast</span>
              </div>
              <div className="item">
                <span className="k">Response time</span>
                <span className="v">Within 24 hours</span>
              </div>
            </div>
          </div>

          <div className="commission-panel reveal">
            {submitState === 'sent' ? (
              <div className="form-success">
                <p className="form-success-eyebrow">Inquiry received</p>
                <h3 className="form-success-heading">We will be in touch within 24 hours.</h3>
                <p className="form-success-body">
                  While you wait, you are welcome to book a discovery call to talk through the shoot in detail.
                </p>
                <div className="form-success-actions">
                  <a className="booking-cta" href={bookingUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('calendly_click', { source: 'success_cta' })}>
                    Book a Discovery Call
                  </a>
                  <button className="form-success-reset" type="button" onClick={() => setSubmitState('idle')}>
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="commission-form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                    onBlur={e => validateEmail(e.target.value)}
                    onChange={e => { if (emailError) validateEmail(e.target.value) }}
                  />
                  {emailError && <span className="field-error">{emailError}</span>}
                </div>

                <div className="field">
                  <label htmlFor="service">Shoot Type</label>
                  <select id="service" name="service" defaultValue="" required>
                    <option value="" disabled>Select one</option>
                    <option>Real Estate</option>
                    <option>Event Coverage</option>
                    <option>Portrait Session</option>
                    <option>Brand Content</option>
                    <option>Film + Photo</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="budget">
                    Budget <span className="field-optional">(optional)</span>
                  </label>
                  <select id="budget" name="budget" defaultValue="">
                    <option value="">Not sure yet</option>
                    <option>$350–$750</option>
                    <option>$750–$1,500</option>
                    <option>$1,500–$3,500</option>
                    <option>$3,500+</option>
                  </select>
                  <span className="field-hint">Helps us suggest the right package — no commitment.</span>
                </div>

                <div className="field full">
                  <label>
                    Ideal Date Range <span className="field-optional">(optional)</span>
                  </label>
                  <DateRangePicker onRangeChange={(from, to) => { setDateFrom(from); setDateTo(to) }} />
                  <input type="hidden" name="dateFrom" value={dateFrom} readOnly />
                  <input type="hidden" name="dateTo" value={dateTo} readOnly />
                  <span className="field-hint">Pick a single day or a window — we will work around your schedule.</span>
                </div>

                <div className="field">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location" name="location" type="text"
                    placeholder="City, venue, or property address"
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div className="field full">
                  <label htmlFor="message">Project Notes</label>
                  <p className="field-hint" style={{ marginBottom: '0.6rem' }}>Start from a template or write your own:</p>
                  <div className="note-prompts">
                    {NOTE_PROMPTS.map(p => (
                      <button
                        key={p.label}
                        type="button"
                        className={`note-prompt-chip${activePrompt === p.label ? ' active' : ''}`}
                        onClick={() => setActivePrompt(p.label)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={NOTE_PROMPTS.find(p => p.label === activePrompt)?.text ?? 'What are we making, where will it live, and what should it feel like?'}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-line" type="submit" disabled={submitState === 'sending' || !!emailError}>
                    <span className="ln" />
                    {submitState === 'sending' ? 'Sending…' : 'Send Inquiry'}
                  </button>
                  {submitState === 'error' && (
                    <p className="form-note error">
                      Something went wrong on our end. Try again, or email us directly at{' '}
                      <a href="mailto:aftertheflashmedia@gmail.com">aftertheflashmedia@gmail.com</a>.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          <aside className="booking-panel reveal" id="booking">
            <div className="booking-head">
              <span className="section-index">Discovery Call</span>
              <a href={bookingUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('calendly_click', { source: 'open_calendar' })}>Open Calendar</a>
            </div>
            <div className="booking-body">
              <div className="booking-copy">
                <span className="booking-label">30 minute consult</span>
                <h3>Find the right shape for the shoot.</h3>
                <p>
                  Use the calendar to grab a discovery call. We will talk through the story,
                  schedule, location, usage, deliverables, and what the finished set needs to do
                  before we shape the quote or production plan.
                </p>
              </div>
              <a className="booking-cta" href={bookingUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('calendly_click', { source: 'book_call' })}>
                Book a Discovery Call
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
