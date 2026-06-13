'use client'

import { useEffect, useRef, useState } from 'react'
import { albums } from '@/lib/albums'
import AlbumCard from './AlbumCard'

// Portrait/landscape alternation per row creates natural visual rhythm
const DISPLAY_ORDER = [
  'engagement',  'vulcans-knee',
  'wedding',     'graduation',
  'location-1',  'reception',
]

const visible = albums.filter(a => !a.hidden)
const CATEGORIES = ['All', ...Array.from(new Set(visible.map(a => a.cat)))]

export default function Collection() {
  const [filter, setFilter] = useState('All')
  const [filterKey, setFilterKey] = useState(0)
  const [inView, setInView] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function handleFilter(cat: string) {
    if (cat === filter) return
    setFilter(cat)
    setFilterKey(k => k + 1)
  }

  const bySlug = Object.fromEntries(visible.map(a => [a.slug, a]))
  const displayed = filter === 'All'
    ? DISPLAY_ORDER.map(s => bySlug[s]).filter(Boolean)
    : visible.filter(a => a.cat === filter)

  return (
    <section className="band" id="collection">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">I - On View</span>
          <h2 className="display">The Collection</h2>
          <p className="lede">
            Selected works from recent commissions. Each plate is presented as it was made:
            composed, lit, and printed with intent.
          </p>
        </div>

        <div className="collection-filters reveal">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${cat === filter ? ' active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className={`collection-grid${inView ? ' in' : ''}`}>
          <div key={filterKey} className="collection-grid-inner">
            {displayed.map((album, i) => (
              <AlbumCard key={album.slug} album={album} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
