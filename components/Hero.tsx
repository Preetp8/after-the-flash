'use client'

import { useState, useEffect } from 'react'
import Photo from './Photo'

type Slide = {
  src: string
  pos: string
  scale: string
  mobilePos?: string
  mobileScale?: string
  hideOnMobile?: boolean
}

const slides: Slide[] = [
  { src: '/photos/realestate/Vulcans%20Knee/AV101272-HDR.webp',               pos: 'center 85%', scale: 'cover', mobilePos: '50% 65%' },
  { src: '/photos/wedding/edited/PRT06167.webp',                              pos: 'center 35%', scale: 'cover', mobilePos: '54% center' },
  { src: '/photos/realestate/location%201/virtuallystaged2.webp',             pos: 'center',     scale: 'cover', mobilePos: '50% center' },
  { src: '/photos/vraj/edited/DSC06414.webp',                                 pos: 'center',     scale: 'cover', hideOnMobile: true },
  { src: '/photos/realestate/location%201/virtuallystaged.webp',              pos: 'center',     scale: 'cover', mobilePos: '50% center' },
  { src: '/photos/bridal/edited/PRT00794.webp',                               pos: 'center',     scale: 'cover', mobilePos: '50% center' },
  { src: '/photos/vraj/edited/DSC06421.webp',                                 pos: 'center',     scale: 'cover', mobilePos: '58% center' },
  { src: '/photos/realestate/Vulcans%20Knee/AV101325-HDR.webp',               pos: 'center',     scale: 'cover', mobilePos: '50% center' },
  { src: '/photos/realestate/Vulcans%20Knee/AV101371-HDR.webp',               pos: 'center',     scale: 'cover', mobilePos: '50% center' },
]

const INTERVAL = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const activeSlides = slides.filter(slide => !isMobile || !slide.hideOnMobile)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % activeSlides.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [activeSlides.length])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 560px)')

    function onChange() {
      setIsMobile(media.matches)
      setCurrent(0)
    }

    onChange()
    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <section className="hero" id="top">
      {activeSlides.map((slide, i) => (
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
          <Photo
            src={slide.src}
            alt=""
            tone="211e19"
            pos={slide.pos}
            scale={slide.scale}
            mobilePos={slide.mobilePos}
            mobileScale={slide.mobileScale}
          />
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
