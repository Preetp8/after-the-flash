'use client'
import { useState, useRef } from 'react'

interface ImageSlotProps {
  id: string
  tone?: string
  fit?: 'cover' | 'contain' | 'fill'
  placeholder?: string
  style?: React.CSSProperties
  className?: string
}

export default function ImageSlot({
  id,
  tone,
  fit = 'cover',
  placeholder = 'Drop an image',
  style,
  className,
}: ImageSlotProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const bgStyle = !src && tone ? { backgroundColor: `#${tone}` } : {}

  function loadFile(file: File) {
    if (file.type.startsWith('image/')) {
      setSrc(URL.createObjectURL(file))
    }
  }

  return (
    <div
      id={id}
      className={`image-slot${dragging ? ' dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...bgStyle, ...style }}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
      onClick={() => !src && inputRef.current?.click()}
      title={!src ? 'Click or drag to add image' : undefined}
    >
      {src ? (
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
      ) : (
        <span className="image-slot-label">{placeholder}</span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f) }}
      />
    </div>
  )
}
