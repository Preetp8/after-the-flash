'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import type { Album } from '@/lib/albums'

interface AlbumModalProps {
  album: Album
  onClose: () => void
}

export default function AlbumModal({ album, onClose }: AlbumModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (mounted) closeRef.current?.focus()
  }, [mounted])

  // ESC closes modal (lightbox handles its own ESC internally)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, lightboxIndex])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Focus trap
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    panel.addEventListener('keydown', trap)
    return () => panel.removeEventListener('keydown', trap)
  }, [mounted])

  if (!mounted) return null

  const slides = album.photos.map(src => ({ src }))

  const content = (
    <>
      <div
        className={`album-modal-overlay${visible ? ' open' : ''}`}
        onClick={onClose}
      >
        <div
          className="album-modal-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={album.title}
          onClick={e => e.stopPropagation()}
        >
          <div className="album-modal-header">
            <div>
              <span className="album-modal-cat">{album.cat}</span>
              <h3 className="album-modal-title">{album.title}</h3>
              <span className="album-modal-count">{album.count} frames</span>
            </div>
            <button
              ref={closeRef}
              className="album-modal-close"
              onClick={onClose}
              aria-label="Close album"
            >
              ×
            </button>
          </div>

          <div className="album-modal-grid">
            {album.photos.map((src, i) => {
              const isVS = album.virtuallyStaged?.includes(src)
              return (
                <button
                  key={i}
                  className="album-modal-photo"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${album.title} — plate ${i + 1} fullscreen`}
                >
                  <img
                    src={src}
                    alt={`${album.title} — plate ${i + 1}`}
                    loading="lazy"
                  />
                  {isVS && <span className="vs-badge">Virtually Staged</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* YARL lightbox — renders above everything */}
      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        animation={{ fade: 320, swipe: 380 }}
        controller={{ closeOnBackdropClick: true }}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 56,
          gap: 10,
          padding: 4,
          border: 0,
          borderRadius: 0,
          imageFit: 'cover',
        }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        render={{
          slideFooter: ({ slide }) => {
            const src = (slide as { src: string }).src
            if (album.virtuallyStaged?.includes(src)) {
              return <span className="vs-badge vs-badge--lightbox">Virtually Staged</span>
            }
            return null
          },
        }}
        styles={{
          container: { backgroundColor: 'rgba(8, 7, 5, 0.95)' },
          thumbnailsContainer: { backgroundColor: 'rgba(8, 7, 5, 0.95)' },
          thumbnail: { border: '1px solid rgba(255,255,255,0.12)' },
        }}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </>
  )

  return createPortal(content, document.body)
}
