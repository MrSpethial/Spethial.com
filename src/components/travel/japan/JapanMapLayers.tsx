import type { MapLayer } from '@/data/japan-2026'
import { trackEvent } from '@/lib/analytics'

interface JapanMapLayersProps {
  layers: Record<MapLayer, boolean>
  onChange: (layers: Record<MapLayer, boolean>) => void
}

const LAYER_CONFIG: { key: MapLayer; label: string; color: string }[] = [
  { key: 'route', label: 'Route', color: 'var(--teal)' },
  { key: 'wishlist', label: 'Wishlist', color: 'var(--ink-mute)' },
  { key: 'trails', label: 'Trails', color: 'var(--blue)' },
  { key: 'races', label: 'Races', color: 'var(--amber)' },
]

export default function JapanMapLayers({ layers, onChange }: JapanMapLayersProps) {
  const toggle = (key: MapLayer) => {
    const next = { ...layers, [key]: !layers[key] }
    onChange(next)
    trackEvent('japan_map_layer_toggle', { layer: key, enabled: next[key] })
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Map layers"
    >
      {LAYER_CONFIG.map(({ key, label, color }) => (
        <button
          key={key}
          type="button"
          onClick={() => toggle(key)}
          aria-pressed={layers[key]}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono tracking-wide uppercase transition-all duration-200 ${
            layers[key]
              ? 'text-[#07111c] scale-105'
              : 'hover:text-sp-teal'
          }`}
          style={{
            background: layers[key] ? color : 'rgba(14,19,32,0.85)',
            border: `1px solid ${layers[key] ? color : 'var(--border)'}`,
            color: layers[key] && key === 'wishlist' ? 'var(--ink)' : undefined,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
          {label}
        </button>
      ))}
    </div>
  )
}
