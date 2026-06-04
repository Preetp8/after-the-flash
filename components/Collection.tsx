import { albums } from '@/lib/albums'
import AlbumCard from './AlbumCard'

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
          {albums.filter(a => !a.hidden).map(album => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>
      </div>
    </section>
  )
}
