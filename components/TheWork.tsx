const disciplines = [
  {
    no: '01',
    title: 'Real Estate',
    desc: 'Architectural and interior work that renders space as experience — light, proportion, and stillness.',
  },
  {
    no: '02',
    title: 'Events',
    desc: 'Unobtrusive documentary coverage. The day as it actually felt, kept rather than staged.',
  },
  {
    no: '03',
    title: 'Portraits',
    desc: 'Editorial portraiture for people who would rather not look posed. Character over polish.',
  },
  {
    no: '04',
    title: 'Brand Content',
    desc: 'Stills and motion for brands with a point of view — considered, restrained, unmistakably theirs.',
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
