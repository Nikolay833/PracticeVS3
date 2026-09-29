import { Link } from 'react-router-dom';
import { teams, drivers, circuits, history, SEASON, driverById, teamById } from '../data/index.js';
import { ArrowRight } from '../components/Icons.jsx';
import { DriverCard } from '../components/Cards.jsx';

const SECTIONS = [
  { to: '/teams', label: 'Teams', count: teams.length, text: 'Every constructor on the grid — bases, bosses and power units.' },
  { to: '/drivers', label: 'Drivers', count: drivers.length, text: 'The full field, with career numbers and search.' },
  { to: '/circuits', label: 'Circuits', count: circuits.length, text: 'All rounds of the calendar, from Melbourne to Abu Dhabi.' },
  { to: '/history', label: 'History', count: history.champions.length, text: 'Every world champion since 1950, plus the defining moments.' },
];

export default function Home() {
  const champion = driverById('norris');
  const featured = ['norris', 'verstappen', 'leclerc', 'hamilton'].map(driverById);
  const newTeams = ['cadillac', 'audi'].map(teamById);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <p className="eyebrow">Season {SEASON} · New regulations</p>
          <h1 className="hero-title">
            Lights out.<br />
            <span className="accent">Away we go.</span>
          </h1>
          <p className="hero-lede">
            {teams.length} teams, {drivers.length} drivers, {circuits.length} races and a rulebook rewritten from scratch.
            Your pit wall for the new era of Formula 1.
          </p>
          <div className="hero-cta">
            <Link to="/drivers" className="btn btn-primary">Meet the grid <ArrowRight /></Link>
            <Link to="/compare" className="btn btn-ghost">Head-to-head</Link>
          </div>
        </div>
        <div className="start-lights" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ '--i': i }} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-grid">
            {SECTIONS.map((s, i) => (
              <Link key={s.to} to={s.to} className="card section-card reveal" style={{ '--i': i }}>
                <span className="big-count">{s.count}</span>
                <h2 className="card-title">{s.label}</h2>
                <p className="muted">{s.text}</p>
                <span className="card-link">Explore <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" style={{ '--team': teamById(champion.team).color }}>
        <div className="container champion">
          <span className="champion-number" aria-hidden="true">1</span>
          <div>
            <p className="eyebrow">Reigning world champion</p>
            <h2 className="section-title">{champion.firstName} <strong>{champion.lastName}</strong></h2>
            <p className="muted">{champion.bio}</p>
            <Link to={`/drivers/${champion.id}`} className="btn btn-ghost">Driver profile <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Headliners</h2>
            <Link to="/drivers" className="card-link">All drivers <ArrowRight /></Link>
          </div>
          <div className="grid grid-4">
            {featured.map((d, i) => <DriverCard key={d.id} driver={d} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">New on the grid</h2>
          <div className="grid grid-2">
            {newTeams.map((t, i) => (
              <Link key={t.id} to={`/teams/${t.id}`} className="card news-card reveal" style={{ '--team': t.color, '--i': i }}>
                <span className="team-stripe" aria-hidden="true" />
                <div className="card-body">
                  <h3 className="card-title">{t.name}</h3>
                  <p className="muted">{t.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
