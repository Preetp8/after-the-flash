export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="top">
          <div className="mark">
            After<br />the <span className="accent">Flash</span>
          </div>
          <div className="cols">
            <div className="col">
              <span className="h">Index</span>
              <a href="#collection">The Collection</a>
              <a href="#work">The Work</a>
              <a href="#gear">The Gear</a>
              <a href="#pricing">Pricing</a>
              <a href="#commission">Inquire</a>
            </div>
            <div className="col">
              <span className="h">Elsewhere</span>
              <a href="#">Instagram</a>
              <a href="#">Behance</a>
              <a href="#">Vimeo</a>
            </div>
            <div className="col">
              <span className="h">Team</span>
              <a href="mailto:aftertheflashmedia@gmail.com">aftertheflashmedia@gmail.com</a>
              <span>Alabama &amp; the Southeast</span>
            </div>
          </div>
        </div>
        <div className="base">
          <span>(c) 2026 After the Flash</span>
          <span>Every frame, a work of art</span>
        </div>
      </div>
    </footer>
  )
}
