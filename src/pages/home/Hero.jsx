import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { teams, drivers, circuits, SEASON } from '../../data/index.js';

const LIGHT_STEP_MS = 600;
const REDUCED = '(prefers-reduced-motion: reduce)';

// Rate a reaction time with broadcast sector colours.
function rate(ms) {
  if (ms < 200) return { label: 'Purple sector', tone: 'purple' };
  if (ms < 300) return { label: 'Green sector', tone: 'green' };
  return { label: 'Yellow sector', tone: 'yellow' };
}

function Headline({ text, className }) {
  // Split into chars so GSAP can stagger them; the full word stays readable to screen readers.
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="char" aria-hidden="true">{ch}</span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef(null);
  const timers = useRef([]);
  const goAt = useRef(0);
  const [lit, setLit] = useState(0);
  const [phase, setPhase] = useState('intro'); // intro | idle | arming | go | result | jump
  const [result, setResult] = useState(null);
  const [best, setBest] = useState(null);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // Light the five pods one by one, hold, then all out.
  function runLights(holdMs, onOut) {
    clearTimers();
    setLit(0);
    for (let i = 1; i <= 5; i++) {
      timers.current.push(setTimeout(() => setLit(i), i * LIGHT_STEP_MS));
    }
    timers.current.push(setTimeout(() => { setLit(0); onOut(); }, 5 * LIGHT_STEP_MS + holdMs));
  }

  useEffect(() => clearTimers, []);

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(REDUCED, () => { setPhase('idle'); });
    mm.add(`not all and ${REDUCED}`, () => {
      gsap.set('.hero-reveal, .hud-item', { autoAlpha: 0 });
      gsap.set('.hero-streak', { scaleX: 0 });
      gsap.set('.hero-head .char', { yPercent: 110, skewX: -12 });
      runLights(700, () => revealRef.current());
    });
    return () => mm.revert();
  }, { scope: root });

  const revealRef = useRef(() => {});
  revealRef.current = contextSafe(() => {
    const tl = gsap.timeline({ onComplete: () => setPhase((p) => (p === 'intro' ? 'idle' : p)) });
    tl.to('.hero-head .char', { yPercent: 0, skewX: 0, duration: 0.7, ease: 'expo.out', stagger: 0.035 })
      .to('.hero-streak', { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.5')
      .to('.hero-reveal', { autoAlpha: 1, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .fromTo('.hud-item', { y: 12 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '<');
  });

  function startTest() {
    setResult(null);
    setPhase('arming');
    const hold = 200 + Math.random() * 2800;
    runLights(hold, () => { goAt.current = performance.now(); setPhase('go'); });
  }

  function press() {
    if (phase === 'arming') { clearTimers(); setLit(0); setPhase('jump'); return; }
    if (phase === 'go') {
      const ms = Math.round(performance.now() - goAt.current);
      setResult(ms);
      setBest((b) => (b == null || ms < b ? ms : b));
      setPhase('result');
      return;
    }
    if (phase !== 'intro') startTest();
  }

  const running = phase === 'arming' || phase === 'go';
  const rating = result != null ? rate(result) : null;

  return (
    <section className="hero-bc" ref={root} aria-labelledby="hero-title">
      <div className="gantry" role="img" aria-label={`Start lights: ${lit} of 5 lit`}>
        <span className="gantry-beam" aria-hidden="true" />
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="pod" data-on={lit >= n} aria-hidden="true">
            <span className="bulb" /><span className="bulb" />
          </span>
        ))}
      </div>

      <div className="container hero-bc-inner">
        <h1 id="hero-title" className="hero-head">
          <Headline text="LIGHTS" className="line" />
          <Headline text="OUT." className="line line-red" />
        </h1>
        <span className="hero-streak" aria-hidden="true" />

        <ul className="hud" aria-label="Season at a glance">
          <li className="hud-item"><span>Season</span><strong>{SEASON}</strong></li>
          <li className="hud-item"><span>Teams</span><strong>{teams.length}</strong></li>
          <li className="hud-item"><span>Drivers</span><strong>{drivers.length}</strong></li>
          <li className="hud-item"><span>Rounds</span><strong>{circuits.length}</strong></li>
        </ul>

        <div className="hero-bottom hero-reveal">
          <p className="hero-copy">
            New cars, new engines, an eleventh team. Everything about the {SEASON} grid, from the
            teams to every champion since 1950.
          </p>
          <div className="hero-links">
            <Link to="/drivers" className="btn btn-primary">The grid</Link>
            <Link to="/compare" className="btn btn-ghost">Head-to-head</Link>
          </div>
        </div>

        <div className="reaction hero-reveal">
          <div className="reaction-head">
            <span className="mono">REACTION TEST</span>
            {best != null && <span className="mono muted">BEST {(best / 1000).toFixed(3)}s</span>}
          </div>
          <button
            type="button"
            className={`reaction-btn${running ? ' is-running' : ''}`}
            onPointerDown={(e) => { if (e.pointerType !== 'mouse' || e.button === 0) press(); }}
            onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } }}
            disabled={phase === 'intro'}
          >
            {phase === 'arming' || phase === 'go' ? 'Hit it when the lights go out' :
              phase === 'result' || phase === 'jump' ? 'Try again' : 'Start'}
          </button>
          <p className="reaction-out" aria-live="polite">
            {phase === 'jump' && <span className="tone-red">Jump start. Drive-through penalty.</span>}
            {phase === 'result' && (
              <>
                <strong className={`mono tone-${rating.tone}`}>{(result / 1000).toFixed(3)}s</strong>{' '}
                <span className="muted">{rating.label}</span>
              </>
            )}
            {(phase === 'idle' || phase === 'intro') && <span className="muted">F1 drivers react in about 0.2 s.</span>}
            {running && <span className="muted">Watch the lights…</span>}
          </p>
        </div>
      </div>
    </section>
  );
}
