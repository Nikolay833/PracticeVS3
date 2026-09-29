export const links = [
  { href: '#aircraft', label: 'Aircraft' },
  { href: '#history', label: 'History' },
  { href: '#future', label: 'Future' },
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="wordmark" href="#top">Airbus Explorer</a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
