'use client'

import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'

export default function FlashIntro() {
  const [visible, setVisible] = useState(true)   // true from first render — overlay blocks site immediately
  const [active, setActive]   = useState(false)  // animations only start after layout effect confirms first visit
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    // Runs synchronously before browser paints — returning visitors see 0 frames of overlay
    if (
      sessionStorage.getItem('atf-intro') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(false)
      return
    }

    sessionStorage.setItem('atf-intro', '1')
    setActive(true)

    const t1 = setTimeout(() => setLeaving(true), 1800)
    const t2 = setTimeout(() => setVisible(false), 2650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`flash-intro${active ? ' flash-intro--active' : ''}${leaving ? ' flash-intro--leaving' : ''}`}
      aria-hidden="true"
    >
      {/* Separate div so the dark bg can fade independently from the radial circle */}
      <div className="flash-intro__bg" />
      <div className="flash-intro__burst" />
      <div className="flash-intro__radial" />
      <Image
        src="/logo/WHITE LOGO.png"
        alt=""
        width={200}
        height={200}
        className="flash-intro__logo"
        priority
      />
    </div>
  )
}
