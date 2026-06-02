import ImageSlot from './ImageSlot'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <ImageSlot id="hero-plate" tone="211e19" fit="cover" placeholder="Drop the cinematic hero frame" />
      <div className="tint" />
      <div className="frame-inset" />
      <div className="scroll-cue">Scroll</div>
      <div className="hero-content">
        <p className="eyebrow">After the Flash — Photography &amp; Film</p>
        <h1>
          Every Frame.<br />
          A Work of <span className="accent">Art.</span>
        </h1>
        <div className="hero-foot">
          <p>A photography and film studio that treats every commission as a piece worth hanging.</p>
          <span className="plate-label">Pl. 01 — Cinematic still</span>
        </div>
      </div>
    </section>
  )
}
