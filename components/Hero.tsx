'use client'

import { useState, useEffect } from 'react'
import Photo from './Photo'

const slides = [
  { src: '/photos/wedding/edited/PRT06167.webp', pos: 'center 35%', scale: 'cover' },
  { src: '/photos/bridal/edited/PRT00709.webp',  pos: 'center',     scale: 'cover' },
  { src: '/photos/bridal/edited/PRT00794.webp',  pos: 'center',     scale: 'cover' },
]

const INTERVAL = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="top">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0,
          }}
        >
          <Photo src={slide.src} alt="" tone="211e19" pos={slide.pos} scale={slide.scale} />
        </div>
      ))}
      <div className="tint" />
      <div className="frame-inset" />
      <div className="scroll-cue">Scroll</div>
      <div className="hero-content">
        <p className="eyebrow">After the Flash - Photography &amp; Film</p>
        <h1>
          After the <span className="accent">Flash</span>
        </h1>
        <div className="hero-foot">
          <p>A photography and film team based in Alabama, serving the Southeast. Every commission treated as a piece worth hanging.</p>
        </div>
      </div>
    </section>
  )
}
