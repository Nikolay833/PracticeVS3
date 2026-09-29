import { Link, useParams } from 'react-router-dom';
import { teamById, driversForTeam } from '../data/index.js';
import { DriverCard, StatGrid } from '../components/Cards.jsx';
import { ArrowLeft } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function TeamDetail() {
  const team = teamById(useParams().id);
  if (!team) return <NotFound />;
  const lineup = driversForTeam(team.id);

  return (
    <>
      <header className="detail-hero" style={{ '--team': team.color }}>
        <div className="container">
          <Link to="/teams" className="back-link"><ArrowLeft /> All teams</Link>
          <p className="eyebrow">{team.fullName}</p>
          <h1 className="page-title">{team.name}</h1>
          <p className="page-lede">{team.bio}</p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <StatGrid
            items={[
              ['Base', team.base],
              ['Team principal', team.principal],
              ['Power unit', team.powerUnit],
              ['First entry', team.firstEntry],
              ["Constructors' titles", team.constructorsTitles],
            ]}
          />
          <h2 className="section-title">Race drivers</h2>
          <div className="grid grid-2">
            {lineup.map((d, i) => <DriverCard key={d.id} driver={d} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
