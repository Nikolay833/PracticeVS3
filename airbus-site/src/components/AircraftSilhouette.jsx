const W = 480
const H = 170

export default function AircraftSilhouette({
  length = 40,
  doubleDeck = false,
  engines = 2,
  label,
  className = '',
}) {
  const px = Math.round(length * 6)
  const x0 = (W - px) / 2
  const x1 = x0 + px
  const h = doubleDeck ? 48 : 28
  const cy = 88
  const top = cy - h / 2
  const bot = cy + h / 2
  const xm = x0 + px * 0.5

  const body =
    `M ${x0} ${top + h * 0.2} ` +
    `L ${x1 - h * 1.6} ${top} ` +
    `Q ${x1} ${top} ${x1} ${cy + h * 0.1} ` +
    `Q ${x1} ${bot} ${x1 - h * 1.3} ${bot} ` +
    `L ${x0 + px * 0.16} ${bot} ` +
    `Q ${x0 + px * 0.05} ${bot - h * 0.05} ${x0} ${top + h * 0.2} Z`

  const fin = [
    [x0 + px * 0.02, top + h * 0.35],
    [x0 + px * 0.08, top - h * 1.45],
    [x0 + px * 0.15, top - h * 1.45],
    [x0 + px * 0.25, top + h * 0.05],
  ]
    .map((p) => p.join(','))
    .join(' ')

  const stab = [
    [x0 + px * 0.03, top + h * 0.3],
    [x0 + px * 0.14, top + h * 0.55],
    [x0 + px * 0.06, top + h * 0.55],
  ]
    .map((p) => p.join(','))
    .join(' ')

  const wing = [
    [xm + px * 0.1, cy + h * 0.15],
    [xm - px * 0.14, cy + h * 0.85],
    [xm - px * 0.07, cy + h * 0.85],
    [xm + px * 0.17, cy + h * 0.3],
  ]
    .map((p) => p.join(','))
    .join(' ')

  const ey = cy + h * 0.62
  const near = engines === 4 ? [xm + px * 0.02, xm - px * 0.1] : [xm + px * 0.02]
  const far = engines === 4 ? [xm + px * 0.08, xm - px * 0.04] : [xm + px * 0.06]
  const ew = 26
  const eh = doubleDeck ? 13 : 11

  const winStart = x0 + px * 0.28
  const winEnd = x1 - h * 1.7
  const rows = doubleDeck ? [cy - h * 0.22, cy + h * 0.2] : [cy - h * 0.15]

  return (
    <svg
      className={`aircraft ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label || 'Side-profile airliner silhouette'}
      preserveAspectRatio="xMidYMid meet"
    >
      {far.map((x, i) => (
        <rect
          key={`f${i}`}
          className="ac-engine ac-far"
          x={x}
          y={ey - eh - 3}
          width={ew}
          height={eh}
          rx={eh / 2}
        />
      ))}
      <polygon className="ac-part" points={wing} />
      <polygon className="ac-part" points={stab} />
      <polygon className="ac-part" points={fin} />
      <path className="ac-body" d={body} />
      {rows.map((y, i) => (
        <line
          key={i}
          className="ac-windows"
          x1={winStart}
          x2={winEnd}
          y1={y}
          y2={y}
        />
      ))}
      <line className="ac-accent" x1={x0 + px * 0.24} x2={x0 + px * 0.24} y1={top + 2} y2={bot - 2} />
      {near.map((x, i) => (
        <rect
          key={`n${i}`}
          className="ac-engine"
          x={x}
          y={ey}
          width={ew}
          height={eh}
          rx={eh / 2}
        />
      ))}
    </svg>
  )
}
