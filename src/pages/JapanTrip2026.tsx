import { lazy, Suspense, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PageSEO from '@/components/PageSEO'
import JapanMapLayers from '@/components/travel/japan/JapanMapLayers'
import JapanLocationDrawer from '@/components/travel/japan/JapanLocationDrawer'
import JapanRouteFlow from '@/components/travel/japan/JapanRouteFlow'
import JapanTripTimeline from '@/components/travel/japan/JapanTripTimeline'
import JapanDayTable from '@/components/travel/japan/JapanDayTable'
import JapanTripNotes from '@/components/travel/japan/JapanTripNotes'
import {
  DEFAULT_LAYERS,
  TRIP_TITLE,
  TRIP_SUBTITLE,
  getPlaceById,
  getLayerForPlaceKind,
  type JapanPlace,
  type TripLeg,
  type MapLayer,
} from '@/data/japan-2026'
import '@/styles/japan-trip.css'
import 'leaflet/dist/leaflet.css'
import '@/styles/leaflet-overrides.css'

const JapanTripMap = lazy(() => import('@/components/travel/japan/JapanTripMap'))

type TabId = 'plan' | 'notes' | 'map'

function MapSkeleton() {
  return (
    <div
      className="w-full min-h-[320px] lg:min-h-[480px] rounded-[var(--r-lg)] animate-pulse"
      style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--border)' }}
    />
  )
}

export default function JapanTrip2026() {
  const [activeTab, setActiveTab] = useState<TabId>('map')
  const [layers, setLayers] = useState<Record<MapLayer, boolean>>(DEFAULT_LAYERS)
  const [selectedPlace, setSelectedPlace] = useState<JapanPlace | null>(null)
  const [selectedLeg, setSelectedLeg] = useState<TripLeg | null>(null)
  const [resetToken, setResetToken] = useState(0)

  const handlePlaceSelect = useCallback((place: JapanPlace) => {
    setSelectedPlace(place)
    setSelectedLeg(null)
  }, [])

  const handleLegClick = useCallback((leg: TripLeg) => {
    setSelectedLeg((prev) => (prev?.id === leg.id ? null : leg))
    setSelectedPlace(null)
  }, [])

  const handleNotesPlaceClick = useCallback((placeId: string) => {
    const place = getPlaceById(placeId)
    if (place) {
      setSelectedLeg(null)
      setSelectedPlace(place)
      setActiveTab('map')
      const layer = getLayerForPlaceKind(place.kind)
      setLayers((prev) => ({ ...prev, [layer]: true }))
    }
  }, [])

  const handleResetView = () => {
    setSelectedLeg(null)
    setResetToken((t) => t + 1)
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: 'map', label: 'Map' },
    { id: 'plan', label: 'Plan' },
    { id: 'notes', label: 'Notes' },
  ]

  return (
    <>
      <PageSEO
        title="Japan 2026 Itinerary"
        description="Interactive map and itinerary for a 24-day November 2026 walking trip through Japan — Kanazawa, Kiso Valley, Kumano Kodo, Kyoto and Nara."
      />

      <header className="pt-24 pb-8 japan-reveal">
        <div className="container-main">
          <Link
            to="/travels/japan"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-sp-teal"
            style={{ color: 'var(--ink-mute)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Japan
          </Link>
          <div className="t-eyebrow mb-2" style={{ color: 'var(--ink-faint)' }}>§ Travels · Japan 2026</div>
          <h1 className="font-japan-display text-[clamp(32px,4vw,52px)] font-medium tracking-[-0.02em] leading-[1.08] max-w-[22ch] mb-4">
            {TRIP_TITLE.replace(' — Itinerary & Map', '')}
            <span className="text-sp-amber"> 🍁</span>
          </h1>
          <p className="max-w-[56ch] text-base leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            {TRIP_SUBTITLE}
          </p>
          <div
            className="mt-4 inline-block rounded-[var(--r-md)] px-4 py-2.5 text-sm font-medium"
            style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--border)' }}
          >
            Route: Fly into <strong>Osaka (KIX)</strong> → Kanazawa → Kiso Valley → Koyasan →{' '}
            <strong>Kumano Kodo</strong> → Kyoto → Nara → out of Osaka
          </div>
        </div>
      </header>

      <section className="pb-16">
        <div className="container-main">
          {/* Tab bar */}
          <div
            className="flex gap-1 mb-6 border-b japan-reveal japan-reveal-delay-1"
            style={{ borderColor: 'var(--border)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-sp-teal border-sp-teal'
                    : 'border-transparent hover:text-sp-ink'
                }`}
                style={{ color: activeTab === tab.id ? undefined : 'var(--ink-mute)' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Map tab — split layout */}
          {activeTab === 'map' && (
            <div className="grid lg:grid-cols-[1fr_340px] gap-6 japan-reveal japan-reveal-delay-2">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <JapanMapLayers layers={layers} onChange={setLayers} />
                  <button
                    type="button"
                    onClick={handleResetView}
                    className="text-xs font-mono uppercase tracking-wide hover:text-sp-teal transition-colors"
                    style={{ color: 'var(--ink-mute)' }}
                  >
                    Reset view
                  </button>
                </div>
                <div className="h-[320px] lg:h-[520px]">
                  <Suspense fallback={<MapSkeleton />}>
                    <JapanTripMap
                      layers={layers}
                      selectedPlace={selectedPlace}
                      selectedLeg={selectedLeg}
                      resetToken={resetToken}
                      onPlaceSelect={handlePlaceSelect}
                    />
                  </Suspense>
                </div>
              </div>
              <div className="space-y-4">
                <JapanLocationDrawer
                  place={selectedPlace}
                  onClose={() => setSelectedPlace(null)}
                />
                {!selectedPlace && (
                  <div
                    className="rounded-[var(--r-lg)] p-4 text-sm"
                    style={{ background: 'var(--bg-elev-1)', border: '1px solid var(--border)', color: 'var(--ink-mute)' }}
                  >
                    Click a pin to see details, or select a leg on the timeline below.
                  </div>
                )}
                <JapanTripTimeline
                  selectedLegId={selectedLeg?.id}
                  onLegClick={handleLegClick}
                />
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="max-w-4xl space-y-8 japan-reveal japan-reveal-delay-2">
              <JapanRouteFlow />
              <JapanTripTimeline selectedLegId={selectedLeg?.id} onLegClick={handleLegClick} />
              <JapanDayTable />
              <div
                className="rounded-[var(--r-md)] p-4 text-sm leading-relaxed"
                style={{ background: 'var(--teal-soft)', borderLeft: '4px solid var(--teal)' }}
              >
                <strong>Foliage logic:</strong> central/mountains peak early–mid Nov; Kyoto &amp; Nara gardens peak the last week — this order chases the colour.{' '}
                <strong>Races:</strong> Ishikawa races near Kanazawa are Nov 1 &amp; Nov 26–28.
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="max-w-3xl japan-reveal japan-reveal-delay-2">
              <JapanTripNotes onPlaceClick={handleNotesPlaceClick} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
