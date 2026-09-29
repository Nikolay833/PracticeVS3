import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Teams from './pages/Teams.jsx';
import TeamDetail from './pages/TeamDetail.jsx';
import Drivers from './pages/Drivers.jsx';
import DriverDetail from './pages/DriverDetail.jsx';
import Circuits from './pages/Circuits.jsx';
import CircuitDetail from './pages/CircuitDetail.jsx';
import History from './pages/History.jsx';
import Compare from './pages/Compare.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles.css';

// HashRouter keeps deep links working on GitHub Pages (no server-side rewrites).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="drivers/:id" element={<DriverDetail />} />
          <Route path="circuits" element={<Circuits />} />
          <Route path="circuits/:id" element={<CircuitDetail />} />
          <Route path="history" element={<History />} />
          <Route path="compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
