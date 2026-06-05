'use client'

import { useEffect, useState } from 'react'

export default function FlashIntro() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('atf-intro')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    sessionStorage.setItem('atf-intro', '1')
    setVisible(true)

    const t1 = setTimeout(() => setLeaving(true), 2600)
    const t2 = setTimeout(() => setVisible(false), 3550)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div className={`flash-intro${leaving ? ' flash-intro--leaving' : ''}`} aria-hidden="true">
      <div className="flash-intro__burst" />
      <div className="flash-intro__vignette" />
      <div className="flash-intro__content">
        <div className="flash-intro__rule" />
        <span className="flash-intro__line flash-intro__line--1">After the</span>
        <span className="flash-intro__line flash-intro__line--2">Flash</span>
      </div>
    </div>
  )
}
