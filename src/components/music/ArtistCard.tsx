import type { MusicStats } from '@/data/musicStats'

type Artist = MusicStats['topArtists'][number]

interface ArtistCardProps {
  artist: Artist
  rank: number
}

export default function ArtistCard({ artist, rank }: ArtistCardProps) {
  return (
    <article className="card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono text-gray-400 dark:text-spethial-muted">
          #{rank}
        </span>
        <span className="text-xs text-gray-500 dark:text-spethial-muted tabular-nums">
          {artist.skipRate}% skip
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-spethial-text mb-2 line-clamp-2">
        {artist.name}
      </h3>
      <p className="text-2xl font-bold text-spethial-accent mb-3 tabular-nums">
        {artist.hours}
        <span className="text-sm font-normal text-gray-500 dark:text-spethial-muted ml-1">
          hrs
        </span>
      </p>
      <p className="text-xs text-gray-500 dark:text-spethial-muted mb-3">
        {artist.plays.toLocaleString()} plays · since {artist.firstListen}
      </p>
      {artist.genres.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {artist.genres.map((genre) => (
            <span
              key={genre}
              className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-spethial-border text-gray-700 dark:text-spethial-muted"
            >
              {genre}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
