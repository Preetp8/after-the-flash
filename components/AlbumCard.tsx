'use client'

import { useState } from 'react'
import Photo from './Photo'
import AlbumModal from './AlbumModal'
import type { Album } from '@/lib/albums'

interface AlbumCardProps {
  album: Album
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const [open, setOpen] = useState(false)
  const { no, cat, title, thumbnail, cls, count } = album

  return (
    <article className={`work ${cls} reveal`}>
      <button
        className="album-stack"
        onClick={() => setOpen(true)}
        aria-label={`Open ${title} album`}
      >
        <div className="frame album-ghost ghost-2" aria-hidden="true" />
        <div className="frame album-ghost ghost-1" aria-hidden="true" />
        <div className="frame album-main">
          <Photo
            src={thumbnail.src}
            alt={title}
            tone={thumbnail.tone}
            pos={thumbnail.pos}
            scale={thumbnail.scale}
          />
        </div>
        <span className="album-count" aria-hidden="true">
          {count} {count === 1 ? 'picture' : 'pictures'}
        </span>
      </button>

      <div className="placard">
        <span className="no">{no}</span>
        <span className="meta">
          <span className="cat">{cat}</span>
          <span className="title">{title}</span>
        </span>
      </div>

      {open && <AlbumModal album={album} onClose={() => setOpen(false)} />}
    </article>
  )
}
