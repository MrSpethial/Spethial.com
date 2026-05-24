import type { MusicStats } from '@/data/musicStats'

interface YearChartProps {
  byYear: MusicStats['byYear']
}

export default function YearChart({ byYear }: YearChartProps) {
  const maxHours = Math.max(...byYear.map((y) => y.hours), 1)

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-6">
        Annual Listening Volume
      </h2>
      <div className="flex items-end gap-1 sm:gap-2 h-48 sm:h-56">
        {byYear.map(({ year, hours }) => {
          const heightPct = (hours / maxHours) * 100
          return (
            <div
              key={year}
              className="flex-1 flex flex-col items-center justify-end min-w-0 group"
            >
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-spethial-muted mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {hours}h
              </span>
              <div
                className="w-full rounded-t bg-spethial-accent/80 hover:bg-spethial-accent transition-colors"
                style={{ height: `${Math.max(heightPct, 2)}%` }}
                title={`${year}: ${hours} hours`}
              />
              <span className="text-[10px] sm:text-xs text-gray-600 dark:text-spethial-muted mt-2 truncate w-full text-center">
                {String(year).slice(2)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
