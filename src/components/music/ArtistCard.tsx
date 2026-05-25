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
        <span className="text-xs font-mono" style={{ color: 'var(--ink-faint)' }}>#{rank}</span>
        <span className="text-xs tabular-nums" style={{ color: 'var(--ink-mute)' }}>{artist.skipRate}% skip</span>
      </div>
      <h3 className="font-medium mb-2 line-clamp-2">{artist.name}</h3>
      <p className="text-2xl font-medium text-sp-teal mb-3 tabular-nums">
        {artist.hours}
        <span className="text-sm font-normal ml-1" style={{ color: 'var(--ink-mute)' }}>hrs</span>
      </p>
      <p className="text-xs mb-3" style={{ color: 'var(--ink-mute)' }}>
        {artist.plays.toLocaleString()} plays · since {artist.firstListen}
      </p>
      {artist.genres.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {artist.genres.map((genre) => (
            <span key={genre} className="tag text-[10px]">{genre}</span>
          ))}
        </div>
      )}
    </article>
  )
}
