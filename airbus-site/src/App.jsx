import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Stats from './sections/Stats.jsx'
import Aircraft from './sections/Aircraft.jsx'
import History from './sections/History.jsx'
import Future from './sections/Future.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Aircraft />
        <History />
        <Future />
      </main>
      <Footer />
    </>
  )
}
