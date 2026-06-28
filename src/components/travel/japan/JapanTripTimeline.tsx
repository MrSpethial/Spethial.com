import { tripLegs, PHASE_COLORS, TRIP_START, TRIP_END } from '@/data/japan-2026'
import type { TripLeg } from '@/data/japan-2026'
import { trackEvent } from '@/lib/analytics'

interface JapanTripTimelineProps {
  selectedLegId?: string | null
  onLegClick?: (leg: TripLeg) => void
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  return Math.round((e - s) / (24 * 60 * 60 * 1000)) + 1
}

const TOTAL_DAYS = daysBetween(TRIP_START, TRIP_END)

function legOffset(legStart: string): number {
  const tripStart = new Date(TRIP_START).getTime()
  const legStartMs = new Date(legStart).getTime()
  return ((legStartMs - tripStart) / (24 * 60 * 60 * 1000) / TOTAL_DAYS) * 100
}

export default function JapanTripTimeline({ selectedLegId, onLegClick }: JapanTripTimelineProps) {
  const axisDates = ['Nov 4', 'Nov 10', 'Nov 16', 'Nov 22', 'Nov 27']

  const handleClick = (leg: TripLeg) => {
    trackEvent('japan_timeline_day_click', { leg_id: leg.id, leg_label: leg.label })
    onLegClick?.(leg)
  }

  return (
    <div>
      <h2 className="text-sm font-mono tracking-[0.08em] uppercase mb-3" style={{ color: 'var(--ink-mute)' }}>
        Timeline (November 2026)
      </h2>
      <div className="space-y-1">
        {tripLegs.map((leg) => {
          const left = legOffset(leg.startDate)
          const width = (leg.days / TOTAL_DAYS) * 100
          const isSelected = selectedLegId === leg.id

          return (
            <button
              key={leg.id}
              type="button"
              onClick={() => handleClick(leg)}
              className={`flex items-center gap-2 w-full text-left rounded-[var(--r-sm)] transition-colors ${
                isSelected ? 'ring-1 ring-sp-teal' : 'hover:bg-sp-hairline'
              }`}
              style={{ padding: '2px 4px' }}
              aria-pressed={isSelected}
            >
              <div
                className="w-24 sm:w-28 flex-none text-xs font-semibold truncate"
                style={{ color: 'var(--ink-soft)' }}
              >
                {leg.label}
              </div>
              <div
                className="relative flex-1 h-6 rounded-[var(--r-sm)]"
                style={{ background: 'var(--bg-elev-2)' }}
              >
                <div
                  className="absolute top-0 h-6 rounded-[var(--r-sm)] flex items-center justify-center text-[10px] font-semibold text-white"
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(width, 3)}%`,
                    background: PHASE_COLORS[leg.phase],
                    boxShadow: isSelected ? '0 0 10px var(--teal-glow)' : undefined,
                  }}
                >
                  {leg.days > 1 ? `${leg.days}d` : leg.days === 1 ? '1d' : ''}
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <div
        className="flex justify-between mt-2 ml-24 sm:ml-28 pl-2 text-[10px] font-mono"
        style={{ color: 'var(--ink-faint)' }}
      >
        {axisDates.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  )
}
