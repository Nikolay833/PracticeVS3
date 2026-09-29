import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import AircraftSilhouette from '../components/AircraftSilhouette.jsx'
import Reveal from '../components/Reveal.jsx'
import { aircraft } from '../data.js'

export default function Aircraft() {
  const [idx, setIdx] = useState(1)
  const reduce = useReducedMotion()
  const tabRefs = useRef([])
  const current = aircraft[idx]

  const go = (i) => {
    const n = (i + aircraft.length) % aircraft.length
    setIdx(n)
    tabRefs.current[n]?.focus()
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(idx + 1) }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(idx - 1) }
    else if (e.key === 'Home') { e.preventDefault(); go(0) }
    else if (e.key === 'End') { e.preventDefault(); go(aircraft.length - 1) }
  }

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.28 },
      }

  return (
    <section id="aircraft" className="section">
      <div className="wrap">
        <Reveal as="div" className="section-head">
          <h2>The family, from small to super.</h2>
          <p>Pick a model to compare size, range and character.</p>
        </Reveal>

        <Reveal>
          <div role="tablist" aria-label="Airbus aircraft" className="tabs" onKeyDown={onKey}>
            {aircraft.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${a.id}`}
                aria-selected={i === idx}
                aria-controls="ac-panel"
                tabIndex={i === idx ? 0 : -1}
                className="tab"
                onClick={() => setIdx(i)}
              >
                {a.tab}
              </button>
            ))}
          </div>

          <div id="ac-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="panel detail">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.id} className="detail-inner" {...anim}>
                <div className="detail-art">
                  <AircraftSilhouette
                    length={current.length}
                    doubleDeck={!!current.doubleDeck}
                    engines={current.engines}
                    label={`${current.name} side-profile silhouette, ${current.length} metres long`}
                  />
                </div>
                <div className="detail-info">
                  <h3>{current.name}</h3>
                  <p className="blurb">{current.blurb}</p>
                  <dl className="specs">
                    <div><dt>Seats</dt><dd>{current.seats}</dd></div>
                    <div><dt>Range</dt><dd>{current.range} km</dd></div>
                    <div><dt>Length</dt><dd>{current.lengthLabel} m</dd></div>
                    <div><dt>First flight</dt><dd>{current.firstFlight}</dd></div>
                    <div><dt>Engines</dt><dd>{current.engines}</dd></div>
                  </dl>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="footnote">Figures approximate, typical configurations.</p>
        </Reveal>
      </div>
    </section>
  )
}
