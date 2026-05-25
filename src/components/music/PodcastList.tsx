import type { MusicStats } from '@/data/musicStats'

interface PodcastListProps {
  topPodcasts: MusicStats['topPodcasts']
  totalPodcastHours: number
}

export default function PodcastList({ topPodcasts, totalPodcastHours }: PodcastListProps) {
  return (
    <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
      <div className="container-main">
        <div className="flex flex-col gap-2 mb-8">
          <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 03 — Podcasts</div>
          <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Top podcasts.</h2>
          <p className="text-sm" style={{ color: 'var(--ink-mute)' }}>
            {totalPodcastHours.toFixed(1)} hours of podcast listening.
          </p>
        </div>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)', color: 'var(--ink-mute)' }}>
                <th className="px-4 py-3 font-medium w-8">#</th>
                <th className="px-4 py-3 font-medium">Show</th>
                <th className="px-4 py-3 font-medium text-right">Hours</th>
                <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Episodes</th>
              </tr>
            </thead>
            <tbody>
              {topPodcasts.map((podcast, index) => (
                <tr key={podcast.show} className="border-b last:border-0" style={{ borderColor: 'var(--hairline)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{podcast.show}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{podcast.hours}</td>
                  <td className="px-4 py-3 text-right tabular-nums hidden sm:table-cell">{podcast.episodes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
