import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import type { TravelLocation } from '@/data/travels'
import { getCountryFlag } from '@/lib/utils'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface TravelMapProps {
  travels: TravelLocation[]
  onLocationClick?: (travel: TravelLocation) => void
  onCountryClick?: (countryCode: string) => void
  highlightedCountry?: string
  highlightedLocationId?: string
  /** Country codes that navigate to a hub page instead of filtering */
  hubCountries?: string[]
}

const HUB_COUNTRY_ROUTES: Record<string, string> = {
  JP: '/travels/japan',
}

function TravelMap({
  travels,
  onLocationClick,
  onCountryClick,
  highlightedCountry,
  hubCountries = Object.keys(HUB_COUNTRY_ROUTES),
}: TravelMapProps) {
  const navigate = useNavigate()
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [tooltipContent, setTooltipContent] = useState<TravelLocation | null>(null)

  const travelsWithCoords = travels.filter(t => t.coordinates)
  const uniqueCountries = Array.from(
    new Map(travels.map(t => [t.countryCode, { code: t.countryCode, name: t.country }])).values()
  )
  const visitedCountryCodes = new Set(travels.map(t => t.countryCode))

  const handleCountryAction = (countryCode: string) => {
    const hubRoute = HUB_COUNTRY_ROUTES[countryCode]
    if (hubCountries.includes(countryCode) && hubRoute) {
      navigate(hubRoute)
      return
    }
    onCountryClick?.(countryCode)
  }

  return (
    <div className="relative w-full aspect-[2/1] rounded-[var(--r-lg)] overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--bg-elev-1)' }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160, center: [0, 0] }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = geo.properties.ISO_A2
                const isVisited = visitedCountryCodes.has(countryCode)
                const isHighlighted = highlightedCountry === countryCode

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isVisited) handleCountryAction(countryCode)
                    }}
                    style={{
                      default: {
                        fill: isHighlighted
                          ? 'rgba(100,255,218,0.35)'
                          : isVisited
                            ? 'rgba(100,255,218,0.15)'
                            : 'rgba(100,255,218,0.03)',
                        stroke: isHighlighted
                          ? '#64ffda'
                          : isVisited
                            ? 'rgba(100,255,218,0.25)'
                            : 'var(--border)',
                        strokeWidth: isHighlighted ? 1.5 : 0.5,
                        outline: 'none',
                        cursor: isVisited ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                      },
                      hover: {
                        fill: isHighlighted
                          ? 'rgba(100,255,218,0.45)'
                          : isVisited
                            ? 'rgba(100,255,218,0.25)'
                            : 'rgba(100,255,218,0.06)',
                        stroke: isHighlighted
                          ? '#64ffda'
                          : isVisited
                            ? 'rgba(100,255,218,0.4)'
                            : 'var(--border-strong)',
                        strokeWidth: isVisited ? 1 : 0.5,
                        outline: 'none',
                        cursor: isVisited ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: isVisited ? 'rgba(100,255,218,0.35)' : 'rgba(100,255,218,0.03)',
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {travelsWithCoords.map((travel) => {
            const isHovered = hoveredLocation === travel.id
            const isHighlightedByCountry = highlightedCountry === travel.countryCode
            const isPlanned = travel.status === 'planned'
            const markerFill = isPlanned || travel.isFavorite ? '#ffb088' : '#64ffda'

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
                  if (!onLocationClick) handleCountryAction(travel.countryCode)
                }}
              >
                <circle
                  r={isHovered || isHighlightedByCountry ? 6 : 4}
                  fill={markerFill}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth={2}
                  strokeDasharray={isPlanned ? '3 2' : undefined}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: isHovered ? 'drop-shadow(0 0 6px rgba(100,255,218,0.6))' : 'none',
                  }}
                />
                {(travel.isFavorite || isPlanned) && (
                  <circle
                    r={8}
                    fill="none"
                    stroke="#ffb088"
                    strokeWidth={1}
                    opacity={0.5}
                    className={isPlanned ? 'animate-pulse' : 'animate-ping'}
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
          <div className="rounded-[var(--r-md)] shadow-lg px-3 py-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getCountryFlag(tooltipContent.countryCode)}</span>
              <div>
                <div className="font-medium text-sm">{tooltipContent.city}</div>
                <div className="text-xs" style={{ color: 'var(--ink-mute)' }}>
                  {tooltipContent.country}
                  {tooltipContent.status === 'planned' && ' · Planned'}
                  {tooltipContent.isFavorite && tooltipContent.status !== 'planned' && ' · Favourite'}
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
              onClick={() => handleCountryAction(code)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                highlightedCountry === code
                  ? 'bg-sp-teal text-[#07111c] scale-105'
                  : 'text-sp-ink-soft hover:text-sp-ink'
              }`}
              style={{
                background: highlightedCountry === code ? undefined : 'rgba(14,19,32,0.85)',
                border: '1px solid var(--border)',
              }}
              title={`Filter by ${name}`}
            >
              <span>{getCountryFlag(code)}</span>
              <span className="hidden sm:inline">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-3 right-3 z-20">
        <div className="backdrop-blur-sm rounded-[var(--r-md)] px-2 py-1 text-xs font-mono" style={{ background: 'rgba(14,19,32,0.85)', color: 'var(--ink-mute)', border: '1px solid var(--border)' }}>
          Click markers or countries to explore
        </div>
      </div>
    </div>
  )
}

export default memo(TravelMap)
