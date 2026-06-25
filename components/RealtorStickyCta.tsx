'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

// Mobile-only sticky booking bar. Shows after the hero is scrolled past and
// hides once the booking section comes into view, so it never competes with
// the inline Calendly. Keeps the single conversion path one tap away.
export default function RealtorStickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const book = document.getElementById('book')
    let frame = 0

    function update() {
      const heroH = hero?.offsetHeight ?? window.innerHeight
      const pastHero = window.scrollY > heroH * 0.6
      const bookTop = book?.getBoundingClientRect().top ?? Infinity
      const bookReached = bookTop < window.innerHeight * 0.85
      setShow(pastHero && !bookReached)
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
      href="#book"
      className={`rl-sticky-cta${show ? ' show' : ''}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => trackEvent('cta_click', { source: 'sticky_mobile' })}
    >
      <span>Book a Discovery Call</span>
      <span className="rl-sticky-arr" aria-hidden="true" />
    </a>
  )
}
