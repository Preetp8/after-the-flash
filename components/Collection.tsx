import ImageSlot from './ImageSlot'

const works = [
  { id: 'c1', tone: '6a6157', cls: 'wide w-7', cat: 'Real Estate',   title: 'Hillside Residence', loc: 'Los Angeles, California',   no: '001' },
  { id: 'c2', tone: '2f2a25', cls: 'tall w-5', cat: 'Portraits',     title: 'Portrait No. 12',     loc: 'New York, New York',        no: '002' },
  { id: 'c3', tone: '847a6e', cls: 'tall w-5', cat: 'Events',        title: 'The Vows',            loc: 'Sonoma, California',        no: '003' },
  { id: 'c4', tone: '514a42', cls: 'wide w-7', cat: 'Real Estate',   title: 'Glass House',         loc: 'Palm Springs, California',  no: '004' },
  { id: 'c5', tone: 'a89d8f', cls: 'wide w-6', cat: 'Brand Content', title: 'Atelier Goods',       loc: 'Brooklyn, New York',        no: '005' },
  { id: 'c6', tone: '3a332d', cls: 'wide w-6', cat: 'Events',        title: 'Midnight Set',        loc: 'Marfa, Texas',              no: '006' },
]

export default function Collection() {
  return (
    <section className="band" id="collection">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">I — On View</span>
          <h2 className="display">The Collection</h2>
          <p className="lede">
            Selected works from recent commissions. Each plate is presented as it was made —
            composed, lit, and printed with intent.
          </p>
        </div>

        <div className="gallery">
          {works.map(w => (
            <article key={w.id} className={`work ${w.cls} reveal`}>
              <div className="frame">
                <ImageSlot id={w.id} tone={w.tone} placeholder="Drop work" />
              </div>
              <div className="placard">
                <span className="no">{w.no}</span>
                <span className="meta">
                  <span className="cat">{w.cat}</span>
                  <span className="title">{w.title}</span>
                  <span className="loc">{w.loc}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
