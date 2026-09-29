import { Link } from 'react-router-dom';

const ITEMS = [
  { tag: 'CHAMPION', text: 'Norris runs #1 after taking the 2025 title by two points', to: '/drivers/norris' },
  { tag: 'NEW TEAM', text: 'Cadillac becomes the 11th team, with Pérez and Bottas', to: '/teams/cadillac' },
  { tag: 'WORKS', text: 'Audi takes over Sauber as a full works entry', to: '/teams/audi' },
  { tag: 'NEW TRACK', text: 'Madring hosts the Spanish GP in Madrid', to: '/circuits/madring' },
  { tag: 'ENGINES', text: 'Red Bull builds its own power unit with Ford', to: '/teams/red-bull' },
  { tag: 'ROOKIE', text: 'Arvid Lindblad is the only full-time rookie', to: '/drivers/lindblad' },
  { tag: 'FAREWELL', text: 'Zandvoort hosts its final Dutch GP for now', to: '/circuits/zandvoort' },
];

export default function Ticker() {
  // Rendered twice so the CSS loop is seamless; the copy is hidden from assistive tech.
  const row = (hidden) => (
    <ul className="ticker-row" aria-hidden={hidden || undefined}>
      {ITEMS.map((it) => (
        <li key={it.tag}>
          <Link to={it.to} tabIndex={hidden ? -1 : undefined}>
            <span className="ticker-tag mono">{it.tag}</span> {it.text}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="ticker" aria-label="Season headlines">
      <span className="ticker-live mono" aria-hidden="true">LIVE</span>
      <div className="ticker-viewport">
        <div className="ticker-move">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
