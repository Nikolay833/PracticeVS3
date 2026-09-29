import { Link, useSearchParams } from 'react-router-dom';
import { drivers, teams, driverById, teamById, fullName, ageOn, STATS_NOTE } from '../data/index.js';
import { PageHeader } from '../components/Cards.jsx';
import { Swap } from '../components/Icons.jsx';

const METRICS = [
  ['titles', 'World titles'],
  ['wins', 'Wins'],
  ['poles', 'Poles'],
  ['podiums', 'Podiums'],
];

function DriverSelect({ id, label, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {teams.map((t) => (
          <optgroup key={t.id} label={t.name}>
            {drivers.filter((d) => d.team === t.id).map((d) => (
              <option key={d.id} value={d.id}>{fullName(d)}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function Side({ driver, align }) {
  const team = teamById(driver.team);
  return (
    <Link to={`/drivers/${driver.id}`} className={`vs-side vs-${align}`} style={{ '--team': team.color }}>
      <span className="vs-number" aria-hidden="true">{driver.number}</span>
      <span className="first-name">{driver.firstName}</span>
      <span className="card-title last-name">{driver.lastName}</span>
      <span className="small muted">{team.name} · {driver.nationality} · Age {ageOn(driver.born)}</span>
    </Link>
  );
}

export default function Compare() {
  const [params, setParams] = useSearchParams();
  const a = driverById(params.get('a')) || driverById('norris');
  let b = driverById(params.get('b')) || driverById('verstappen');
  if (b.id === a.id) b = drivers.find((d) => d.id !== a.id);

  const set = (next) => setParams(next, { replace: true });
  const colorA = teamById(a.team).color;
  // Same-team comparison: give the right side a neutral colour so bars stay distinguishable.
  const colorB = a.team === b.team ? '#f5f5f7' : teamById(b.team).color;

  return (
    <>
      <PageHeader eyebrow="Head-to-head" title="Compare drivers">
        <p>Pick any two drivers on the grid. The URL updates, so you can share the matchup.</p>
      </PageHeader>
      <section className="section">
        <div className="container">
          <form className="filters compare-pickers" onSubmit={(e) => e.preventDefault()}>
            <DriverSelect id="a" label="Driver A" value={a.id} onChange={(v) => set({ a: v, b: b.id })} />
            <button type="button" className="btn btn-ghost swap-btn" onClick={() => set({ a: b.id, b: a.id })}
              aria-label="Swap drivers">
              <Swap />
            </button>
            <DriverSelect id="b" label="Driver B" value={b.id} onChange={(v) => set({ a: a.id, b: v })} />
          </form>

          <div className="vs">
            <Side driver={a} align="left" />
            <span className="vs-badge" aria-hidden="true">VS</span>
            <Side driver={b} align="right" />
          </div>

          <ul className="compare-list" style={{ '--a': colorA, '--b': colorB }}>
            {METRICS.map(([key, label]) => {
              const va = a[key];
              const vb = b[key];
              const max = Math.max(va, vb, 1);
              return (
                <li key={key}>
                  <span className={`cmp-value${va > vb ? ' lead' : ''}`}>{va}</span>
                  <span className="cmp-bar cmp-a"><span style={{ '--pct': `${(va / max) * 100}%` }} /></span>
                  <span className="cmp-label">{label}</span>
                  <span className="cmp-bar cmp-b"><span style={{ '--pct': `${(vb / max) * 100}%` }} /></span>
                  <span className={`cmp-value${vb > va ? ' lead' : ''}`}>{vb}</span>
                </li>
              );
            })}
            <li>
              <span className="cmp-value">{a.debut}</span>
              <span />
              <span className="cmp-label">F1 debut</span>
              <span />
              <span className="cmp-value">{b.debut}</span>
            </li>
          </ul>
          <p className="muted small center">{STATS_NOTE} Leading value shown in bold.</p>
        </div>
      </section>
    </>
  );
}
