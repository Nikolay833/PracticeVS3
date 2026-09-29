import { useDeferredValue, useState } from 'react';
import { circuits, SEASON } from '../data/index.js';
import { PageHeader, CircuitCard } from '../components/Cards.jsx';
import { Search } from '../components/Icons.jsx';

const TYPES = ['All', 'Permanent', 'Street', 'Hybrid'];

export default function Circuits() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const q = useDeferredValue(query.trim().toLowerCase());

  const results = circuits.filter((c) =>
    (type === 'All' || c.type === type) &&
    (!q || `${c.gp} ${c.name} ${c.city} ${c.country}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <PageHeader eyebrow={`${SEASON} calendar`} title="Circuits">
        <p>{circuits.length} rounds on the planned {SEASON} calendar, including the brand-new Madring in Madrid.</p>
      </PageHeader>
      <section className="section">
        <div className="container">
          <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="field field-search">
              <label htmlFor="cq">Search</label>
              <div className="input-icon">
                <Search />
                <input id="cq" type="search" value={query} placeholder="e.g. Monaco, Japan, Vegas"
                  onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
              </div>
            </div>
            <fieldset className="field chips">
              <legend>Track type</legend>
              {TYPES.map((t) => (
                <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)}>
                  {t}
                </button>
              ))}
            </fieldset>
          </form>
          <p className="result-count" aria-live="polite">{results.length} of {circuits.length} circuits</p>
          {results.length ? (
            <div className="grid grid-3">
              {results.map((c, i) => <CircuitCard key={c.id} circuit={c} index={i} />)}
            </div>
          ) : (
            <div className="empty">
              <p>No circuits match.</p>
              <button className="btn btn-ghost" onClick={() => { setQuery(''); setType('All'); }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
