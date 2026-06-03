'use client'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero') as HTMLElement | null
    function onScroll() {
      const trigger = hero ? hero.offsetHeight - 90 : 480
      setSolid(window.scrollY > trigger)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const links = [
    { href: '#collection', label: 'The Collection' },
    { href: '#enhancement', label: 'Before / After' },
    { href: '#work', label: 'The Work' },
    { href: '#gear', label: 'The Gear' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#commission', label: 'Inquire', className: 'inquire' },
  ]

  function closeMenu() {
    setOpen(false)
  }

  return (
    <>
      <header className={`nav${solid ? ' solid' : ''}${open ? ' open' : ''}`} id="nav">
        <a href="#top" className="brand" aria-label="After the Flash" onClick={closeMenu}>
          <svg
            viewBox="0 0 500 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <g transform="translate(20, 0)">
              <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="4px" opacity="0.5" />
              <path d="M 60 15 Q 48 38 60 50 Q 72 38 60 15 Z" fill="currentColor" />
              <path d="M 105 60 Q 82 48 70 60 Q 82 72 105 60 Z" fill="currentColor" opacity="0.9" />
              <path d="M 60 105 Q 72 82 60 70 Q 48 82 60 105 Z" fill="currentColor" opacity="0.8" />
              <path d="M 15 60 Q 38 72 50 60 Q 38 48 15 60 Z" fill="currentColor" opacity="0.85" />
              <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              <circle cx="60" cy="60" r="8" fill="currentColor" />
            </g>
            <text
              x="150"
              y="68"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="32"
              fontWeight="300"
              letterSpacing="0"
              fill="currentColor"
            >
               after the flash
            </text>
          </svg>
        </a>
        <nav className="nav-links">
          {links.filter(link => link.href !== '#enhancement').map(link => (
            <a href={link.href} className={link.className} key={link.href}>{link.label}</a>
          ))}
        </nav>
        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle"
          onClick={() => setOpen(current => !current)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>
      <nav aria-label="Mobile navigation" className={`mobile-menu${open ? ' open' : ''}`} id="mobile-menu">
        <button
          aria-label="Close navigation menu"
          className="mobile-menu-close"
          onClick={closeMenu}
          type="button"
        >
          <span />
          <span />
        </button>
        <div className="mobile-menu-inner">
          {links.map((link, index) => (
            <a
              href={link.href}
              className={link.className}
              key={link.href}
              onClick={closeMenu}
              style={{ '--i': index } as CSSProperties & Record<'--i', number>}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
