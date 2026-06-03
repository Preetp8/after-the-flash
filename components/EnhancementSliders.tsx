'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

const examples = [
  {
    id: 'living-room',
    no: '01',
    title: 'Interior Light',
    location: 'Living room study',
    src: '/images/enhancement-living-room.png',
  },
  {
    id: 'exterior',
    no: '02',
    title: 'Exterior Tone',
    location: 'Front elevation',
    src: '/images/enhancement-exterior.png',
  },
  {
    id: 'kitchen',
    no: '03',
    title: 'Kitchen Finish',
    location: 'Staged kitchen',
    src: '/images/enhancement-kitchen.png',
  },
]

export default function EnhancementSliders() {
  const [values, setValues] = useState<Record<string, number>>({
    'living-room': 58,
    exterior: 52,
    kitchen: 62,
  })

  return (
    <section className="band enhancement-section" id="enhancement">
      <div className="shell">
        <div className="section-head enhancement-head reveal">
          <span className="section-index">II - Image Finish</span>
          <h2 className="display">Before / After</h2>
          <p className="lede">
            Real estate photography starts in camera, then gets refined in post:
            cleaner color, better contrast, straighter lines, and a finished image
            that feels ready to list, publish, or present.
          </p>
        </div>

        <div className="enhancement-grid">
          {examples.map(example => {
            const value = values[example.id]

            return (
              <article className="enhancement-card reveal" key={example.id}>
                <div
                  className="comparison-frame"
                  style={{ '--split': `${value}%` } as CSSProperties & Record<'--split', string>}
                >
                  <div className="comparison-layer comparison-raw" style={{ backgroundImage: `url(${example.src})` }} />
                  <div className="comparison-layer comparison-edit" style={{ backgroundImage: `url(${example.src})` }} />
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
