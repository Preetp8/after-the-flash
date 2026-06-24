'use client'

import { useState, type CSSProperties } from 'react'
import AlbumModal from './AlbumModal'
import type { Album } from '@/lib/albums'
import { trackEvent } from '@/lib/analytics'

interface AlbumCardProps {
  album: Album
  index?: number
}

export default function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  const [open, setOpen] = useState(false)
  const { cat, title, thumbnail } = album

  return (
    <>
      <article
        className="tile"
        style={{ '--i': index } as CSSProperties}
      >
        <button
          className="tile-btn"
          onClick={() => { trackEvent('album_open', { album_title: title, album_category: cat }); setOpen(true) }}
          aria-label={`Open ${title} album`}
        >
          <div className="tile-stack">
            <div className="tile-ghost tile-ghost-2" aria-hidden="true" />
            <div className="tile-ghost tile-ghost-1" aria-hidden="true" />
            <div className="tile-img">
              <img
                src={thumbnail.src}
                alt={title}
                style={{ objectPosition: thumbnail.pos || 'center' }}
              />
            </div>
          </div>
        </button>
        <div className="tile-cap">
          <span className="tile-cat">{cat}</span>
          <span className="tile-title">{title}</span>
        </div>
      </article>

      {open && <AlbumModal album={album} onClose={() => setOpen(false)} />}
    </>
  )
}
