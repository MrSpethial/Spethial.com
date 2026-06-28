import {
  tripOverview,
  wishlistRegions,
  tripTrails,
  tripRaces,
  kumanoLodging,
  logisticsItems,
} from '@/data/japan-2026'

interface JapanTripNotesProps {
  onPlaceClick?: (placeId: string) => void
}

export default function JapanTripNotes({ onPlaceClick }: JapanTripNotesProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-japan-display text-xl font-medium mb-3">Overview</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{tripOverview}</p>
      </section>

      <div
        className="rounded-[var(--r-md)] p-4 text-sm leading-relaxed"
        style={{ background: 'var(--amber-soft)', borderLeft: '4px solid var(--amber)' }}
      >
        <strong>Doesn&apos;t work in November:</strong> Kawachi Wisteria (Apr–May only) · Hitachi Seaside Park (flowers peak spring/mid-Oct) · Kamikōchi (closes ~mid-Nov for winter — only if very early in the trip). Yakushima works year-round but is wet.
      </div>

      <section>
        <h2 className="font-japan-display text-xl font-medium mb-4">Destinations by region</h2>
        <div className="space-y-6">
          {wishlistRegions.map((region) => (
            <div key={region.id}>
              <h3 className="text-sm font-mono tracking-wide uppercase mb-2" style={{ color: 'var(--ink-mute)' }}>
                {region.title}
              </h3>
              <ul className="space-y-2">
                {region.items.map((item) => (
                  <li key={item.placeId} className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                    {onPlaceClick ? (
                      <button
                        type="button"
                        onClick={() => onPlaceClick(item.placeId)}
                        className="font-medium text-sp-teal hover:underline text-left"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <strong style={{ color: 'var(--ink)' }}>{item.name}</strong>
                    )}
                    {' — '}{item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-japan-display text-xl font-medium mb-3">Walking & activities</h2>
        <h3 className="text-sm font-medium mb-2">Kumano Kodo (Nakahechi)</h3>
        <ul className="text-sm space-y-1.5 mb-4" style={{ color: 'var(--ink-soft)' }}>
          <li>~4-day classic beginner route; bus links between sections let one bus ahead & meet.</li>
          <li>
            <strong>Base: Tanabe.</strong> Budget guesthouses (per night, 2 people):{' '}
            {kumanoLodging.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ' · '}{l.name} <strong>{l.price}</strong>
              </span>
            ))}
          </li>
          <li>Book lodging early (limited); plan luggage-forwarding between stops.</li>
        </ul>
        <h3 className="text-sm font-medium mb-2">Nakasendo (Kiso Valley)</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--ink-soft)' }}>
          Tsumago → Magome, ~8 km half-day, bus links the ends. Easy, scenic post towns.
        </p>
        <h3 className="text-sm font-medium mb-2">Diving & food</h3>
        <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
          <strong>Okinawa/Miyako</strong> — warm water, reefs (wetsuit in Nov).{' '}
          <strong>Food:</strong> Tokyo yokocho alleys, Toyosu tuna sushi, green tea house on the Nakasendo.
        </p>
      </section>

      <section>
        <h2 className="font-japan-display text-xl font-medium mb-3">Runs & races</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--ink-mute)' }}>
          Trail runs near each base — distances are hiker averages; many are stone-stair scenic trails, not flat tempo.
        </p>
        <ul className="space-y-2 mb-6">
          {tripTrails.map((trail) => (
            <li key={trail.id} className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              <strong>{trail.base}</strong> —{' '}
              <a href={trail.url} target="_blank" rel="noopener noreferrer" className="text-sp-teal hover:underline">
                {trail.name}
              </a>{' '}
              ({trail.distance}, {trail.description})
            </li>
          ))}
        </ul>

        <h3 className="text-sm font-medium mb-2">Races during the trip window (Nov 2026)</h3>
        <div className="overflow-x-auto rounded-[var(--r-md)] mb-3" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--bg-elev-2)' }}>
                <th className="text-left p-2 font-mono uppercase">Date</th>
                <th className="text-left p-2 font-mono uppercase">Race</th>
                <th className="text-left p-2 font-mono uppercase">Where</th>
                <th className="text-left p-2 font-mono uppercase">Distances</th>
                <th className="text-left p-2 font-mono uppercase">Near</th>
              </tr>
            </thead>
            <tbody>
              {tripRaces.map((race) => (
                <tr key={race.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-2 whitespace-nowrap" style={{ color: 'var(--ink-mute)' }}>{race.dateLabel}</td>
                  <td className="p-2">
                    <a href={race.url} target="_blank" rel="noopener noreferrer" className="text-sp-teal hover:underline">
                      {race.name}
                    </a>
                  </td>
                  <td className="p-2" style={{ color: 'var(--ink-soft)' }}>{race.location}</td>
                  <td className="p-2" style={{ color: 'var(--ink-soft)' }}>{race.distances}</td>
                  <td className="p-2" style={{ color: 'var(--ink-mute)' }}>{race.near}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs" style={{ color: 'var(--ink-mute)' }}>
          Marathons need entry months ahead. Several Nov 1 events overlap. Kyoto Marathon is February, not Nov. Confirm dates on official sites.
        </p>
      </section>

      <section>
        <h2 className="font-japan-display text-xl font-medium mb-3">Logistics & open questions</h2>
        <ul className="space-y-2">
          {logisticsItems.map((item) => (
            <li key={item} className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div
        className="rounded-[var(--r-md)] p-4 text-sm leading-relaxed"
        style={{ background: 'var(--teal-soft)', borderLeft: '4px solid var(--teal)' }}
      >
        <strong>Foliage logic:</strong> central/mountains peak early–mid Nov; Kyoto &amp; Nara gardens peak the last week — this order chases the colour. <strong>Races:</strong> the Ishikawa races near Kanazawa are Nov 1 &amp; Nov 26–28; to catch the Nov 1 trail race, start ~Oct 30 in Kanazawa (Kyoto then lands slightly before absolute peak).
      </div>
    </div>
  )
}
