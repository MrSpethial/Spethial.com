import type { JapanPlace } from '@/data/japan-2026'
import { googleMapsUrl } from '@/data/japan-2026'
import { trackEvent } from '@/lib/analytics'

interface JapanLocationDrawerProps {
  place: JapanPlace | null
  onClose: () => void
}

const KIND_LABELS: Record<JapanPlace['kind'], string> = {
  route_stop: 'Route stop',
  wishlist: 'Wishlist',
  trail: 'Trail run',
  race: 'Race',
  transfer: 'Trail waypoint',
}

export default function JapanLocationDrawer({ place, onClose }: JapanLocationDrawerProps) {
  if (!place) return null

  const handleOpenMaps = () => {
    trackEvent('japan_open_google_maps', { place_id: place.id, place_name: place.name })
    window.open(googleMapsUrl(place), '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="rounded-[var(--r-lg)] overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-start justify-between gap-3 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase mb-1" style={{ color: 'var(--ink-mute)' }}>
            {KIND_LABELS[place.kind]} · {place.region}
          </div>
          <h3 className="font-japan-display text-lg font-medium">{place.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--r-sm)] hover:bg-sp-hairline transition-colors"
          aria-label="Close"
          style={{ color: 'var(--ink-mute)' }}
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        {place.description && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            {place.description}
          </p>
        )}

        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {place.tags.map((tag) => (
              <span key={tag} className="tag text-[10px]">{tag}</span>
            ))}
          </div>
        )}

        {place.links && place.links.length > 0 && (
          <ul className="space-y-1.5">
            {place.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sp-teal hover:underline"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={handleOpenMaps}
          className="btn btn-primary w-full text-sm"
        >
          Open in Google Maps
        </button>
      </div>
    </div>
  )
}
