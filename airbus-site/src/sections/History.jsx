import Reveal from '../components/Reveal.jsx'
import { milestones } from '../data.js'

export default function History() {
  return (
    <section id="history" className="section section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Fifty years of firsts.</h2>
          <p>Key moments from the founding of Airbus to the end of the A380.</p>
        </Reveal>
        <ol className="timeline">
          {milestones.map((m, i) => (
            <Reveal as="li" key={m.year} className={`tl-item ${i % 2 ? 'right' : 'left'}`} y={18}>
              <div className="tl-card">
                <span className="tl-year">{m.year}</span>
                <p>{m.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
