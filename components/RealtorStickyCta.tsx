'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

// Mobile-only sticky quote bar. Shows after the hero is scrolled past and
// hides whenever a form section (top quote form or bottom booking) is on
// screen, so it never covers the fields the user is filling. Points at the
// same low-friction quote form the hero CTA uses — one tap to a lead.
export default function RealtorStickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const quote = document.getElementById('quote')
    const book = document.getElementById('book')
    let frame = 0

    // True when any part of el sits within the viewport (with margins).
    function inView(el: HTMLElement | null) {
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15
    }

    function update() {
      const heroH = hero?.offsetHeight ?? window.innerHeight
      const pastHero = window.scrollY > heroH * 0.6
      const formOnScreen = inView(quote) || inView(book)
      setShow(pastHero && !formOnScreen)
    }

    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => { frame = 0; update() })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <a
      href="#quote"
      className={`rl-sticky-cta${show ? ' show' : ''}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => trackEvent('cta_click', { source: 'sticky_mobile' })}
    >
      <span>Get a Free Quote</span>
      <span className="rl-sticky-arr" aria-hidden="true" />
    </a>
  )
}
