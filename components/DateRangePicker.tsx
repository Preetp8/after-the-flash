'use client'

import { useState, useRef, useEffect } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'

interface DateRangePickerProps {
  onRangeChange: (from: string, to: string) => void
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [])

  function handleSelect(r: DateRange | undefined) {
    setRange(r)
    const from = r?.from ? r.from.toISOString().split('T')[0] : ''
    const to = r?.to ? r.to.toISOString().split('T')[0] : ''
    onRangeChange(from, to)
    if (r?.from && r?.to && r.to > r.from) setOpen(false)
  }

  const label = range?.from
    ? range.to
      ? `${fmt(range.from)} — ${fmt(range.to)}`
      : fmt(range.from)
    : null

  return (
    <div className="drp-wrap" ref={ref}>
      <button
        type="button"
        className={`drp-trigger${open ? ' open' : ''}${label ? ' has-value' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span>{label ?? 'Select a date or range'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {label && (
        <button
          type="button"
          className="drp-clear"
          aria-label="Clear dates"
          onClick={() => { setRange(undefined); onRangeChange('', '') }}
        >
          ×
        </button>
      )}

      {open && (
        <>
          <div className="drp-backdrop" onClick={() => setOpen(false)} />
          <div className="drp-popover">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              disabled={{ before: new Date() }}
              numberOfMonths={typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2}
              fixedWeeks
            />
            <div className="drp-sheet-footer">
              <button
                type="button"
                className="drp-sheet-reset"
                onClick={() => { setRange(undefined); onRangeChange('', '') }}
              >
                Reset
              </button>
              <button
                type="button"
                className="drp-sheet-done"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
