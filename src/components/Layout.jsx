import { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, Close } from './Icons.jsx';
import { SEASON } from '../data/index.js';

const NAV = [
  { to: '/teams', label: 'Teams' },
  { to: '/drivers', label: 'Drivers' },
  { to: '/circuits', label: 'Circuits' },
  { to: '/history', label: 'History' },
  { to: '/compare', label: 'Compare' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu and reset scroll on route change.
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Pit Wall home">
            <span className="brand-mark" aria-hidden="true" />
            <span>PIT<em>WALL</em></span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
          <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p><strong>PIT WALL</strong> — an unofficial fan hub for the {SEASON} Formula 1 season.</p>
          <p className="muted small">
            Not affiliated with Formula 1, the FIA or any team. F1 and team names are trademarks of their owners.
          </p>
        </div>
      </footer>
    </>
  );
}
