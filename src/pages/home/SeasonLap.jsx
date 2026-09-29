import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { circuits, SEASON } from '../../data/index.js';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

export default function SeasonLap() {
  const root = useRef(null);
  const counter = useRef(null);
  const fill = useRef(null);
  const total = circuits.length;

  const setProgress = (p) => {
    counter.current.textContent = pad(Math.min(total, 1 + Math.floor(p * total)));
    fill.current.style.clipPath = `inset(0 ${100 - p * 100}% 0 0)`;
  };

  useGSAP(() => {
    const viewport = root.current.querySelector('.lap-viewport');
    const track = root.current.querySelector('.lap-track');
    const mm = gsap.matchMedia();

    // Desktop: pin the section and drive the calendar sideways with the scrollbar.
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.scrollWidth - viewport.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top+=64', // below the sticky header
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    });

    // Everywhere else: native horizontal scroll, counter follows it.
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      const onScroll = () => {
        const max = viewport.scrollWidth - viewport.clientWidth;
        setProgress(max > 0 ? viewport.scrollLeft / max : 1);
      };
      viewport.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => viewport.removeEventListener('scroll', onScroll);
    });
  }, { scope: root });

  return (
    <section className="lap-section" ref={root} aria-labelledby="lap-title">
      <div className="container lap-head">
        <div>
          <h2 id="lap-title" className="bc-title">The {SEASON} lap</h2>
          <p className="muted">{total} rounds, Melbourne to Abu Dhabi.</p>
        </div>
        <p className="lap-counter mono" aria-hidden="true">
          ROUND <span ref={counter}>01</span><span className="muted">/{total}</span>
        </p>
      </div>
      <div className="container">
        <div className="lap-progress" aria-hidden="true">
          <span className="lap-fill" ref={fill} />
          <span className="sector-tick" style={{ left: '33.33%' }} />
          <span className="sector-tick" style={{ left: '66.66%' }} />
        </div>
      </div>
      <div className="lap-viewport">
        <ol className="lap-track">
          {circuits.map((c) => (
            <li key={c.id}>
              <Link to={`/circuits/${c.id}`} className="lap-card">
                <span className="lap-round mono">R{pad(c.round)}</span>
                <span className="lap-country">{c.country}</span>
                <span className="lap-gp">{c.gp}</span>
                <span className="lap-meta mono">
                  {c.lengthKm.toFixed(3)} KM · {c.laps} LAPS
                </span>
                <span className={`lap-type type-${c.type.toLowerCase()}`}>{c.type}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
