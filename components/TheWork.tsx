const disciplines = [
  {
    no: '01',
    title: 'Real Estate',
    desc: 'Architectural and interior work that renders space as experience — light, proportion, and stillness. Residential and commercial.',
  },
  {
    no: '02',
    title: 'Events',
    desc: 'Unobtrusive documentary coverage. Cultural events, galas, and celebrations — the day as it actually felt.',
  },
  {
    no: '03',
    title: 'Portraits',
    desc: "Graduation portraits and personal sessions for people who'd rather not look posed. Character over polish.",
  },
  {
    no: '04',
    title: 'Brand Content',
    desc: 'Stills and motion for brands with a point of view. Considered, restrained, unmistakably theirs.',
  },
]

export default function TheWork() {
  return (
    <section className="band alt" id="work">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">II — Disciplines</span>
          <h2 className="display">The Work</h2>
          <p className="lede">Four disciplines, one standard. We shoot less, and look longer.</p>
        </div>

        <div className="work-list">
          {disciplines.map(d => (
            <div key={d.no} className="work-row reveal">
              <span className="no">{d.no}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <span className="arrow">Inquire ↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
