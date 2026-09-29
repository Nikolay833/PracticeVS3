import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import AircraftSilhouette from '../components/AircraftSilhouette.jsx'

export default function Hero() {
  const reduce = useReducedMotion()
  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        }
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.8, ease: 'easeOut' },
      }

  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...enter(0)}>Independent fan guide</motion.p>
          <motion.h1 {...enter(0.08)}>Europe built a sky of its own.</motion.h1>
          <motion.p className="lede" {...enter(0.16)}>
            From one twin-engine widebody in 1972 to the world's most flown airliner family.
          </motion.p>
          <motion.div className="cta-row" {...enter(0.24)}>
            <a className="btn btn-primary" href="#aircraft">
              Explore aircraft <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="btn btn-ghost" href="#history">View timeline</a>
          </motion.div>
        </div>
        <motion.div className="hero-art" {...enter(0.2)}>
          <svg className="flightpath" viewBox="0 0 600 420" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
            <motion.path d="M-10 330 C 140 320, 260 250, 420 190 S 560 120, 620 90" {...draw} />
            <motion.path d="M-10 350 C 150 340, 280 272, 430 214 S 570 146, 620 118" {...draw} />
            <motion.path d="M-10 370 C 160 360, 300 294, 440 238 S 580 172, 620 146" {...draw} />
          </svg>
          <AircraftSilhouette
            className="hero-plane"
            length={66}
            engines={2}
            label="Large twin-engine airliner in side profile"
          />
        </motion.div>
      </div>
    </section>
  )
}
