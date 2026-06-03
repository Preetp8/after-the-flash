import type { CSSProperties } from 'react'

interface PhotoProps {
  src: string
  alt?: string
  tone: string
  pos?: string
  scale?: string
  mobilePos?: string
  mobileScale?: string
}

export default function Photo({ src, alt = '', tone, pos, scale, mobilePos, mobileScale }: PhotoProps) {
  return (
    <div
      aria-label={alt || undefined}
      className="photo-frame"
      role={alt ? 'img' : undefined}
      style={{
        backgroundColor: `#${tone}`,
        backgroundImage: `url(${src})`,
        '--photo-pos': pos || 'center',
        '--photo-size': scale || 'cover',
        '--photo-mobile-pos': mobilePos || pos || 'center',
        '--photo-mobile-size': mobileScale || scale || 'cover',
      } as CSSProperties & Record<string, string>}
    />
  )
}
