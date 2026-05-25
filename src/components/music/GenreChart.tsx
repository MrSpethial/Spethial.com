import type { MusicStats } from '@/data/musicStats'

interface GenreChartProps {
  topGenres: MusicStats['topGenres']
}

const trendColors: Record<string, { bg: string; text: string }> = {
  rising:  { bg: 'rgba(100,255,218,0.14)', text: 'var(--teal)' },
  falling: { bg: 'rgba(255,176,136,0.14)', text: 'var(--amber)' },
  stable:  { bg: 'var(--hairline)', text: 'var(--ink-mute)' },
  new:     { bg: 'rgba(165,200,255,0.16)', text: 'var(--blue)' },
}

export default function GenreChart({ topGenres }: GenreChartProps) {
  const genres = [...topGenres]

  if (genres.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-medium mb-2">Top Genres</h2>
        <p className="text-sm" style={{ color: 'var(--ink-mute)' }}>
          Genre data unavailable — re-run analysis with Spotify API enrichment.
        </p>
      </div>
    )
  }

  const maxHours = Math.max(...genres.map((g) => g.hours), 1)

  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-6">Top Genres by Listening Time</h2>
      <ul className="space-y-3">
        {genres.map((item) => {
          const widthPct = (item.hours / maxHours) * 100
          const trend = item.trend in trendColors ? item.trend : 'stable'
          const colors = trendColors[trend]
          return (
            <li key={item.genre} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium truncate">{item.genre}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="tabular-nums" style={{ color: 'var(--ink-mute)' }}>{item.hours}h · {item.pct}%</span>
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-medium" style={{ background: colors.bg, color: colors.text }}>
                    {trend}
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                <div className="h-full rounded-full" style={{ width: `${widthPct}%`, background: 'var(--teal)', opacity: 0.7 }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
