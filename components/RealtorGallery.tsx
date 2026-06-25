'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

type WorkItem = { src: string; cap: string }

export default function RealtorGallery({ work }: { work: WorkItem[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const slides = work.map(item => ({ src: item.src }))

  return (
    <>
      <div className="rl-work-grid">
        {work.map((item, i) => (
          <figure className="rl-work-item reveal" key={item.src}>
            <button
              className="rl-work-btn"
              onClick={() => setIndex(i)}
              aria-label={`View ${item.cap} fullscreen`}
            >
              <div className="rl-work-frame">
                <img src={item.src} alt={item.cap} loading="lazy" decoding="async" />
              </div>
            </button>
            <figcaption className="rl-work-cap">{item.cap}</figcaption>
          </figure>
        ))}
      </div>

      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index ?? 0}
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
        styles={{
          container: { backgroundColor: 'rgba(8, 7, 5, 0.95)' },
          thumbnailsContainer: { backgroundColor: 'rgba(8, 7, 5, 0.95)' },
          thumbnail: { border: '1px solid rgba(255,255,255,0.12)' },
        }}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  )
}
