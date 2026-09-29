import Hero from './home/Hero.jsx';
import Ticker from './home/Ticker.jsx';
import TimingTower from './home/TimingTower.jsx';
import SeasonLap from './home/SeasonLap.jsx';
import SpeedTrap from './home/SpeedTrap.jsx';
import './home/home.css';

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Ticker />
      <TimingTower />
      <SeasonLap />
      <SpeedTrap />
    </div>
  );
}
