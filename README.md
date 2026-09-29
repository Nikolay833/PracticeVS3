# PracticeVS3 — Pit Wall F1 Fan Hub

An unofficial Formula 1 fan site for the 2026 season, built with React + Vite.

## Features

- **Teams** — all 11 teams on the 2026 grid, with base, team principal and power unit
- **Drivers** — all 22 drivers, with search, team/nationality filters and sorting
- **Circuits** — the planned 24-round calendar, with search and a track-type filter
- **History** — every world champion since 1950, a title leaderboard and a timeline of defining moments
- **Compare** — head-to-head driver stats; the matchup is stored in the URL so it can be shared
- Detail pages for every team, driver and circuit

All data is hardcoded in `src/data/*.json`. Driver career stats are approximate, through the end of the 2025 season.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
One-time setup: in the repository settings, go to **Pages** and set **Source** to **GitHub Actions**.

The app uses `HashRouter` (URLs like `/#/drivers/norris`) so deep links work on GitHub Pages without server rewrites.
