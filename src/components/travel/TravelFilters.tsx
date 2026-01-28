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

  const clearFilters = () => {
    onFiltersChange({})
  }

  const updateFilter = <K extends keyof TravelFiltersType>(
    key: K,
    value: TravelFiltersType[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-4">
      {/* Main filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-spethial-muted" />
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
          {/* Favorites toggle */}
          <button
            onClick={() => updateFilter('favoritesOnly', !filters.favoritesOnly)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
              ${filters.favoritesOnly
                ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400'
                : 'bg-white dark:bg-spethial-surface border-gray-200 dark:border-spethial-border text-gray-700 dark:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-border'
              }
            `}
          >
            <StarIconSolid className={`h-4 w-4 ${filters.favoritesOnly ? 'text-amber-500' : 'text-gray-400'}`} />
            <span className="hidden sm:inline">Favorites</span>
          </button>

          {/* More filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
              ${showFilters || hasActiveFilters
                ? 'bg-spethial-accent/10 border-spethial-accent text-spethial-accent'
                : 'bg-white dark:bg-spethial-surface border-gray-200 dark:border-spethial-border text-gray-700 dark:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-border'
              }
            `}
          >
            <FunnelIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* View mode and sort */}
        <div className="flex gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-gray-200 dark:border-spethial-border overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-spethial-accent text-white'
                  : 'bg-white dark:bg-spethial-surface text-gray-600 dark:text-spethial-muted hover:bg-gray-100 dark:hover:bg-spethial-border'
              }`}
              title="Grid view"
            >
              <GridIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className={`p-2 transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-spethial-accent text-white'
                  : 'bg-white dark:bg-spethial-surface text-gray-600 dark:text-spethial-muted hover:bg-gray-100 dark:hover:bg-spethial-border'
              }`}
              title="Timeline view"
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="input py-2 px-3 pr-8 appearance-none bg-no-repeat bg-right cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundSize: '1.5em 1.5em',
              backgroundPosition: 'right 0.5rem center',
            }}
          >
            <option value="rating">Highest Rated</option>
            <option value="favorites">Favorites First</option>
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
            {/* Country filter */}
            <div>
              <label className="label">Country</label>
              <select
                value={filters.country || ''}
                onChange={(e) => updateFilter('country', e.target.value || undefined)}
                className="input"
              >
                <option value="">All countries</option>
                {countries.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {getCountryFlag(code)} {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag filter */}
            <div>
              <label className="label">Tag</label>
              <select
                value={filters.tag || ''}
                onChange={(e) => updateFilter('tag', e.target.value || undefined)}
                className="input"
              >
                <option value="">All tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Min rating filter */}
            <div>
              <label className="label">Minimum Rating</label>
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

      {/* Results count and clear filters */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-spethial-muted">
          Showing {resultCount} {resultCount === 1 ? 'destination' : 'destinations'}
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-spethial-accent hover:text-spethial-accent-hover transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
