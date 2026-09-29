import { Link } from 'react-router-dom';
import { teamById, driversForTeam, fullName } from '../data/index.js';

export function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {children && <div className="page-lede">{children}</div>}
      </div>
    </header>
  );
}

export function TeamCard({ team, index = 0 }) {
  const lineup = driversForTeam(team.id);
  return (
    <Link
      to={`/teams/${team.id}`}
      className="card team-card reveal"
      style={{ '--team': team.color, '--i': index }}
    >
      <span className="team-stripe" aria-hidden="true" />
      <div className="card-body">
        <h3 className="card-title">{team.name}</h3>
        <p className="muted small">{team.base}</p>
        <ul className="lineup">
          {lineup.map((d) => (
            <li key={d.id}>
              <span className="num">{d.number}</span> {fullName(d)}
            </li>
          ))}
        </ul>
        <p className="meta small">Power unit · {team.powerUnit}</p>
      </div>
    </Link>
  );
}

export function DriverCard({ driver, index = 0 }) {
  const team = teamById(driver.team);
  return (
    <Link
      to={`/drivers/${driver.id}`}
      className="card driver-card reveal"
      style={{ '--team': team.color, '--i': index }}
    >
      <span className="driver-number" aria-hidden="true">{driver.number}</span>
      <div className="card-body">
        <p className="first-name">{driver.firstName}</p>
        <h3 className="card-title last-name">{driver.lastName}</h3>
        <p className="small">
          <span className="team-dot" aria-hidden="true" />
          {team.name}
        </p>
        <p className="muted small">{driver.nationality} · #{driver.number}</p>
      </div>
    </Link>
  );
}

export function CircuitCard({ circuit, index = 0 }) {
  return (
    <Link to={`/circuits/${circuit.id}`} className="card circuit-card reveal" style={{ '--i': index }}>
      <div className="card-body">
        <p className="round">Round {String(circuit.round).padStart(2, '0')}</p>
        <h3 className="card-title">{circuit.gp}</h3>
        <p className="muted small">{circuit.name} · {circuit.city}</p>
        <dl className="mini-stats">
          <div><dt>Length</dt><dd>{circuit.lengthKm.toFixed(3)} km</dd></div>
          <div><dt>Laps</dt><dd>{circuit.laps}</dd></div>
          <div><dt>Type</dt><dd>{circuit.type}</dd></div>
        </dl>
      </div>
    </Link>
  );
}

export function StatGrid({ items }) {
  return (
    <dl className="stat-grid">
      {items.map(([label, value]) => (
        <div key={label} className="stat">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
