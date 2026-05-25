import { useState, useMemo } from 'react'
import SEO from '@/components/SEO'
import TravelCard from '@/components/travel/TravelCard'

import TravelFilters from '@/components/travel/TravelFilters'
import TravelTimeline from '@/components/travel/TravelTimeline'
import TravelMap from '@/components/travel/TravelMap'
import {
  getTravelStats,
  getAllTravels,
  filterTravels,
  sortTravels,
  type TravelFilters as TravelFiltersType,
  type SortOption,
} from '@/data/travels'
import { trackEvent } from '@/lib/analytics'

export default function Travels() {
  const [filters, setFilters] = useState<TravelFiltersType>({})
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid')

  const stats = getTravelStats()
  const allTravels = getAllTravels()

  const filteredTravels = useMemo(() => {
    const filtered = filterTravels(filters)
    return sortTravels(filtered, sortBy)
  }, [filters, sortBy])

  const handleFiltersChange = (newFilters: TravelFiltersType) => {
    setFilters(newFilters)
    if (Object.keys(newFilters).length > 0) {
      trackEvent('travel_filter', { filters: JSON.stringify(newFilters) })
    }
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
    trackEvent('travel_sort', { sort: newSort })
  }

  const handleViewModeChange = (mode: 'grid' | 'timeline') => {
    setViewMode(mode)
    trackEvent('travel_view_mode', { mode })
  }

  const handleCountryClick = (countryCode: string) => {
    if (filters.country === countryCode) {
      setFilters({ ...filters, country: undefined })
    } else {
      setFilters({ ...filters, country: countryCode })
    }
    trackEvent('travel_country_click', { country: countryCode })
  }

  return (
    <>
      <SEO
        title="Travels"
        description="Explore travel adventures around the world. Favourite destinations, recommendations, and memories."
      />

      {/* Page Header */}
      <header className="pt-24 pb-12">
        <div className="container-main">
          <div className="t-eyebrow mb-2" style={{ color: 'var(--ink-faint)' }}>§ Travels</div>
          <h1 className="text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.02] max-w-[18ch] mb-6">
            Places I've <b className="font-normal text-sp-teal">been.</b>
          </h1>
          <p className="max-w-[56ch] text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
            A collection of places I've visited, memories I've made, and recommendations from adventures around the world.
          </p>

          {/* Stat strip */}
          <div className="flex gap-8 mt-6 font-mono text-xs tracking-[0.08em] uppercase" style={{ color: 'var(--ink-mute)' }}>
            <span><span className="text-sp-teal font-medium">{stats.totalCountries}</span> countries</span>
            <span><span className="text-sp-teal font-medium">{stats.totalCities}</span> cities</span>
            <span><span className="text-sp-amber font-medium">{stats.favoriteCount}</span> favourites</span>
          </div>
        </div>
      </header>

      {/* Map */}
      <section className="pb-12">
        <div className="container-main">
          <TravelMap
            travels={allTravels}
            onCountryClick={handleCountryClick}
            highlightedCountry={filters.country}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-10 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="mb-8">
            <TravelFilters
              filters={filters}
              sortBy={sortBy}
              viewMode={viewMode}
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              onViewModeChange={handleViewModeChange}
              resultCount={filteredTravels.length}
            />
          </div>

          {filteredTravels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg mb-4" style={{ color: 'var(--ink-mute)' }}>No destinations match your filters.</p>
              <button onClick={() => setFilters({})} className="btn btn-primary">Clear all filters</button>
            </div>
          )}

          {viewMode === 'grid' && filteredTravels.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTravels.map((travel) => (
                <TravelCard key={travel.id} travel={travel} onCountryClick={handleCountryClick} />
              ))}
            </div>
          )}

          {viewMode === 'timeline' && filteredTravels.length > 0 && (
            <TravelTimeline travels={filteredTravels} onCountryClick={handleCountryClick} />
          )}
        </div>
      </section>
    </>
  )
}
