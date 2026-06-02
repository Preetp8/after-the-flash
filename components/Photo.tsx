'use client'

interface PhotoProps {
  src: string
  alt?: string
  tone: string
}

export default function Photo({ src, alt = '', tone }: PhotoProps) {
  return (
    <div className="photo-frame" style={{ backgroundColor: `#${tone}` }}>
      <img
        src={src}
        alt={alt}
        onError={e => { e.currentTarget.style.display = 'none' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
