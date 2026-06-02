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
              <a href="#artists">The Artists</a>
              <a href="#commission">Inquire</a>
            </div>
            <div className="col">
              <span className="h">Elsewhere</span>
              <a href="#">Instagram</a>
              <a href="#">Behance</a>
              <a href="#">Vimeo</a>
            </div>
            <div className="col">
              <span className="h">Studio</span>
              <a href="mailto:hello@aftertheflash.studio">hello@aftertheflash.studio</a>
              <span>Los Angeles &amp; New York</span>
            </div>
          </div>
        </div>
        <div className="base">
          <span>© 2025 After the Flash</span>
          <span>Every frame, a work of art</span>
        </div>
      </div>
    </footer>
  )
}
