import { Drop, Leaf, Ruler } from '@phosphor-icons/react'
import Reveal from '../components/Reveal.jsx'

export default function Future() {
  return (
    <section id="future" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What flies next.</h2>
          <p>Three threads shaping the next generation of Airbus aircraft.</p>
        </Reveal>
        <div className="bento">
          <Reveal as="article" className="cell cell-zeroe">
            <svg className="pattern" aria-hidden="true" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="cell-body">
              <Drop size={32} aria-hidden="true" className="cell-icon" />
              <h3>ZEROe hydrogen aircraft</h3>
              <p>
                Airbus unveiled its ZEROe hydrogen concepts in 2020, exploring aircraft that burn
                or convert hydrogen instead of kerosene. The original goal of entry into service
                by 2035 has since been pushed back.
              </p>
            </div>
          </Reveal>
          <Reveal as="article" className="cell cell-saf" delay={0.08}>
            <Leaf size={32} aria-hidden="true" className="cell-icon" />
            <h3>Sustainable Aviation Fuel</h3>
            <p>
              All Airbus aircraft are certified for up to <span className="mono">50%</span> SAF
              blends, with the aim of <span className="mono">100%</span> capability by{' '}
              <span className="mono">2030</span>.
            </p>
          </Reveal>
          <Reveal as="article" className="cell cell-xlr" delay={0.16}>
            <Ruler size={32} aria-hidden="true" className="cell-icon" />
            <h3>A321XLR</h3>
            <p>
              An extra-long-range single-aisle that entered service in{' '}
              <span className="mono">2024</span>, reaching about{' '}
              <span className="mono">8,700 km</span>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
