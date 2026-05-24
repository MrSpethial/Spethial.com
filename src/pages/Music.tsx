import SEO from '@/components/SEO'
import MusicStats from '@/components/music/MusicStats'
import YearChart from '@/components/music/YearChart'
import GenreChart from '@/components/music/GenreChart'
import ArtistCard from '@/components/music/ArtistCard'
import PodcastList from '@/components/music/PodcastList'
import { musicStats } from '@/data/musicStats'
import { trackEvent, trackClick } from '@/lib/analytics'
import { formatYearMonth, listeningYearsSpan } from '@/lib/utils'

export default function Music() {
  const { meta, overview, topArtists, topTracks, topGenres, byYear, topPodcasts } = musicStats

  const yearsSpan = listeningYearsSpan(meta.dateRange.first, meta.dateRange.last)
  const busiestMonthLabel = formatYearMonth(overview.busiestMonth.label)

  return (
    <>
      <SEO
        title="Music Analytics"
        description="Nine years of Spotify listening history — top artists, genres, and listening patterns from a personal extended streaming export."
        canonical="https://spethial.com/music"
      />

      {/* Hero */}
      <section className="py-12 sm:py-16 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main text-center">
          <p className="text-sm font-medium text-spethial-accent mb-3">
            Personal streaming analytics
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-spethial-text mb-4">
            {yearsSpan.toFixed(1)} Years of Listening
          </h1>
          <p className="text-lg text-gray-600 dark:text-spethial-muted max-w-2xl mx-auto mb-6">
            <span className="font-semibold text-gray-900 dark:text-spethial-text">
              {overview.totalMusicHours.toLocaleString()} hours
            </span>{' '}
            of music across {meta.totalPlayEvents.toLocaleString()} play events —{' '}
            {meta.dateRange.first} to {meta.dateRange.last}.
          </p>
          <p className="text-sm text-gray-500 dark:text-spethial-muted">
            Busiest month: {busiestMonthLabel} ({overview.busiestMonth.hours} hrs)
            · Data generated {meta.generatedAt}
          </p>
        </div>
      </section>

      {/* Overview stats */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main">
          <MusicStats overview={overview} />
        </div>
      </section>

      {/* Charts */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main space-y-8">
          <YearChart byYear={byYear} />
          <GenreChart topGenres={topGenres} />
        </div>
      </section>

      {/* Top artists */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-spethial-text mb-6">
            Top Artists by Play Time
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topArtists.map((artist, index) => (
              <ArtistCard key={artist.name} artist={artist} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Top tracks */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-spethial-text mb-6">
            Top Tracks by Play Count
          </h2>
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-spethial-border text-left text-gray-500 dark:text-spethial-muted">
                  <th className="px-4 py-3 font-medium w-8">#</th>
                  <th className="px-4 py-3 font-medium">Track</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Artist</th>
                  <th className="px-4 py-3 font-medium text-right">Plays</th>
                  <th className="px-4 py-3 font-medium text-right hidden md:table-cell">Hours</th>
                  <th className="px-4 py-3 font-medium text-right hidden lg:table-cell">Skip</th>
                </tr>
              </thead>
              <tbody>
                {topTracks.map((track, index) => (
                  <tr
                    key={`${track.name}-${track.artist}`}
                    className="border-b border-gray-100 dark:border-spethial-border/50 last:border-0 hover:bg-gray-50 dark:hover:bg-spethial-surface/50"
                  >
                    <td className="px-4 py-3 text-gray-400 dark:text-spethial-muted font-mono text-xs">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-spethial-text line-clamp-1">
                        {track.name}
                      </div>
                      <div className="sm:hidden text-xs text-gray-500 dark:text-spethial-muted line-clamp-1">
                        {track.artist}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600 dark:text-spethial-muted line-clamp-1">
                      {track.artist}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{track.plays.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right tabular-nums hidden md:table-cell">
                      {track.hours}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums hidden lg:table-cell">
                      {track.skipRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PodcastList
        topPodcasts={topPodcasts}
        totalPodcastHours={overview.totalPodcastHours}
      />

      {/* Powered by / backlink */}
      <section className="py-10 sm:py-14">
        <div className="container-main">
          <div className="card text-center max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-3">
              Data Sources
            </h2>
            <p className="text-sm text-gray-600 dark:text-spethial-muted">
              All charts and rankings come from a personal{' '}
              <strong>Spotify Extended Streaming History</strong> export (
              {meta.dateRange.first}–{meta.dateRange.last}). Artist <strong>genres</strong> use the{' '}
              <a
                href="https://developer.spotify.com/documentation/web-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spethial-accent hover:text-spethial-accent-hover underline font-medium"
                onClick={() =>
                  trackClick('Spotify Web API', 'https://developer.spotify.com/documentation/web-api', 'music_footer')
                }
              >
                Spotify Web API
              </a>
              . <strong>BPM</strong> (where shown) comes from{' '}
              <a
                href="https://musicbrainz.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spethial-accent hover:underline"
              >
                MusicBrainz
              </a>{' '}
              +{' '}
              <a
                href="https://acousticbrainz.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spethial-accent hover:underline"
              >
                AcousticBrainz
              </a>{' '}
              — partial coverage, not every track is in the database.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
