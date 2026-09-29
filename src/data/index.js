import teams from './teams.json';
import drivers from './drivers.json';
import circuits from './circuits.json';
import history from './history.json';

export { teams, drivers, circuits, history };

export const SEASON = 2026;
export const STATS_NOTE = 'Career stats are approximate, through the end of the 2025 season.';

export const teamById = (id) => teams.find((t) => t.id === id);
export const driverById = (id) => drivers.find((d) => d.id === id);
export const circuitById = (id) => circuits.find((c) => c.id === id);
export const driversForTeam = (teamId) => drivers.filter((d) => d.team === teamId);
export const fullName = (d) => `${d.firstName} ${d.lastName}`;

export function ageOn(born, date = new Date()) {
  const b = new Date(born);
  let age = date.getFullYear() - b.getFullYear();
  const m = date.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && date.getDate() < b.getDate())) age--;
  return age;
}
