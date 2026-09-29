import { useDeferredValue, useState } from 'react';
import { drivers, teams, teamById, fullName, SEASON } from '../data/index.js';
import { PageHeader, DriverCard } from '../components/Cards.jsx';
import { Search } from '../components/Icons.jsx';

const nationalities = [...new Set(drivers.map((d) => d.nationality))].sort();
const SORTS = {
  team: (a, b) => teams.findIndex((t) => t.id === a.team) - teams.findIndex((t) => t.id === b.team),
  number: (a, b) => a.number - b.number,
  name: (a, b) => a.lastName.localeCompare(b.lastName),
  wins: (a, b) => b.wins - a.wins,
};

export default function Drivers() {
  const [query, setQuery] = useState('');
  const [team, setTeam] = useState('');
  const [nation, setNation] = useState('');
  const [sort, setSort] = useState('team');
  const q = useDeferredValue(query.trim().toLowerCase());

  const results = drivers
    .filter((d) => !team || d.team === team)
    .filter((d) => !nation || d.nationality === nation)
    .filter((d) => {
      if (!q) return true;
      const hay = `${fullName(d)} ${d.code} ${d.number} ${teamById(d.team).name}`.toLowerCase();
      return hay.includes(q);
    })
    .sort(SORTS[sort]);

  const reset = () => { setQuery(''); setTeam(''); setNation(''); setSort('team'); };

  return (
    <>
      <PageHeader eyebrow={`${SEASON} grid`} title="Drivers">
        <p>Search the field by name, number or team, then filter by nationality.</p>
      </PageHeader>
      <section className="section">
        <div className="container">
          <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="field field-search">
              <label htmlFor="q">Search</label>
              <div className="input-icon">
                <Search />
                <input id="q" type="search" value={query} placeholder="e.g. Leclerc, 44, Ferrari"
                  onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="team">Team</label>
              <select id="team" value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="">All teams</option>
                {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="nation">Nationality</label>
              <select id="nation" value={nation} onChange={(e) => setNation(e.target.value)}>
                <option value="">All</option>
                {nationalities.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="team">Team</option>
                <option value="number">Car number</option>
                <option value="name">Surname</option>
                <option value="wins">Career wins</option>
              </select>
            </div>
          </form>

          <p className="result-count" aria-live="polite">
            {results.length} of {drivers.length} drivers
          </p>

          {results.length ? (
            <div className="grid grid-4">
              {results.map((d, i) => <DriverCard key={d.id} driver={d} index={i} />)}
            </div>
          ) : (
            <div className="empty">
              <p>No drivers match those filters.</p>
              <button className="btn btn-ghost" onClick={reset}>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
