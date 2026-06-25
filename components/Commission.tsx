'use client'

import { FormEvent, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
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


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('sending')

    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Inquiry failed')
      }

      form.reset()
      setSubmitState('sent')
      trackEvent('inquiry_submitted', { service: String(payload.service ?? ''), budget: String(payload.budget ?? '') })
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
            <form className="commission-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
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
                <label htmlFor="budget">Budget Signal</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="">Not sure yet</option>
                  <option>$350-$750</option>
                  <option>$750-$1,500</option>
                  <option>$1,500-$3,500</option>
                  <option>$3,500+</option>
                </select>
              </div>
              <div className="field full">
                <label>Ideal Date Range</label>
                <DateRangePicker onRangeChange={(from, to) => { setDateFrom(from); setDateTo(to) }} />
                <input type="hidden" name="dateFrom" value={dateFrom} readOnly />
                <input type="hidden" name="dateTo" value={dateTo} readOnly />
              </div>
              <div className="field">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" type="text" placeholder="City, venue, property" />
              </div>
              <div className="field full">
                <label htmlFor="message">Project Notes</label>
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
                <button className="btn-line" type="submit" disabled={submitState === 'sending'}>
                  <span className="ln" />
                  {submitState === 'sending' ? 'Sending' : 'Send Inquiry'}
                </button>
                {submitState === 'sent' && (
                  <p className="form-note success">Inquiry received. We will reply within 24 hours.</p>
                )}
                {submitState === 'error' && (
                  <p className="form-note error">Something did not send. Email us directly and we will pick it up.</p>
                )}
              </div>
            </form>
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
