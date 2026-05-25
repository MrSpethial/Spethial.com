import type { MusicStats } from '@/data/musicStats'

interface YearChartProps {
  byYear: MusicStats['byYear']
}

export default function YearChart({ byYear }: YearChartProps) {
  const maxHours = Math.max(...byYear.map((y) => y.hours), 1)

  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-6">Annual Listening Volume</h2>
      <div className="flex gap-1 sm:gap-2 h-48 sm:h-56">
        {byYear.map(({ year, hours }) => {
          const heightPct = (hours / maxHours) * 100
          return (
            <div key={year} className="flex-1 flex flex-col items-center min-w-0 h-full group">
              <span className="text-[10px] sm:text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: 'var(--ink-mute)' }}>
                {hours}h
              </span>
              <div className="flex-1 w-full flex items-end min-h-0">
                <div
                  className="w-full rounded-t transition-colors"
                  style={{ height: `${Math.max(heightPct, 2)}%`, background: 'var(--teal)', opacity: 0.7 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                  title={`${year}: ${hours} hours`}
                />
              </div>
              <span className="text-[10px] sm:text-xs mt-2 truncate w-full text-center shrink-0" style={{ color: 'var(--ink-mute)' }}>
                {String(year).slice(2)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
