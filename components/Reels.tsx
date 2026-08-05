'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { trackEvent } from '@/lib/analytics'

interface Clip {
  no: string
  cat: string
  title: string
  loc: string
  slug: string
  duration: string
}

const clips: Clip[] = [
  {
    no: 'V-001',
    cat: 'Brand / Social',
    title: 'Protein Bowl',
    loc: 'Qdoba - Hoover, AL',
    slug: 'qdoba',
    duration: '0:57',
  },
  {
    no: 'V-002',
    cat: 'Real Estate',
    title: 'Home Walkthrough',
    loc: 'Listing reel for a partner agent',
    slug: 'listing',
    duration: '0:28',
  },
  {
    no: 'V-003',
    cat: 'Studio Notes',
    title: 'Inside a Shoot',
    loc: 'How we film — instructional breakdown',
    slug: 'how-we-film',
    duration: '0:42',
  },
]

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function SoundGlyph({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      {on ? (
        <>
          <path d="M15.6 9.2a4 4 0 0 1 0 5.6" />
          <path d="M18.1 6.6a7.5 7.5 0 0 1 0 10.8" />
        </>
      ) : (
        <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" />
      )}
    </svg>
  )
}

/* ---------------- expanded player ---------------- */

function ClipModal({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="vr-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={clip.title}
    >
      <button className="vr-modal-close" onClick={onClose} aria-label="Close video" type="button">
        <span aria-hidden="true">×</span>
      </button>

      <div className="vr-modal-inner">
        <div className="vr-modal-stage">
          <video
            src={`/reels/${clip.slug}.mp4`}
            poster={`/reels/${clip.slug}.jpg`}
            controls
            autoPlay
            playsInline
            loop
          />
        </div>
        <div className="vr-modal-meta">
          <span className="vr-no">{clip.no}</span>
          <span className="vr-cat">{clip.cat}</span>
          <h3 className="vr-modal-title">{clip.title}</h3>
          <p className="vr-modal-loc">{clip.loc}</p>
          <a href="#commission" className="vr-modal-cta" onClick={onClose}>
            Start a project<span className="ln" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ---------------- phone ---------------- */

function Phone({
  clip,
  index,
  soundOn,
  onSound,
  onExpand,
  paused,
}: {
  clip: Clip
  index: number
  soundOn: boolean
  onSound: (index: number | null) => void
  onExpand: () => void
  paused: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(false)
  const [stillOnly, setStillOnly] = useState(false)

  /* reduced-motion visitors get the poster and an explicit play button */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStillOnly(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* only spend bandwidth and decode cycles on screens the visitor can see */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (inView && !paused && !stillOnly) {
      const play = el.play()
      if (play) play.catch(() => { /* autoplay blocked — poster stays up */ })
    } else {
      el.pause()
    }
  }, [inView, paused, stillOnly])

  useEffect(() => {
    const el = videoRef.current
    if (el) el.muted = !soundOn
  }, [soundOn])

  const onTime = useCallback(() => {
    const el = videoRef.current
    if (!el || !el.duration) return
    setProgress((el.currentTime / el.duration) * 100)
  }, [])

  return (
    <article className="vr-card reveal" style={{ '--i': index } as CSSProperties & Record<'--i', number>}>
      <div className="vr-phone">
        <div className="vr-halo" aria-hidden="true" />

        <div className="vr-shell">
          <span className="vr-key vr-key-silent" aria-hidden="true" />
          <span className="vr-key vr-key-up" aria-hidden="true" />
          <span className="vr-key vr-key-down" aria-hidden="true" />
          <span className="vr-key vr-key-power" aria-hidden="true" />

          <div className="vr-screen">
            <video
              ref={videoRef}
              className="vr-video"
              src={`/reels/${clip.slug}-loop.mp4`}
              poster={`/reels/${clip.slug}.jpg`}
              muted
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={onTime}
              aria-label={`${clip.title} — silent preview`}
            />

            <div className="vr-scrim" aria-hidden="true" />
            <span className="vr-island" aria-hidden="true" />

            <button
              className="vr-open"
              type="button"
              onClick={() => {
                trackEvent('video_play', { video_title: clip.title, video_id: clip.slug })
                onExpand()
              }}
            >
              <span className="vr-open-btn" aria-hidden="true"><PlayGlyph /></span>
              <span className="sr-only">Play {clip.title} full size</span>
            </button>

            <button
              className={`vr-sound${soundOn ? ' on' : ''}`}
              type="button"
              onClick={() => onSound(soundOn ? null : index)}
              aria-pressed={soundOn}
              aria-label={soundOn ? `Mute ${clip.title}` : `Unmute ${clip.title}`}
            >
              <SoundGlyph on={soundOn} />
            </button>

            <span className="vr-runtime">{clip.duration}</span>

            <div className="vr-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="vr-glare" aria-hidden="true" />
        </div>
      </div>

      <div className="placard vr-placard">
        <span className="no">{clip.no}</span>
        <span className="meta">
          <span className="cat">{clip.cat}</span>
          <span className="title">{clip.title}</span>
          <span className="loc">{clip.loc}</span>
        </span>
      </div>
    </article>
  )
}

/* ---------------- section ---------------- */

export default function Reels() {
  const [soundIndex, setSoundIndex] = useState<number | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="band vr" id="vertical">
      <div className="vr-wash" aria-hidden="true" />

      <div className="shell">
        <div className="section-head vr-head reveal">
          <span className="section-index">III — Vertical</span>
          <h2 className="display">Made for the Feed</h2>
          <p className="lede">
            Nine by sixteen, shot that way from the start — not a landscape edit squeezed into a
            phone. Three cuts, three jobs: a brand spot, a listing, and a look at how we film.
          </p>
        </div>

        <div className="vr-rail">
          {clips.map((clip, i) => (
            <Phone
              key={clip.slug}
              clip={clip}
              index={i}
              soundOn={soundIndex === i}
              onSound={setSoundIndex}
              onExpand={() => setOpenIndex(i)}
              paused={openIndex !== null}
            />
          ))}
        </div>

        <div className="vr-foot reveal">
          <p>Filmed, cut, and colored in-house. Delivered ready to post.</p>
          <a href="#commission" className="vr-foot-cta">
            Commission a reel<span className="ln" aria-hidden="true" />
          </a>
        </div>
      </div>

      {openIndex !== null && (
        <ClipModal clip={clips[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  )
}
