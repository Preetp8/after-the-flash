'use client'
import { useState } from 'react'

interface FormState {
  name: string
  email: string
  type: string
  location: string
  message: string
}

const INITIAL: FormState = { name: '', email: '', type: 'Real Estate', location: '', message: '' }

export default function Commission() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(key: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  return (
    <section className="band alt" id="commission">
      <div className="shell">
        <div className="commission">
          <div className="intro reveal">
            <span className="section-index">IV — Inquire</span>
            <h2 className="display" style={{ marginTop: '1.2rem' }}>
              Commission<br />a Shoot
            </h2>
            <p className="lede">
              Tell us what you&rsquo;re making. We take on a limited number of commissions each
              season, and we read every note.
            </p>
            <div className="contact-meta">
              <div className="item">
                <span className="k">Studio</span>
                <span className="v">
                  <a href="mailto:hello@aftertheflash.studio">hello@aftertheflash.studio</a>
                </span>
              </div>
              <div className="item">
                <span className="k">Based</span>
                <span className="v">Los Angeles &amp; New York</span>
              </div>
              <div className="item">
                <span className="k">Hours</span>
                <span className="v">By appointment</span>
              </div>
            </div>
          </div>

          <form className="commission-form reveal" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success">
                <strong>Thank you.</strong> We&rsquo;ll be in touch shortly.
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="f-name">Name</label>
                  <input
                    id="f-name" type="text" placeholder="Your name" required
                    value={form.name} onChange={e => set('name', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input
                    id="f-email" type="email" placeholder="you@studio.com" required
                    value={form.email} onChange={e => set('email', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-type">Commission</label>
                  <select id="f-type" value={form.type} onChange={e => set('type', e.target.value)}>
                    <option>Real Estate</option>
                    <option>Events</option>
                    <option>Portraits</option>
                    <option>Brand Content</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-loc">Location</label>
                  <input
                    id="f-loc" type="text" placeholder="City, State"
                    value={form.location} onChange={e => set('location', e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label htmlFor="f-msg">The brief</label>
                  <textarea
                    id="f-msg" placeholder="A few lines on what you have in mind, and when."
                    value={form.message} onChange={e => set('message', e.target.value)}
                  />
                </div>
                <button className="btn-line" type="submit" disabled={loading}>
                  <span className="ln" />
                  {loading ? 'Sending…' : 'Send Inquiry'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
