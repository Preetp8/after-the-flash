'use client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [solid, setSolid] = useState(false)

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

  return (
    <header className={`nav${solid ? ' solid' : ''}`} id="nav">
      <a href="#top" className="brand">
        <span className="dot" />
        After the Flash
      </a>
      <nav className="nav-links">
        <a href="#collection">The Collection</a>
        <a href="#work">The Work</a>
        <a href="#artists">The Artists</a>
        <a href="#commission" className="inquire">Inquire</a>
      </nav>
    </header>
  )
}
