import { Link } from 'react-router-dom'
import PageSEO from '@/components/PageSEO'
import TravelCard from '@/components/travel/TravelCard'
import { getTravelsByCountry } from '@/data/travels'
import { TRIP_SUBTITLE } from '@/data/japan-2026'
import { getCountryFlag, formatDateRange } from '@/lib/utils'
import '@/styles/japan-trip.css'

export default function JapanHub() {
  const japanTrips = getTravelsByCountry('JP')
  const pastTrips = japanTrips.filter((t) => t.status !== 'planned')
  const plannedTrips = japanTrips.filter((t) => t.status === 'planned')

  return (
    <>
      <PageSEO
        title="Japan Travels"
        description="Past and upcoming trips to Japan — Tokyo 2024 and a planned November 2026 walking itinerary."
      />

      <header className="pt-24 pb-12 japan-reveal">
        <div className="container-main">
          <Link
            to="/travels"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-sp-teal"
            style={{ color: 'var(--ink-mute)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All travels
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{getCountryFlag('JP')}</span>
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ Travels · Japan</div>
          </div>
          <h1 className="font-japan-display text-[clamp(36px,5vw,56px)] font-medium tracking-[-0.03em] leading-[1.05] max-w-[16ch] mb-4">
            Land of the rising <span className="text-sp-teal">sun.</span>
          </h1>
          <p className="max-w-[50ch] text-lg leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            Cherry blossoms, temple trails, and a November 2026 pilgrimage in the making.
          </p>
        </div>
      </header>

      <section className="pb-16">
        <div className="container-main space-y-12">
          {plannedTrips.length > 0 && (
            <div className="japan-reveal japan-reveal-delay-1">
              <h2 className="text-sm font-mono tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--ink-mute)' }}>
                Upcoming
              </h2>
              {plannedTrips.map((trip) => (
                <Link
                  key={trip.id}
                  to={trip.tripSlug ?? '/travels/japan/2026'}
                  className="group block card overflow-hidden hover:border-sp-teal/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="tag tag-amber text-[10px] mb-3 inline-block">IN PLANNING</span>
                      <h3 className="font-japan-display text-2xl font-medium mb-2 group-hover:text-sp-teal transition-colors">
                        Japan 2026 — Walking Trip
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--ink-soft)' }}>{TRIP_SUBTITLE}</p>
                      <time className="text-xs font-mono" style={{ color: 'var(--ink-mute)' }}>
                        {formatDateRange(trip.visitDate.start, trip.visitDate.end)}
                      </time>
                    </div>
                    <div
                      className="flex-none px-4 py-2 rounded-[var(--r-md)] text-sm font-medium text-[#07111c] bg-sp-teal group-hover:shadow-[var(--glow-teal)] transition-shadow"
                    >
                      View itinerary & map →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pastTrips.length > 0 && (
            <div className="japan-reveal japan-reveal-delay-2">
              <h2 className="text-sm font-mono tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--ink-mute)' }}>
                Past visits
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastTrips.map((travel) => (
                  <TravelCard key={travel.id} travel={travel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
