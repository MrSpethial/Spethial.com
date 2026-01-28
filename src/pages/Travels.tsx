import { useState, useMemo } from 'react'
import SEO from '@/components/SEO'
import TravelCard from '@/components/travel/TravelCard'
import TravelStats from '@/components/travel/TravelStats'
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

  // Filter and sort travels
  const filteredTravels = useMemo(() => {
    const filtered = filterTravels(filters)
    return sortTravels(filtered, sortBy)
  }, [filters, sortBy])

  // Handlers
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
      // If already filtered by this country, clear the filter
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
        description="Explore my travel adventures around the world. Discover favorite destinations, recommendations, and travel memories."
      />

      {/* Hero Section with Map */}
      <section className="py-12 sm:py-16 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-spethial-text mb-4">
              My Travels
            </h1>
            <p className="text-lg text-gray-600 dark:text-spethial-muted max-w-2xl mx-auto">
              A collection of places I've been, memories I've made, and recommendations from my adventures around the world.
            </p>
          </div>

          {/* Interactive Map */}
          <TravelMap
            travels={allTravels}
            onCountryClick={handleCountryClick}
            highlightedCountry={filters.country}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 border-b border-gray-200 dark:border-spethial-border">
        <div className="container-main">
          <TravelStats stats={stats} />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 sm:py-12">
        <div className="container-main">
          {/* Filters */}
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

          {/* Empty State */}
          {filteredTravels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 dark:text-spethial-muted mb-4">
                No destinations match your filters.
              </p>
              <button
                onClick={() => setFilters({})}
                className="btn-primary"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && filteredTravels.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTravels.map((travel) => (
                <TravelCard
                  key={travel.id}
                  travel={travel}
                  onCountryClick={handleCountryClick}
                />
              ))}
            </div>
          )}

          {/* Timeline View */}
          {viewMode === 'timeline' && filteredTravels.length > 0 && (
            <TravelTimeline
              travels={filteredTravels}
              onCountryClick={handleCountryClick}
            />
          )}
        </div>
      </section>
    </>
  )
}
