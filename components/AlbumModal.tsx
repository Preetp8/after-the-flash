'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

  // Hydrate portal target, then trigger fade-in
  useEffect(() => {
    setMounted(true)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Focus close button on open
  useEffect(() => {
    if (mounted) closeRef.current?.focus()
  }, [mounted])

  // ESC key — close lightbox first, then modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null)
        else onClose()
      }
      if (e.key === 'ArrowRight' && lightboxIndex !== null)
        setLightboxIndex(i => (i! + 1) % album.photos.length)
      if (e.key === 'ArrowLeft' && lightboxIndex !== null)
        setLightboxIndex(i => (i! - 1 + album.photos.length) % album.photos.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, lightboxIndex, album.photos.length])

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

  const content = (
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

        {lightboxIndex !== null && (
          <div
            className="album-lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image"
          >
            <button
              className="album-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <button
              className="album-lightbox-nav album-lightbox-prev"
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i! - 1 + album.photos.length) % album.photos.length) }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              className="album-lightbox-img"
              src={album.photos[lightboxIndex]}
              alt={`${album.title} — plate ${lightboxIndex + 1}`}
              onClick={e => e.stopPropagation()}
            />
            {album.virtuallyStaged?.includes(album.photos[lightboxIndex]) && (
              <span className="vs-badge vs-badge--lightbox">Virtually Staged</span>
            )}
            <button
              className="album-lightbox-nav album-lightbox-next"
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i! + 1) % album.photos.length) }}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
