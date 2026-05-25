import type { MusicStats } from '@/data/musicStats'

interface MusicStatsProps {
  overview: MusicStats['overview']
}

export default function MusicStats({ overview }: MusicStatsProps) {
  const statItems = [
    { label: 'Music Hours', value: overview.totalMusicHours.toLocaleString(), color: 'var(--teal)' },
    { label: 'Unique Artists', value: overview.uniqueArtists.toLocaleString(), color: 'var(--blue)' },
    { label: 'Unique Tracks', value: overview.uniqueTracks.toLocaleString(), color: 'var(--teal)' },
    { label: 'Avg Hrs / Month', value: overview.avgHoursPerMonth.toFixed(1), color: 'var(--amber)' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div key={stat.label} className="card text-center py-6">
          <div className="text-2xl sm:text-3xl font-medium tabular-nums mb-1" style={{ color: stat.color }}>
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
