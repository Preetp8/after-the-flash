interface PhotoProps {
  src: string
  alt?: string
  tone: string
}

export default function Photo({ src, alt = '', tone }: PhotoProps) {
  return (
    <div
      aria-label={alt || undefined}
      className="photo-frame"
      role={alt ? 'img' : undefined}
      style={{ backgroundColor: `#${tone}`, backgroundImage: `url(${src})` }}
    />
  )
}
