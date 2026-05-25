import { useState } from 'react'
import type { SortOption, TravelFilters as TravelFiltersType } from '@/data/travels'
import { getVisitedCountries, getAllTags } from '@/data/travels'
import { SearchIcon, XMarkIcon, GridIcon, ListIcon, StarIconSolid, FunnelIcon } from '@/components/Icons'
import { getCountryFlag } from '@/lib/utils'

interface TravelFiltersProps {
  filters: TravelFiltersType
  sortBy: SortOption
  viewMode: 'grid' | 'timeline'
  onFiltersChange: (filters: TravelFiltersType) => void
  onSortChange: (sort: SortOption) => void
  onViewModeChange: (mode: 'grid' | 'timeline') => void
  resultCount: number
}

export default function TravelFilters({
  filters,
  sortBy,
  viewMode,
  onFiltersChange,
  onSortChange,
  onViewModeChange,
  resultCount,
}: TravelFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const countries = getVisitedCountries()
  const tags = getAllTags()

  const hasActiveFilters = filters.country || filters.tag || filters.favoritesOnly || filters.searchQuery

  const clearFilters = () => onFiltersChange({})

  const updateFilter = <K extends keyof TravelFiltersType>(key: K, value: TravelFiltersType[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sp-ink-faint" />
          <input
            type="text"
            placeholder="Search cities, countries, notes..."
            value={filters.searchQuery || ''}
            onChange={(e) => updateFilter('searchQuery', e.target.value || undefined)}
            className="input pl-10"
          />
        </div>

        {/* Quick filters */}
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter('favoritesOnly', !filters.favoritesOnly)}
            className={`chip ${filters.favoritesOnly ? 'chip-active' : ''} !normal-case !tracking-normal !text-sm`}
            style={filters.favoritesOnly ? { borderColor: 'var(--amber)', color: 'var(--amber)', background: 'var(--amber-soft)' } : undefined}
          >
            <StarIconSolid className={`h-4 w-4 ${filters.favoritesOnly ? 'text-sp-amber' : ''}`} />
            <span className="hidden sm:inline">Favourites</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`chip ${showFilters || hasActiveFilters ? 'chip-active' : ''} !normal-case !tracking-normal !text-sm`}
          >
            <FunnelIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* View mode and sort */}
        <div className="flex gap-2">
          <div className="flex rounded-[var(--r-md)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <button
              onClick={() => onViewModeChange('grid')}
              className="p-2 transition-colors"
              style={{
                background: viewMode === 'grid' ? 'var(--teal)' : 'var(--bg-elev-1)',
                color: viewMode === 'grid' ? '#07111c' : 'var(--ink-mute)',
              }}
              title="Grid view"
            >
              <GridIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className="p-2 transition-colors"
              style={{
                background: viewMode === 'timeline' ? 'var(--teal)' : 'var(--bg-elev-1)',
                color: viewMode === 'timeline' ? '#07111c' : 'var(--ink-mute)',
              }}
              title="Timeline view"
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="input py-2 px-3 pr-8 appearance-none bg-no-repeat bg-right cursor-pointer !w-auto"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237a849e' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundSize: '1.5em 1.5em',
              backgroundPosition: 'right 0.5rem center',
            }}
          >
            <option value="rating">Highest Rated</option>
            <option value="favorites">Favourites First</option>
            <option value="date-newest">Most Recent</option>
            <option value="date-oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="card">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink-soft)' }}>Country</label>
              <select
                value={filters.country || ''}
                onChange={(e) => updateFilter('country', e.target.value || undefined)}
                className="input"
              >
                <option value="">All countries</option>
                {countries.map(({ code, name }) => (
                  <option key={code} value={code}>{getCountryFlag(code)} {name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink-soft)' }}>Tag</label>
              <select
                value={filters.tag || ''}
                onChange={(e) => updateFilter('tag', e.target.value || undefined)}
                className="input"
              >
                <option value="">All tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink-soft)' }}>Minimum Rating</label>
              <select
                value={filters.minRating || ''}
                onChange={(e) => updateFilter('minRating', e.target.value ? Number(e.target.value) : undefined)}
                className="input"
              >
                <option value="">Any rating</option>
                <option value="5">5 stars only</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: 'var(--ink-mute)' }}>
          Showing {resultCount} {resultCount === 1 ? 'destination' : 'destinations'}
        </span>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="inline-flex items-center gap-1 text-sp-teal hover:underline transition-colors">
            <XMarkIcon className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
