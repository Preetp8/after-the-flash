import Photo from './Photo'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Photo src="/images/hero.jpg" alt="Hero" tone="211e19" />
      <div className="tint" />
      <div className="frame-inset" />
      <div className="scroll-cue">Scroll</div>
      <div className="hero-content">
        <div className="hero-mark" aria-hidden="true">
          <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(20, 0)">
              <circle cx="60" cy="60" r="55" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
              <path d="M 60 15 Q 48 38 60 50 Q 72 38 60 15 Z" fill="white" opacity="0.7" />
              <path d="M 105 60 Q 82 48 70 60 Q 82 72 105 60 Z" fill="white" opacity="0.65" />
              <path d="M 60 105 Q 72 82 60 70 Q 48 82 60 105 Z" fill="white" opacity="0.5" />
              <path d="M 15 60 Q 38 72 50 60 Q 38 48 15 60 Z" fill="white" opacity="0.55" />
              <circle cx="60" cy="60" r="25" fill="none" stroke="white" strokeWidth="0.5" opacity="0.18" />
              <circle cx="60" cy="60" r="8" fill="white" opacity="0.85" />
            </g>
          </svg>
        </div>
        <p className="eyebrow">After the Flash — Photography &amp; Film</p>
        <h1>
          After the <span className="accent">Flash</span>
        </h1>
        <div className="hero-foot">
          <p>A photography and film studio based in Alabama, serving the Southeast. Every commission treated as a piece worth hanging.</p>
          <span className="plate-label">Pl. 01 — Cinematic still</span>
        </div>
      </div>
    </section>
  )
}
