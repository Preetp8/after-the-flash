'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

type Props = { src: string; alt: string; caption: string }

export default function RealtorLightboxImage({ src, alt, caption }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <figure className="rl-diff-figure reveal">
      <button
        className="rl-diff-btn"
        onClick={() => setOpen(true)}
        aria-label={`View ${alt} fullscreen`}
      >
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </button>
      <figcaption>{caption}</figcaption>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
        plugins={[Zoom]}
        animation={{ fade: 320 }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ container: { backgroundColor: 'rgba(8, 7, 5, 0.95)' } }}
      />
    </figure>
  )
}
