'use client'

import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'

export default function FlashIntro() {
  const [visible, setVisible] = useState(true)
  const [active, setActive]   = useState(false)
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    if (
      sessionStorage.getItem('atf-intro') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(false)
      return
    }

    sessionStorage.setItem('atf-intro', '1')
    setActive(true)

    const t1 = setTimeout(() => setLeaving(true), 1400)
    const t2 = setTimeout(() => setVisible(false), 2550)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`flash-intro${active ? ' flash-intro--active' : ''}${leaving ? ' flash-intro--leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="flash-intro__bg" />
      <div className="flash-intro__white" />
      <div className="flash-intro__logo-wrap">
        <Image
          src="/logo/WHITE LOGO.png"
          alt=""
          width={200}
          height={200}
          className="flash-intro__logo"
          priority
        />
      </div>
    </div>
  )
}
