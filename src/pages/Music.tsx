import PageSEO from '@/components/PageSEO'
import MusicStats from '@/components/music/MusicStats'
import YearChart from '@/components/music/YearChart'
import GenreChart from '@/components/music/GenreChart'
import ArtistCard from '@/components/music/ArtistCard'
import PodcastList from '@/components/music/PodcastList'
import { musicStats } from '@/data/musicStats'
import { trackClick } from '@/lib/analytics'
import { listeningYearsSpan } from '@/lib/utils'

export default function Music() {
  const { meta, overview, topArtists, topTracks, topGenres, byYear, topPodcasts } = musicStats
  const yearsSpan = listeningYearsSpan(meta.dateRange.first, meta.dateRange.last)

  return (
    <>
      <PageSEO
        title="Music Analytics"
        description="Nine years of Spotify listening history — top artists, genres, and listening patterns."
      />

      {/* Page Header */}
      <header className="pt-24 pb-12">
        <div className="container-main">
          <div className="t-eyebrow mb-2" style={{ color: 'var(--ink-faint)' }}>§ Music</div>
          <h1 className="text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.02] max-w-[18ch] mb-6">
            <b className="font-normal text-sp-teal">{yearsSpan.toFixed(1)} years</b> of listening.
          </h1>
          <p className="max-w-[56ch] text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
            <span className="font-medium text-sp-ink">{overview.totalMusicHours.toLocaleString()} hours</span> of music
            across {meta.totalPlayEvents.toLocaleString()} play events — {meta.dateRange.first} to {meta.dateRange.last}.
          </p>

          {/* Now Playing strip */}
          <a
            href="https://open.spotify.com/playlist/6VhtWdXzCPc0nZ5UkdW7al"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('Spethial Bangers 2026', 'https://open.spotify.com/playlist/6VhtWdXzCPc0nZ5UkdW7al', 'music_now_playing')}
            className="mt-8 p-5 rounded-[var(--r-lg)] grid grid-cols-[64px_1fr_auto] gap-4 items-center max-w-[640px] transition-opacity hover:opacity-85"
            style={{ border: '1px solid var(--border)', background: 'linear-gradient(90deg, rgba(100,255,218,0.06), transparent 60%)', color: 'inherit' }}
          >
            <div className="w-16 h-16 rounded-[var(--r-sm)] flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--teal), var(--blue))', color: '#07111c' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[var(--fs-micro)] tracking-[0.08em] uppercase text-sp-teal inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sp-teal animate-pulse" style={{ boxShadow: '0 0 6px var(--teal-glow)' }} />
                Now playing
              </div>
              <div className="text-lg font-medium tracking-[-0.02em] truncate">Spethial Bangers 2026</div>
              <div className="font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>Open on Spotify</div>
            </div>
            <div className="flex items-end gap-[3px] h-[22px]">
              {[40, 70, 50, 90, 60].map((h, i) => (
                <span key={i} className="w-[3px] rounded-sm bg-sp-teal" style={{ height: `${h}%`, animation: `barBounce ${0.8 + i * 0.15}s ease-in-out infinite alternate` }} />
              ))}
            </div>
          </a>
        </div>
      </header>

      {/* Stats */}
      <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <MusicStats overview={overview} />
        </div>
      </section>

      {/* Charts */}
      <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main space-y-8">
          <YearChart byYear={byYear} />
          <GenreChart topGenres={topGenres} />
        </div>
      </section>

      {/* Top Artists */}
      <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-2 mb-8">
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 01 — Artists</div>
            <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Top artists by play time.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topArtists.map((artist, index) => (
              <ArtistCard key={artist.name} artist={artist} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Tracks */}
      <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-2 mb-8">
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 02 — Tracks</div>
            <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Top tracks by play count.</h2>
          </div>
          <div className="card overflow-x-auto !p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left" style={{ borderColor: 'var(--border)', color: 'var(--ink-mute)' }}>
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
                    className="border-b last:border-0 transition-colors hover:bg-sp-bg-elev-2"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium line-clamp-1">{track.name}</div>
                      <div className="sm:hidden text-xs line-clamp-1" style={{ color: 'var(--ink-mute)' }}>{track.artist}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell line-clamp-1" style={{ color: 'var(--ink-mute)' }}>{track.artist}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{track.plays.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right tabular-nums hidden md:table-cell">{track.hours}</td>
                    <td className="px-4 py-3 text-right tabular-nums hidden lg:table-cell">{track.skipRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PodcastList topPodcasts={topPodcasts} totalPodcastHours={overview.totalPodcastHours} />

      {/* Data Sources */}
      <section className="py-12">
        <div className="container-main">
          <div className="card text-center max-w-2xl mx-auto">
            <div className="text-lg font-medium mb-3">Data Sources</div>
            <p className="text-sm" style={{ color: 'var(--ink-mute)' }}>
              All charts and rankings come from a personal <strong className="text-sp-ink">Spotify Extended Streaming History</strong> export ({meta.dateRange.first}–{meta.dateRange.last}). Artist genres use the{' '}
              <a href="https://developer.spotify.com/documentation/web-api" target="_blank" rel="noopener noreferrer" className="text-sp-teal hover:underline" onClick={() => trackClick('Spotify Web API', 'https://developer.spotify.com/documentation/web-api', 'music_footer')}>Spotify Web API</a>.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes barBounce {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </>
  )
}
