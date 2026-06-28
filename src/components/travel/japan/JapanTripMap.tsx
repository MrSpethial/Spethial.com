import { useEffect, useMemo, useCallback, memo } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { JapanPlace, TripLeg } from '@/data/japan-2026'
import {
  routePolyline,
  kumanoPolyline,
  getPlacesForLayers,
  getLegBounds,
  PHASE_COLORS,
  type MapLayer,
} from '@/data/japan-2026'
import { trackEvent } from '@/lib/analytics'

const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

const JAPAN_BOUNDS: L.LatLngBoundsExpression = [
  [24.0, 122.0],
  [41.5, 146.0],
]

const ROUTE_BOUNDS: L.LatLngBoundsExpression = [
  [33.4, 135.2],
  [36.8, 137.0],
]

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function markerColor(place: JapanPlace): string {
  if (place.kind === 'trail') return '#a5c8ff'
  if (place.kind === 'race') return '#ffb088'
  if (place.kind === 'wishlist') return '#7a849e'
  if (place.phase) return PHASE_COLORS[place.phase]
  return '#64ffda'
}

function markerSize(place: JapanPlace): number {
  if (place.kind === 'wishlist') return 8
  if (place.kind === 'trail' || place.kind === 'race') return 10
  return place.kind === 'route_stop' ? 12 : 8
}

const iconCache = new Map<string, L.DivIcon>()

function createMarkerIcon(place: JapanPlace, selected: boolean): L.DivIcon {
  const cacheKey = `${place.id}:${selected}`
  const cached = iconCache.get(cacheKey)
  if (cached) return cached

  const size = markerSize(place)
  const color = markerColor(place)
  const kindClass = place.kind === 'wishlist' ? 'wishlist' : place.kind === 'trail' ? 'trail' : place.kind === 'race' ? 'race' : ''
  const safeName = escapeHtml(place.name)
  const pulseRing = place.pulse
    ? `<span class="japan-marker-pulse absolute inset-0 rounded-full" style="border:2px solid ${color}"></span>`
    : ''

  const icon = L.divIcon({
    className: '',
    iconSize: [size + 8, size + 8],
    iconAnchor: [(size + 8) / 2, (size + 8) / 2],
    html: `
      <div class="relative" style="width:${size + 8}px;height:${size + 8}px">
        ${pulseRing}
        <div
          class="japan-map-marker ${kindClass} ${selected ? 'selected' : ''}"
          style="width:${size}px;height:${size}px;background:${color};margin:4px"
          role="button"
          tabindex="0"
          aria-label="${safeName}"
        ></div>
      </div>
    `,
  })

  iconCache.set(cacheKey, icon)
  return icon
}

function flyToPlaceZoom(place: JapanPlace): number {
  if (place.kind === 'wishlist' && !place.onRoute) return 8
  if (place.kind === 'race') return 9
  return 11
}

interface MapControllerProps {
  selectedLeg: TripLeg | null
  selectedPlace: JapanPlace | null
  resetToken: number
}

function MapController({ selectedLeg, selectedPlace, resetToken }: MapControllerProps) {
  const map = useMap()

  useEffect(() => {
    if (selectedLeg) {
      const bounds = getLegBounds(selectedLeg)
      if (bounds) {
        map.flyToBounds(
          L.latLngBounds(
            [bounds[0].lat, bounds[0].lng],
            [bounds[1].lat, bounds[1].lng],
          ),
          { padding: [60, 60], duration: 1.2, maxZoom: 10 },
        )
      }
      return
    }
    if (selectedPlace) {
      const { lat, lng } = selectedPlace.coordinates
      map.flyTo([lat, lng], flyToPlaceZoom(selectedPlace), { duration: 1.2 })
      return
    }
    map.flyToBounds(ROUTE_BOUNDS, { padding: [40, 40], duration: 0.8 })
  }, [selectedLeg, selectedPlace, resetToken, map])

  return null
}

interface PlaceMarkerProps {
  place: JapanPlace
  selected: boolean
  onSelect: (place: JapanPlace) => void
}

const PlaceMarker = memo(function PlaceMarker({ place, selected, onSelect }: PlaceMarkerProps) {
  const icon = useMemo(() => createMarkerIcon(place, selected), [place, selected])

  const handleClick = useCallback(() => {
    trackEvent('japan_place_click', { place_id: place.id, place_name: place.name, kind: place.kind })
    onSelect(place)
  }, [place, onSelect])

  const eventHandlers = useMemo(
    () => ({ click: handleClick }),
    [handleClick],
  )

  return (
    <Marker
      position={[place.coordinates.lat, place.coordinates.lng]}
      icon={icon}
      eventHandlers={eventHandlers}
    />
  )
})

export interface JapanTripMapProps {
  layers: Record<MapLayer, boolean>
  selectedPlace: JapanPlace | null
  selectedLeg: TripLeg | null
  resetToken: number
  onPlaceSelect: (place: JapanPlace) => void
}

export default function JapanTripMap({
  layers,
  selectedPlace,
  selectedLeg,
  resetToken,
  onPlaceSelect,
}: JapanTripMapProps) {
  const visiblePlaces = useMemo(() => getPlacesForLayers(layers), [layers])

  const routeCoords = useMemo(
    () => routePolyline.map((c) => [c.lat, c.lng] as [number, number]),
    [],
  )
  const kumanoCoords = useMemo(
    () => kumanoPolyline.map((c) => [c.lat, c.lng] as [number, number]),
    [],
  )

  return (
    <div className="relative w-full h-full min-h-[320px] japan-map-grain rounded-[var(--r-lg)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <MapContainer
        center={[35.0, 136.2]}
        zoom={7}
        minZoom={5}
        maxZoom={14}
        maxBounds={JAPAN_BOUNDS}
        maxBoundsViscosity={0.8}
        className="w-full h-full"
        style={{ height: '100%', minHeight: 320 }}
        scrollWheelZoom
      >
        <TileLayer url={DARK_TILES} attribution={TILE_ATTRIBUTION} />
        <MapController
          selectedLeg={selectedLeg}
          selectedPlace={selectedPlace}
          resetToken={resetToken}
        />

        {layers.route && (
          <>
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: '#64ffda', weight: 2.5, opacity: 0.7 }}
            />
            <Polyline
              positions={kumanoCoords}
              pathOptions={{ color: '#b5651d', weight: 3, opacity: 0.85, dashArray: '8 6' }}
            />
          </>
        )}

        {visiblePlaces.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            selected={selectedPlace?.id === place.id}
            onSelect={onPlaceSelect}
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-2 right-2 z-[1000] pointer-events-none">
        <div
          className="backdrop-blur-sm rounded-[var(--r-sm)] px-2 py-1 text-[10px] font-mono"
          style={{ background: 'rgba(14,19,32,0.85)', color: 'var(--ink-mute)', border: '1px solid var(--border)' }}
        >
          {visiblePlaces.length} places shown
        </div>
      </div>
    </div>
  )
}
