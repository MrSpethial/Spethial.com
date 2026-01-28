import { useState, memo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import type { TravelLocation } from '@/data/travels'
import { getCountryFlag } from '@/lib/utils'

// World topology data from Natural Earth via unpkg CDN
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface TravelMapProps {
  travels: TravelLocation[]
  onLocationClick?: (travel: TravelLocation) => void
  onCountryClick?: (countryCode: string) => void
  highlightedCountry?: string
  highlightedLocationId?: string
}

/**
 * TravelMap Component using react-simple-maps
 *
 * Displays an interactive world map with proper country shapes
 * and markers positioned at exact coordinates.
 */
function TravelMap({
  travels,
  onLocationClick,
  onCountryClick,
  highlightedCountry,
}: TravelMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [tooltipContent, setTooltipContent] = useState<TravelLocation | null>(null)

  // Filter travels that have coordinates
  const travelsWithCoords = travels.filter(t => t.coordinates)

  // Get unique countries for the legend
  const uniqueCountries = Array.from(
    new Map(travels.map(t => [t.countryCode, { code: t.countryCode, name: t.country }])).values()
  )

  // Get visited country codes for highlighting
  const visitedCountryCodes = new Set(travels.map(t => t.countryCode))

  return (
    <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-gray-200 dark:border-spethial-border bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 160,
          center: [0, 0],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          {/* Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Check if this country is visited (using ISO_A2 code)
                const countryCode = geo.properties.ISO_A2
                const isVisited = visitedCountryCodes.has(countryCode)
                const isHighlighted = highlightedCountry === countryCode

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isVisited && onCountryClick) {
                        onCountryClick(countryCode)
                      }
                    }}
                    style={{
                      default: {
                        fill: isHighlighted
                          ? '#0ea5e9'
                          : isVisited
                            ? '#86efac'
                            : '#e2e8f0',
                        stroke: isHighlighted
                          ? '#0369a1'
                          : isVisited
                            ? '#166534'
                            : '#cbd5e1',
                        strokeWidth: isHighlighted ? 1.5 : 0.5,
                        outline: 'none',
                        cursor: isVisited ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                      },
                      hover: {
                        fill: isHighlighted
                          ? '#38bdf8'
                          : isVisited
                            ? '#4ade80'
                            : '#f1f5f9',
                        stroke: isHighlighted
                          ? '#0369a1'
                          : isVisited
                            ? '#166534'
                            : '#94a3b8',
                        strokeWidth: isVisited ? 1 : 0.5,
                        outline: 'none',
                        cursor: isVisited ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: isVisited ? '#22c55e' : '#e2e8f0',
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* City Markers */}
          {travelsWithCoords.map((travel) => {
            const isHovered = hoveredLocation === travel.id
            const isHighlightedByCountry = highlightedCountry === travel.countryCode

            return (
              <Marker
                key={travel.id}
                coordinates={[travel.coordinates!.lng, travel.coordinates!.lat]}
                onMouseEnter={() => {
                  setHoveredLocation(travel.id)
                  setTooltipContent(travel)
                }}
                onMouseLeave={() => {
                  setHoveredLocation(null)
                  setTooltipContent(null)
                }}
                onClick={() => {
                  onLocationClick?.(travel)
                  onCountryClick?.(travel.countryCode)
                }}
              >
                {/* Marker circle */}
                <circle
                  r={isHovered || isHighlightedByCountry ? 6 : 4}
                  fill={travel.isFavorite ? '#f59e0b' : '#ef4444'}
                  stroke="#fff"
                  strokeWidth={2}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
                  }}
                />
                {/* Pulse animation for favorites */}
                {travel.isFavorite && (
                  <circle
                    r={8}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={1}
                    opacity={0.5}
                    className="animate-ping"
                  />
                )}
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-3 left-3 z-30 pointer-events-none">
          <div className="bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg shadow-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCountryFlag(tooltipContent.countryCode)}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-spethial-text text-sm">
                  {tooltipContent.city}
                </div>
                <div className="text-xs text-gray-500 dark:text-spethial-muted">
                  {tooltipContent.country}
                  {tooltipContent.isFavorite && ' • Favorite'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Country Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {uniqueCountries.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => onCountryClick?.(code)}
              className={`
                inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium
                transition-all duration-200
                ${highlightedCountry === code
                  ? 'bg-spethial-accent text-white scale-105'
                  : 'bg-white/90 dark:bg-spethial-surface/90 text-gray-700 dark:text-spethial-text hover:bg-white dark:hover:bg-spethial-surface'
                }
                backdrop-blur-sm border border-gray-200/50 dark:border-spethial-border/50
              `}
              title={`Filter by ${name}`}
            >
              <span>{getCountryFlag(code)}</span>
              <span className="hidden sm:inline">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions hint */}
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-white/80 dark:bg-spethial-surface/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-gray-500 dark:text-spethial-muted border border-gray-200/50 dark:border-spethial-border/50">
          Click markers or countries to filter
        </div>
      </div>
    </div>
  )
}

// Memo to prevent unnecessary re-renders when parent state changes
export default memo(TravelMap)
