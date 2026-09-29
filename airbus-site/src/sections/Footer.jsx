import { links } from './Nav.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-line">Independent fan site. Not affiliated with Airbus SE.</p>
          <p className="copy">&copy; {new Date().getFullYear()} Airbus Explorer</p>
        </div>
        <nav aria-label="Footer">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
