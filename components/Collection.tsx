import Photo from './Photo'

const works = [
  { src: '/photos/bridal/edited/PRT00663.webp',  tone: '8a7060', cls: 'wide w-7', cat: 'Engagement', title: 'Engagement Session',  loc: '', no: '001', pos: '6% 55%',     scale: '100%' },
  { src: '/photos/wedding/edited/PRT06008.webp', tone: '4a4440', cls: 'tall w-5', cat: 'Wedding',     title: 'Under the Veil',      loc: '', no: '002', pos: 'center',     scale: 'cover' },
  { src: '/photos/bridal/edited/PRT00583.webp',  tone: '6a5a4a', cls: 'wide w-7', cat: 'Engagement', title: 'Engagement Editorial',loc: '', no: '003', pos: 'center 40%', scale: 'cover' },
  { src: '/photos/grad/edited/PRT06362.webp',    tone: '7a6858', cls: 'tall w-5', cat: 'Portraits',   title: 'Graduation Portrait', loc: '', no: '004', pos: '80% center',     scale: '115%' },
  { src: '/photos/grad/edited/PRT06291.webp',    tone: '585850', cls: 'wide w-6', cat: 'Portraits',   title: 'Graduation Session',  loc: '', no: '005', pos: 'center', scale: 'cover' },
  { src: '/photos/wedding/edited/PRT05939.webp', tone: '4a3e35', cls: 'tall w-6', cat: 'Wedding',     title: 'Wedding Day',         loc: '', no: '006', pos: 'center', scale: 'cover' },
  { src: '/photos/vraj/edited/DSC06409.webp',    tone: '5a4a40', cls: 'wide w-7', cat: 'Wedding',     title: 'Wedding Reception',   loc: '', no: '007', pos: 'center', scale: 'cover' },
  { src: '/photos/vraj/edited/DSC06417.webp',    tone: '6a5850', cls: 'tall w-5', cat: 'Wedding',     title: 'Wedding Portrait',    loc: '', no: '008', pos: 'center', scale: 'cover' },
]

  export default function Collection() {
  return (
    <section className="band" id="collection">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">I - On View</span>
          <h2 className="display">The Collection</h2>
          <p className="lede">
            Selected works from recent commissions. Each plate is presented as it was made:
            composed, lit, and printed with intent.
          </p>
        </div>

        <div className="gallery">
          {works.map(w => (
            <article key={w.no} className={`work ${w.cls} reveal`}>
              <div className="frame">
                <Photo src={w.src} alt={w.title} tone={w.tone} pos={w.pos} scale={w.scale} />
              </div>
              <div className="placard">
                <span className="no">{w.no}</span>
                <span className="meta">
                  <span className="cat">{w.cat}</span>
                  <span className="title">{w.title}</span>
                  {w.loc && <span className="loc">{w.loc}</span>}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
