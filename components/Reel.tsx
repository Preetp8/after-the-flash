'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ReelItem {
  no: string
  cat: string
  title: string
  loc: string
  youtubeId: string
  duration: string
}

const videos: ReelItem[] = [
  {
    no: 'R-000',
    cat: 'Real Estate',
    title: "Vulcan's Knee",
    loc: '',
    youtubeId: 'B478-HxW2so',
    duration: '0:50',
  },
  {
    no: 'R-001',
    cat: 'Real Estate',
    title: 'Cinematic Real Estate',
    loc: '',
    youtubeId: '1_xw16jiioI',
    duration: '0:30',
  },
  {
    no: 'R-002',
    cat: 'Real Estate',
    title: 'Real Estate Edit',
    loc: '',
    youtubeId: 'LUIB__JuRd4',
    duration: '0:20',
  },
]

function VideoModal({ item, onClose }: { item: ReelItem; onClose: () => void }) {
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
      className="reel-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="reel-modal-panel">
        <div className="reel-modal-header">
          <div>
            <span className="album-modal-cat">{item.cat}</span>
            <h2 className="album-modal-title">{item.title}</h2>
            {item.loc && <p className="reel-modal-loc">{item.loc}</p>}
          </div>
          <button
            className="album-modal-close"
            onClick={onClose}
            aria-label="Close video"
          >
            ×
          </button>
        </div>
        <div className="reel-embed-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function ReelCard({ item }: { item: ReelItem }) {
  const [open, setOpen] = useState(false)
  const thumb = `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`

  return (
    <article className="reel-card reveal">
      <button
        className="reel-thumb-btn"
        onClick={() => setOpen(true)}
        aria-label={`Play ${item.title}`}
      >
        <div className="frame reel-frame">
          <div className="reel-thumb" style={{ backgroundImage: `url(${thumb})` }}>
            <span className="reel-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="reel-duration">{item.duration}</span>
          </div>
        </div>
      </button>

      <div className="placard">
        <span className="no">{item.no}</span>
        <span className="meta">
          <span className="cat">{item.cat}</span>
          <span className="title">{item.title}</span>
          {item.loc && <span className="loc">{item.loc}</span>}
        </span>
      </div>

      {open && <VideoModal item={item} onClose={() => setOpen(false)} />}
    </article>
  )
}

export default function Reel() {
  return (
    <section className="band" id="reel">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">III — Film</span>
          <h2 className="display">The Film</h2>
          <p className="lede">
            Real estate in motion. Space, light, and sequence — the property as it feels to walk through.
          </p>
        </div>

        <div className="reel-grid">
          {videos.map(v => <ReelCard key={v.no} item={v} />)}
        </div>
      </div>
    </section>
  )
}
