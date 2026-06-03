import Photo from './Photo'

const artists = [
  { src: '/images/artist-01.jpg', tone: '48413a', name: 'Mara Vance', role: 'Founder / Director',     bio: 'Builds the frame before anyone picks up a camera.' },
  { src: '/images/artist-02.jpg', tone: '6a6157', name: 'Eli Soto',   role: 'Principal Photographer', bio: 'Fifteen years chasing the right light, rarely the easy one.' },
  { src: '/images/artist-03.jpg', tone: '847a6e', name: 'June Park',  role: 'Cinematographer',         bio: "Thinks in motion; cuts everything that isn't necessary." },
  { src: '/images/artist-04.jpg', tone: '2f2a25', name: 'Theo Walsh', role: 'Architectural Lead',      bio: 'Reads buildings the way others read rooms.' },
  { src: '/images/artist-05.jpg', tone: 'a89d8f', name: 'Inés Caro',  role: 'Portrait Director',       bio: 'Gets the guard down before the shutter ever moves.' },
  { src: '/images/artist-06.jpg', tone: '514a42', name: 'Sam Reyes',  role: 'Brand & Motion',          bio: "Translates a brand into a look you can't quite name." },
]

export default function Artists() {
  return (
    <section className="band" id="artists">
      <div className="shell">
        <div className="section-head reveal">
          <span className="section-index">III — The Team</span>
          <h2 className="display">The Artists</h2>
          <p className="lede">Six makers behind the work. A small team, kept that way on purpose.</p>
        </div>

        <div className="artists">
          {artists.map(a => (
            <article key={a.src} className="artist reveal">
              <div className="frame">
                <Photo src={a.src} alt={a.name} tone={a.tone} />
              </div>
              <div className="who">
                <span className="name">{a.name}</span>
                <span className="role">{a.role}</span>
                <p className="bio">{a.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
