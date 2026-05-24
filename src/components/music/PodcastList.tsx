import type { MusicStats } from '@/data/musicStats'

interface PodcastListProps {
  topPodcasts: MusicStats['topPodcasts']
  totalPodcastHours: number
}

export default function PodcastList({ topPodcasts, totalPodcastHours }: PodcastListProps) {
  const podcasts = [...topPodcasts]

  return (
    <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
      <div className="container-main">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-spethial-text mb-2">
          Top Podcasts
        </h2>
        <p className="text-sm text-gray-500 dark:text-spethial-muted mb-6">
          {totalPodcastHours.toFixed(1)} hours of podcast listening in the same export — a small
          slice next to the music stats above.
        </p>
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-spethial-border text-left text-gray-500 dark:text-spethial-muted">
                <th className="px-4 py-3 font-medium w-8">#</th>
                <th className="px-4 py-3 font-medium">Show</th>
                <th className="px-4 py-3 font-medium text-right">Hours</th>
                <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">
                  Episodes
                </th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((podcast, index) => (
                <tr
                  key={podcast.show}
                  className="border-b border-gray-100 dark:border-spethial-border/50 last:border-0"
                >
                  <td className="px-4 py-3 text-gray-400 dark:text-spethial-muted font-mono text-xs">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-spethial-text">
                    {podcast.show}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{podcast.hours}</td>
                  <td className="px-4 py-3 text-right tabular-nums hidden sm:table-cell">
                    {podcast.episodes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
