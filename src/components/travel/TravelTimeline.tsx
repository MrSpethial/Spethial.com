import type { TravelLocation } from '@/data/travels'
import { getTravelsByYear } from '@/data/travels'
import TravelCard from './TravelCard'

interface TravelTimelineProps {
  travels: TravelLocation[]
  onCountryClick?: (countryCode: string) => void
}

export default function TravelTimeline({ travels, onCountryClick }: TravelTimelineProps) {
  const travelIds = new Set(travels.map(t => t.id))
  const allByYear = getTravelsByYear()

  const filteredByYear = new Map<number, TravelLocation[]>()
  allByYear.forEach((yearTravels, year) => {
    const filtered = yearTravels.filter(t => travelIds.has(t.id))
    if (filtered.length > 0) filteredByYear.set(year, filtered)
  })

  const years = Array.from(filteredByYear.keys()).sort((a, b) => b - a)

  if (years.length === 0) {
    return <div className="text-center py-12" style={{ color: 'var(--ink-mute)' }}>No travels to display</div>
  }

  return (
    <div className="relative">
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5" style={{ background: 'var(--border)' }} />
      <div className="space-y-12">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="sticky top-20 z-10 flex items-center gap-4 mb-6">
              <div className="w-8 sm:w-16 h-8 sm:h-12 bg-sp-teal rounded-[var(--r-md)] flex items-center justify-center text-[#07111c] font-medium text-sm sm:text-lg shadow-lg">
                {year}
              </div>
              <div className="h-0.5 flex-1" style={{ background: 'linear-gradient(90deg, var(--teal), transparent)' }} />
            </div>
            <div className="space-y-6 ml-12 sm:ml-20">
              {filteredByYear.get(year)!.map((travel) => (
                <div key={travel.id} className="relative">
                  <div className="absolute -left-8 sm:-left-12 top-8 w-4 h-4 rounded-full border-4 border-sp-teal shadow" style={{ background: 'var(--bg)' }} />
                  <TravelCard travel={travel} onCountryClick={onCountryClick} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
