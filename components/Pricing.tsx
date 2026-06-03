const packages = [
  {
    no: '01',
    name: 'Portraits',
    price: '$200+',
    desc: 'Graduation, editorial, and personal sessions with polished selects for web and print.',
  },
  {
    no: '02',
    name: 'Real Estate',
    price: '$350+',
    desc: 'Interior, exterior, and walkthrough coverage for residential and commercial spaces.',
  },
  {
    no: '03',
    name: 'Events',
    price: '$750+',
    desc: 'Documentary coverage for celebrations, galas, launches, and cultural moments.',
  },
  {
    no: '04',
    name: 'Brand Content',
    price: '$400+',
    desc: 'Campaign stills and motion assets built around a clear visual direction.',
  },
]

export default function Pricing() {
  return (
    <section className="band pricing-section" id="pricing">
      <div className="shell">
        <div className="section-head pricing-head reveal">
          <span className="section-index">IV - Starting Points</span>
          <h2 className="display">Pricing</h2>
          <p className="lede">
            Every commission is scoped around usage, schedule, travel, and deliverables.
            These ranges give you a clear place to start before we shape the final quote.
          </p>
        </div>

        <div className="pricing-grid">
          {packages.map(pkg => (
            <article className="pricing-card reveal" key={pkg.no}>
              <div className="pricing-top">
                <span className="no">{pkg.no}</span>
                <span className="price">Starting at {pkg.price}</span>
              </div>
              <h3>{pkg.name}</h3>
              <p>{pkg.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
