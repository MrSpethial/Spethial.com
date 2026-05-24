import type { MusicStats } from '@/data/musicStats'

interface GenreChartProps {
  topGenres: MusicStats['topGenres']
}

const trendStyles: Record<string, string> = {
  rising: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  falling: 'bg-red-500/15 text-red-600 dark:text-red-400',
  stable: 'bg-gray-500/15 text-gray-600 dark:text-spethial-muted',
  new: 'bg-spethial-accent/15 text-spethial-accent',
}

export default function GenreChart({ topGenres }: GenreChartProps) {
  const genres = [...topGenres] as Array<MusicStats['topGenres'][number]>

  if (genres.length === 0) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-2">
          Top Genres
        </h2>
        <p className="text-sm text-gray-500 dark:text-spethial-muted">
          Genre data unavailable — re-run analysis with Spotify API enrichment.
        </p>
      </div>
    )
  }

  const maxHours = Math.max(...genres.map((g) => g.hours), 1)

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-6">
        Top Genres by Listening Time
      </h2>
      <ul className="space-y-3">
        {genres.map((item) => {
          const widthPct = (item.hours / maxHours) * 100
          const trend = item.trend in trendStyles ? item.trend : 'stable'
          return (
            <li key={item.genre} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-gray-900 dark:text-spethial-text truncate">
                  {item.genre}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-500 dark:text-spethial-muted tabular-nums">
                    {item.hours}h · {item.pct}%
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-medium ${trendStyles[trend]}`}
                  >
                    {trend}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-spethial-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-spethial-accent/70 rounded-full"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
