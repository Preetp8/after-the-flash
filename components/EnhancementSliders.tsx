'use client'

import { useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'

const examples = [
  {
    id: 'ceremony-color',
    no: '01',
    title: 'Ceremony Color',
    location: 'Wedding coverage',
    rawSrc: '/photos/wedding/raw/PRT06006.webp',
    editedSrc: '/photos/wedding/edited/PRT06006.webp',
    position: 'center 42%',
  },
  {
    id: 'portrait-tone',
    no: '02',
    title: 'Portrait Tone',
    location: 'Graduation session',
    rawSrc: '/photos/grad/raw/PRT06501.webp',
    editedSrc: '/photos/grad/edited/PRT06501.webp',
    position: 'center',
  },
  {
    id: 'reception-light',
    no: '03',
    title: 'Reception Light',
    location: 'Event portrait',
    rawSrc: '/photos/vraj/raw/DSC06422.webp',
    editedSrc: '/photos/vraj/edited/DSC06422.webp',
    position: 'center',
  },
]

export default function EnhancementSliders() {
  const [values, setValues] = useState<Record<string, number>>({
    'ceremony-color': 58,
    'portrait-tone': 54,
    'reception-light': 60,
  })
  const [activeId, setActiveId] = useState<string | null>(null)

  function updateSplit(id: string, clientX: number, element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const next = Math.round(((clientX - rect.left) / rect.width) * 100)
    const clamped = Math.min(100, Math.max(0, next))

    setValues(current => ({
      ...current,
      [id]: clamped,
    }))
  }

  function startDrag(id: string, event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setActiveId(id)
    updateSplit(id, event.clientX, event.currentTarget)
  }

  function moveDrag(id: string, event: PointerEvent<HTMLDivElement>) {
    if (activeId === id) {
      updateSplit(id, event.clientX, event.currentTarget)
    }
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId)
    setActiveId(null)
  }

  return (
    <section className="band enhancement-section" id="enhancement">
      <div className="shell">
        <div className="section-head enhancement-head reveal">
          <span className="section-index">II - Image Finish</span>
          <h2 className="display">Before / After</h2>
          <p className="lede">
            Strong photographs start in camera, then get refined in post:
            cleaner color, better contrast, intentional warmth, and a finished
            image that feels ready to deliver, publish, or print.
          </p>
        </div>

        <div className="enhancement-grid">
          {examples.map(example => {
            const value = values[example.id]

            return (
              <article className="enhancement-card reveal" key={example.id}>
                <div
                  className="comparison-frame"
                  onPointerCancel={stopDrag}
                  onPointerDown={event => startDrag(example.id, event)}
                  onPointerMove={event => moveDrag(example.id, event)}
                  onPointerUp={stopDrag}
                  style={{ '--split': `${value}%` } as CSSProperties & Record<'--split', string>}
                >
                  <div
                    className="comparison-layer comparison-raw"
                    style={{
                      backgroundImage: `url(${example.rawSrc})`,
                      backgroundPosition: example.position,
                    }}
                  />
                  <div
                    className="comparison-layer comparison-edit"
                    style={{
                      backgroundImage: `url(${example.editedSrc})`,
                      backgroundPosition: example.position,
                    }}
                  />
                  <div className="comparison-handle" aria-hidden="true">
                    <span />
                  </div>
                  <div className="comparison-tags" aria-hidden="true">
                    <span>Raw</span>
                    <span>Edited</span>
                  </div>
                </div>

                <div className="comparison-control">
                  <input
                    aria-label={`${example.title} edit reveal`}
                    max="100"
                    min="0"
                    onChange={event => setValues(current => ({
                      ...current,
                      [example.id]: Number(event.target.value),
                    }))}
                    type="range"
                    value={value}
                  />
                </div>

                <div className="comparison-meta">
                  <span className="no">{example.no}</span>
                  <div>
                    <h3>{example.title}</h3>
                    <p>{example.location}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
