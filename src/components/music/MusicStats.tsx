import {
  ClockIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import type { MusicStats } from '@/data/musicStats'

interface MusicStatsProps {
  overview: MusicStats['overview']
}

export default function MusicStats({ overview }: MusicStatsProps) {
  const statItems = [
    {
      label: 'Music Hours',
      value: overview.totalMusicHours.toLocaleString(),
      icon: ClockIcon,
      color: 'text-spethial-accent',
    },
    {
      label: 'Unique Artists',
      value: overview.uniqueArtists.toLocaleString(),
      icon: UserGroupIcon,
      color: 'text-violet-500',
    },
    {
      label: 'Unique Tracks',
      value: overview.uniqueTracks.toLocaleString(),
      icon: MusicalNoteIcon,
      color: 'text-emerald-500',
    },
    {
      label: 'Avg Hrs / Month',
      value: overview.avgHoursPerMonth.toFixed(1),
      icon: ChartBarIcon,
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((stat) => (
        <div key={stat.label} className="card text-center py-6">
          <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-spethial-text mb-1">
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
