import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { circuits, drivers, history, SEASON } from '../../data/index.js';

gsap.registerPlugin(ScrollTrigger);

// All figures are derived from the site's own data.
const seasonKm = Math.round(circuits.reduce((sum, c) => sum + c.lengthKm * c.laps, 0));
const gridWins = drivers.reduce((sum, d) => sum + d.wins, 0);
const champions = new Set(history.champions.map((c) => c.driver)).size;

const READOUTS = [
  { value: seasonKm, unit: 'KM', label: `Racing distance in ${SEASON}`, tone: 'purple' },
  { value: gridWins, unit: 'WINS', label: 'Won by drivers on this grid', tone: 'green' },
  { value: history.champions.length, unit: 'SEASONS', label: 'Of world championship racing', tone: 'yellow' },
  { value: champions, unit: 'CHAMPIONS', label: 'Different drivers crowned', tone: 'red' },
];

export default function SpeedTrap() {
  const root = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.current.querySelectorAll('.trap-value').forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: end,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString('en-US'); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
      gsap.from('.trap-strip', {
        scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
    });
  }, { scope: root });

  return (
    <section className="section" ref={root} aria-labelledby="trap-title">
      <div className="container">
        <h2 id="trap-title" className="bc-title">Speed trap</h2>
        <dl className="trap-grid">
          {READOUTS.map((r) => (
            <div key={r.unit} className="trap">
              <dt className="muted">{r.label}</dt>
              <dd>
                <span className="trap-value mono" data-value={r.value}>{r.value.toLocaleString('en-US')}</span>
                <span className="trap-unit mono">{r.unit}</span>
              </dd>
              <span className={`trap-strip tone-bg-${r.tone}`} aria-hidden="true" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
