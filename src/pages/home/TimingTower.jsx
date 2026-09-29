import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { drivers, teamById, fullName, STATS_NOTE } from '../../data/index.js';

gsap.registerPlugin(Flip, ScrollTrigger);

const METRICS = [
  { key: 'wins', label: 'Wins' },
  { key: 'poles', label: 'Poles' },
  { key: 'podiums', label: 'Podiums' },
  { key: 'titles', label: 'Titles' },
];
const TIEBREAK = ['titles', 'wins', 'podiums', 'poles'];

function ranked(metric) {
  return [...drivers].sort((a, b) => {
    for (const k of [metric, ...TIEBREAK]) if (b[k] !== a[k]) return b[k] - a[k];
    return a.lastName.localeCompare(b.lastName);
  });
}

export default function TimingTower() {
  const root = useRef(null);
  const flipState = useRef(null);
  const [metric, setMetric] = useState('wins');
  const [selectedId, setSelectedId] = useState(null);
  const rows = ranked(metric);
  const selected = drivers.find((d) => d.id === selectedId) || rows[0];
  const team = teamById(selected.team);

  // Rows drop into the tower when it scrolls into view.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.tower-row', {
        x: -40, autoAlpha: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03,
        scrollTrigger: { trigger: '.tower', start: 'top 80%', once: true },
      });
    });
  }, { scope: root });

  // Animate position changes like a live timing screen.
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.7, ease: 'power2.inOut', stagger: 0.012,
      targets: root.current.querySelectorAll('.tower-row'),
    });
    flipState.current = null;
  }, [metric]);

  function changeMetric(key) {
    if (key === metric) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      flipState.current = Flip.getState(root.current.querySelectorAll('.tower-row'));
    }
    setMetric(key);
  }

  // Panel content swap.
  useGSAP(() => {
    gsap.fromTo('.onboard-anim', { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.35, ease: 'power2.out', stagger: 0.04 });
  }, { scope: root, dependencies: [selected.id], revertOnUpdate: true });

  const leaderValue = rows[0][metric];

  return (
    <section className="section tower-section" ref={root} aria-labelledby="tower-title">
      <div className="container">
        <div className="bc-head">
          <h2 id="tower-title" className="bc-title">Timing tower</h2>
          <p className="muted">The current grid ranked by career numbers. Switch the metric and watch the order change.</p>
        </div>

        <div className="tower-layout">
          <div className="tower-wrap">
            <div className="metric-tabs" role="group" aria-label="Rank by">
              {METRICS.map((m) => (
                <button key={m.key} type="button" aria-pressed={metric === m.key} onClick={() => changeMetric(m.key)}>
                  {m.label}
                </button>
              ))}
            </div>
            <ol className="tower">
              {rows.map((d, i) => {
                const t = teamById(d.team);
                const gap = leaderValue - d[metric];
                return (
                  <li key={d.id} className="tower-row" data-flip-id={d.id} style={{ '--team': t.color }}>
                    <Link
                      to={`/drivers/${d.id}`}
                      className={`tower-link${d.id === selected.id ? ' is-selected' : ''}`}
                      onMouseEnter={() => setSelectedId(d.id)}
                      onFocus={() => setSelectedId(d.id)}
                      aria-label={`${i + 1}. ${fullName(d)}, ${t.name}, ${d[metric]} ${metric}`}
                    >
                      <span className="pos mono">{i + 1}</span>
                      <span className="bar" aria-hidden="true" />
                      <span className="code">{d.code}</span>
                      <span className="val mono">{i === 0 ? d[metric] : gap === 0 ? d[metric] : `−${gap}`}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <p className="muted small">{STATS_NOTE}</p>
          </div>

          <aside className="onboard" style={{ '--team': team.color }} aria-label="Selected driver">
            <div className="onboard-top">
              <span className="onboard-num onboard-anim" aria-hidden="true">{selected.number}</span>
              <div className="onboard-anim">
                <p className="mono muted small">ONBOARD · {team.name.toUpperCase()}</p>
                <p className="onboard-name">{selected.firstName} <strong>{selected.lastName}</strong></p>
              </div>
            </div>
            <dl className="onboard-stats">
              {METRICS.map((m) => {
                const max = Math.max(...drivers.map((d) => d[m.key]), 1);
                return (
                  <div key={m.key} className="onboard-anim">
                    <dt className="mono">{m.label.toUpperCase()}</dt>
                    <dd>
                      <span className="meter"><span style={{ '--pct': `${(selected[m.key] / max) * 100}%` }} /></span>
                      <span className="mono">{selected[m.key]}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
            <Link to={`/drivers/${selected.id}`} className="btn btn-ghost onboard-anim">Driver profile</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
