import { GlobeIcon, MapPinIcon, StarIconSolid } from '@/components/Icons'
import type { TravelStats as TravelStatsType } from '@/data/travels'

interface TravelStatsProps {
  stats: TravelStatsType
}

export default function TravelStats({ stats }: TravelStatsProps) {
  const statItems = [
    {
      label: 'Countries',
      value: stats.totalCountries,
      icon: GlobeIcon,
      color: 'text-blue-500',
    },
    {
      label: 'Cities',
      value: stats.totalCities,
      icon: MapPinIcon,
      color: 'text-emerald-500',
    },
    {
      label: 'Favorites',
      value: stats.favoriteCount,
      icon: StarIconSolid,
      color: 'text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="card text-center py-6"
        >
          <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
          <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-spethial-text mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-spethial-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
