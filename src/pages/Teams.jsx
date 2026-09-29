import { teams, SEASON } from '../data/index.js';
import { PageHeader, TeamCard } from '../components/Cards.jsx';

export default function Teams() {
  return (
    <>
      <PageHeader eyebrow={`${SEASON} constructors`} title="Teams">
        <p>{teams.length} teams line up for {SEASON} — the first expansion of the grid in a decade.</p>
      </PageHeader>
      <section className="section">
        <div className="container grid grid-3">
          {teams.map((t, i) => <TeamCard key={t.id} team={t} index={i} />)}
        </div>
      </section>
    </>
  );
}
