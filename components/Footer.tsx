'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { trackEvent('scroll_depth_bottom'); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <div className="shell">
        <div className="top">
          <div className="mark">
            After<br />the <span className="accent">Flash</span>
          </div>
          <div className="cols">
            <div className="col">
              <span className="h">Index</span>
              <a href="#collection">The Collection</a>
              <a href="#work">The Work</a>
              <a href="#gear">The Gear</a>
              <a href="#pricing">Pricing</a>
              <a href="#commission">Inquire</a>
            </div>
            <div className="col">
              <span className="h">Elsewhere</span>
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/aftertheflashmedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon"
                  onClick={() => trackEvent('social_click', { platform: 'instagram' })}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590688465463"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-icon"
                  onClick={() => trackEvent('social_click', { platform: 'facebook' })}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col">
              <span className="h">Team</span>
              <a href="mailto:aftertheflashmedia@gmail.com" onClick={() => trackEvent('email_click', { source: 'footer' })}>aftertheflashmedia@gmail.com</a>
              <span>Alabama &amp; the Southeast</span>
            </div>
          </div>
        </div>
        <div className="base">
          <span>(c) 2026 After the Flash</span>
          <span>Every frame, a work of art</span>
        </div>
      </div>
    </footer>
  )
}
