'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const ACCENT_OPTIONS = ['#B26450', '#A8553C', '#C07E68', '#9C5E55']
const WALL_OPTIONS: Array<[string, string]> = [
  ['#F4EFE6', '#ECE4D6'],
  ['#F7F4EC', '#EEE9DC'],
  ['#F1EFE9', '#E7E4DB'],
  ['#EFE8DA', '#E5DCC9'],
]
const FONTS = {
  Bodoni: 'var(--font-bodoni, "Bodoni Moda"), "Times New Roman", serif',
  Caslon: '"Libre Caslon Display", "Times New Roman", serif',
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false)
  const [accent, setAccentState] = useState('#B26450')
  const [wall, setWallState] = useState<[string, string]>(['#F4EFE6', '#ECE4D6'])
  const [headline, setHeadlineState] = useState<'Bodoni' | 'Caslon'>('Bodoni')

  const panelRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef({ x: 16, y: 16 })
  const PAD = 16

  const clampToViewport = useCallback(() => {
    const panel = panelRef.current
    if (!panel) return
    const w = panel.offsetWidth, h = panel.offsetHeight
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD)
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD)
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    }
    panel.style.right = offsetRef.current.x + 'px'
    panel.style.bottom = offsetRef.current.y + 'px'
  }, [])

  useEffect(() => {
    if (!open) return
    clampToViewport()
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(clampToViewport)
      : null
    if (ro) { ro.observe(document.documentElement); return () => ro.disconnect() }
    window.addEventListener('resize', clampToViewport)
    return () => window.removeEventListener('resize', clampToViewport)
  }, [open, clampToViewport])

  useEffect(() => {
    if (headline === 'Caslon' && !document.getElementById('caslon-font')) {
      const l = document.createElement('link')
      l.id = 'caslon-font'
      l.rel = 'stylesheet'
      l.href = 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap'
      document.head.appendChild(l)
    }
    const r = document.documentElement.style
    r.setProperty('--terra', accent)
    r.setProperty('--cream', wall[0])
    r.setProperty('--cream-2', wall[1])
    r.setProperty('--serif', FONTS[headline])
  }, [accent, wall, headline])

  function onDragStart(e: React.MouseEvent) {
    const panel = panelRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    const sx = e.clientX, sy = e.clientY
    const startRight = window.innerWidth - r.right
    const startBottom = window.innerHeight - r.bottom
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  const segIdx = headline === 'Bodoni' ? 0 : 1

  if (!open) {
    return (
      <button className="tweaks-toggle" onClick={() => setOpen(true)} aria-label="Open tweaks panel">
        Tweaks
      </button>
    )
  }

  return (
    <div ref={panelRef} className="twk-panel" style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>Tweaks</b>
        <button className="twk-x" aria-label="Close tweaks" onMouseDown={e => e.stopPropagation()} onClick={() => setOpen(false)}>✕</button>
      </div>
      <div className="twk-body">

        <div className="twk-sect">Accent</div>
        <div className="twk-row">
          <div className="twk-lbl"><span>Terracotta</span></div>
          <div className="twk-chips">
            {ACCENT_OPTIONS.map(c => (
              <button
                key={c} type="button" className="twk-chip"
                data-on={accent === c ? '1' : '0'}
                style={{ background: c }}
                onClick={() => setAccentState(c)}
                aria-label={c}
              />
            ))}
          </div>
        </div>

        <div className="twk-sect">Gallery wall</div>
        <div className="twk-row">
          <div className="twk-lbl"><span>Warmth</span></div>
          <div className="twk-chips">
            {WALL_OPTIONS.map((w, i) => (
              <button
                key={i} type="button" className="twk-chip"
                data-on={wall[0] === w[0] ? '1' : '0'}
                style={{ background: w[0] }}
                onClick={() => setWallState(w)}
              >
                <span><i style={{ background: w[1] }} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="twk-sect">Headline serif</div>
        <div className="twk-row">
          <div className="twk-lbl"><span>Typeface</span></div>
          <div className="twk-seg">
            <div
              className="twk-seg-thumb"
              style={{ left: `calc(2px + ${segIdx} * (100% - 4px) / 2)`, width: 'calc((100% - 4px) / 2)' }}
            />
            {(['Bodoni', 'Caslon'] as const).map(f => (
              <button key={f} type="button" role="radio" aria-checked={headline === f} onClick={() => setHeadlineState(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
