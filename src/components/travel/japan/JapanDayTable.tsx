import { tripLegs } from '@/data/japan-2026'

export default function JapanDayTable() {
  return (
    <div>
      <h2 className="text-sm font-mono tracking-[0.08em] uppercase mb-3" style={{ color: 'var(--ink-mute)' }}>
        Day-by-day
      </h2>
      <div className="overflow-x-auto rounded-[var(--r-md)]" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--bg-elev-2)' }}>
              <th className="text-left p-2.5 font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--ink-mute)' }}>Dates</th>
              <th className="text-left p-2.5 font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--ink-mute)' }}>Base</th>
              <th className="text-center p-2.5 font-mono text-xs uppercase tracking-wide w-12" style={{ color: 'var(--ink-mute)' }}>Days</th>
              <th className="text-left p-2.5 font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--ink-mute)' }}>Highlights & walks</th>
              <th className="text-left p-2.5 font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--ink-mute)' }}>Run / race</th>
            </tr>
          </thead>
          <tbody>
            {tripLegs.map((leg) => (
              <tr key={leg.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="p-2.5 whitespace-nowrap text-xs font-mono" style={{ color: 'var(--ink-soft)' }}>
                  {leg.dateLabel}
                </td>
                <td className="p-2.5 font-medium">{leg.label}</td>
                <td className="p-2.5 text-center text-xs" style={{ color: 'var(--ink-mute)' }}>{leg.days}</td>
                <td className="p-2.5 text-xs leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{leg.highlights}</td>
                <td className="p-2.5 text-xs" style={{ color: 'var(--ink-mute)' }}>{leg.runNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
