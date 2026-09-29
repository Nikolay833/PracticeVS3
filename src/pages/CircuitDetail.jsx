import { Link, useParams } from 'react-router-dom';
import { circuits, circuitById } from '../data/index.js';
import { StatGrid } from '../components/Cards.jsx';
import { ArrowLeft, ArrowRight, MapPin } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function CircuitDetail() {
  const circuit = circuitById(useParams().id);
  if (!circuit) return <NotFound />;
  const prev = circuits.find((c) => c.round === circuit.round - 1);
  const next = circuits.find((c) => c.round === circuit.round + 1);
  const distance = (circuit.lengthKm * circuit.laps).toFixed(1);

  return (
    <>
      <header className="detail-hero circuit-hero">
        <span className="hero-number" aria-hidden="true">{String(circuit.round).padStart(2, '0')}</span>
        <div className="container">
          <Link to="/circuits" className="back-link"><ArrowLeft /> All circuits</Link>
          <p className="eyebrow">Round {circuit.round}</p>
          <h1 className="page-title">{circuit.gp}</h1>
          <p className="page-lede"><MapPin /> {circuit.name} — {circuit.city}, {circuit.country}</p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <StatGrid
            items={[
              ['Circuit length', `${circuit.lengthKm.toFixed(3)} km`],
              ['Laps', circuit.laps],
              ['Race distance', `${distance} km`],
              ['Corners', circuit.turns],
              ['Track type', circuit.type],
              ['First Grand Prix', circuit.firstGp],
            ]}
          />
          <blockquote className="fact">{circuit.fact}</blockquote>
          <nav className="pager" aria-label="Calendar">
            {prev ? (
              <Link to={`/circuits/${prev.id}`} className="btn btn-ghost"><ArrowLeft /> {prev.gp}</Link>
            ) : <span />}
            {next && (
              <Link to={`/circuits/${next.id}`} className="btn btn-ghost">{next.gp} <ArrowRight /></Link>
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
