import Reveal from '../components/Reveal.jsx'
import { stats } from '../data.js'

export default function Stats() {
  return (
    <section className="stats" aria-label="Airbus key figures">
      <Reveal className="wrap">
        <dl className="stats-row">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
