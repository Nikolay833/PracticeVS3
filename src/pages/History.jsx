import { useDeferredValue, useState } from 'react';
import { history } from '../data/index.js';
import { PageHeader } from '../components/Cards.jsx';
import { Search, Trophy } from '../components/Icons.jsx';

const { champions, moments } = history;

// Drivers ranked by number of titles (multi-time champions only).
const leaders = Object.entries(
  champions.reduce((acc, c) => ({ ...acc, [c.driver]: (acc[c.driver] || 0) + 1 }), {}),
)
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const maxTitles = leaders[0][1];

const decades = [...new Set(champions.map((c) => Math.floor(c.year / 10) * 10))];

export default function History() {
  const [query, setQuery] = useState('');
  const [decade, setDecade] = useState('');
  const q = useDeferredValue(query.trim().toLowerCase());

  const rows = champions
    .filter((c) => !decade || Math.floor(c.year / 10) * 10 === Number(decade))
    .filter((c) => !q || `${c.driver} ${c.team} ${c.nationality} ${c.year}`.toLowerCase().includes(q))
    .slice()
    .reverse();

  return (
    <>
      <PageHeader eyebrow="Since 1950" title="History">
        <p>{champions.length} seasons, {new Set(champions.map((c) => c.driver)).size} different world champions.</p>
      </PageHeader>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Defining moments</h2>
          <ol className="timeline">
            {moments.map((m, i) => (
              <li key={m.year} className="reveal" style={{ '--i': i }}>
                <span className="timeline-year">{m.year}</span>
                <div>
                  <h3 className="card-title">{m.title}</h3>
                  <p className="muted">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2 className="section-title">Most titles</h2>
            <ul className="bar-list">
              {leaders.map(([name, n]) => (
                <li key={name}>
                  <span className="bar-label">{name}</span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ '--pct': `${(n / maxTitles) * 100}%` }} />
                  </span>
                  <span className="bar-value">{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="section-title">World champions</h2>
            <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
              <div className="field field-search">
                <label htmlFor="hq">Search</label>
                <div className="input-icon">
                  <Search />
                  <input id="hq" type="search" value={query} placeholder="Driver, team or year"
                    onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="decade">Decade</label>
                <select id="decade" value={decade} onChange={(e) => setDecade(e.target.value)}>
                  <option value="">All</option>
                  {decades.map((d) => <option key={d} value={d}>{d}s</option>)}
                </select>
              </div>
            </form>
            <div className="table-wrap">
              <table className="table">
                <caption className="sr-only">Drivers' world champions by year</caption>
                <thead>
                  <tr><th scope="col">Year</th><th scope="col">Champion</th><th scope="col">Team</th></tr>
                </thead>
                <tbody>
                  {rows.map((c) => (
                    <tr key={c.year}>
                      <td className="tabular">{c.year}</td>
                      <td><Trophy className="inline-icon" /> {c.driver} <span className="muted small">{c.nationality}</span></td>
                      <td>{c.team}</td>
                    </tr>
                  ))}
                  {!rows.length && (
                    <tr><td colSpan={3} className="muted">No champions match.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
