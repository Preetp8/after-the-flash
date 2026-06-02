import Photo from './Photo'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Photo src="/images/hero.jpg" alt="Hero" tone="211e19" />
      <div className="tint" />
      <div className="frame-inset" />
      <div className="scroll-cue">Scroll</div>
      <div className="hero-content">
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
