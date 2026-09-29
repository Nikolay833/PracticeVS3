import { Link, useParams } from 'react-router-dom';
import { driverById, teamById, driversForTeam, fullName, ageOn, STATS_NOTE } from '../data/index.js';
import { StatGrid } from '../components/Cards.jsx';
import { ArrowLeft, ArrowRight, Swap } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function DriverDetail() {
  const driver = driverById(useParams().id);
  if (!driver) return <NotFound />;
  const team = teamById(driver.team);
  const teammate = driversForTeam(team.id).find((d) => d.id !== driver.id);

  return (
    <>
      <header className="detail-hero driver-hero" style={{ '--team': team.color }}>
        <span className="hero-number" aria-hidden="true">{driver.number}</span>
        <div className="container">
          <Link to="/drivers" className="back-link"><ArrowLeft /> All drivers</Link>
          <p className="eyebrow">{driver.code} · #{driver.number}</p>
          <h1 className="page-title">
            <span className="first-name">{driver.firstName}</span> {driver.lastName}
          </h1>
          <p className="page-lede">{driver.bio}</p>
          <p><Link to={`/teams/${team.id}`} className="team-pill"><span className="team-dot" aria-hidden="true" />{team.name}</Link></p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <StatGrid
            items={[
              ['Nationality', driver.nationality],
              ['Age', ageOn(driver.born)],
              ['F1 debut', driver.debut],
              ['World titles', driver.titles],
              ['Wins', driver.wins],
              ['Poles', driver.poles],
              ['Podiums', driver.podiums],
            ]}
          />
          <p className="muted small">{STATS_NOTE}</p>
          <div className="actions">
            {teammate && (
              <Link to={`/compare?a=${driver.id}&b=${teammate.id}`} className="btn btn-primary">
                <Swap /> Compare with {fullName(teammate)}
              </Link>
            )}
            <Link to={`/compare?a=${driver.id}`} className="btn btn-ghost">Compare with anyone <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
