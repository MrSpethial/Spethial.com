import type { TravelStats as TravelStatsType } from '@/data/travels'

interface TravelStatsProps {
  stats: TravelStatsType
}

export default function TravelStats({ stats }: TravelStatsProps) {
  const statItems = [
    { label: 'Countries', value: stats.totalCountries, color: 'var(--teal)' },
    { label: 'Cities', value: stats.totalCities, color: 'var(--blue)' },
    { label: 'Favourites', value: stats.favoriteCount, color: 'var(--amber)' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {statItems.map((stat) => (
        <div key={stat.label} className="card text-center py-6">
          <div className="text-3xl sm:text-4xl font-medium tabular-nums mb-1" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: 'var(--ink-mute)' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
