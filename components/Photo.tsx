interface PhotoProps {
  src: string
  alt?: string
  tone: string
  pos?: string
  scale?: string
}

export default function Photo({ src, alt = '', tone, pos, scale }: PhotoProps) {
  return (
    <div
      aria-label={alt || undefined}
      className="photo-frame"
      role={alt ? 'img' : undefined}
      style={{
        backgroundColor: `#${tone}`,
        backgroundImage: `url(${src})`,
        ...(pos   ? { backgroundPosition: pos }  : {}),
        ...(scale ? { backgroundSize:     scale } : {}),
      }}
    />
  )
}
