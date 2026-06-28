import { routeFlowChips, PHASE_COLORS, type TripPhase } from '@/data/japan-2026'

export default function JapanRouteFlow() {
  return (
    <div>
      <h2 className="text-sm font-mono tracking-[0.08em] uppercase mb-3" style={{ color: 'var(--ink-mute)' }}>
        Route flow
      </h2>
      <div className="flex flex-wrap items-center gap-1.5">
        {routeFlowChips.map((chip, i) => (
          <span key={`${chip.label}-${i}`} className="inline-flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-xs font-bold" style={{ color: 'var(--ink-faint)' }}>→</span>
            )}
            <span
              className="inline-flex flex-col items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white leading-tight"
              style={{ background: PHASE_COLORS[chip.phase as TripPhase] }}
            >
              {chip.icon && <span className="text-[10px]">{chip.icon}</span>}
              <span>{chip.label}</span>
              {chip.days && (
                <small className="text-[10px] font-normal opacity-90">{chip.days}</small>
              )}
            </span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: 'var(--ink-mute)' }}>
        {(['a', 'b', 'c'] as TripPhase[]).map((phase) => (
          <span key={phase} className="inline-flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: PHASE_COLORS[phase] }}
            />
            {phase === 'a' ? 'Chūbu' : phase === 'b' ? 'Wakayama / Kumano' : 'Kansai'}
          </span>
        ))}
      </div>
    </div>
  )
}
