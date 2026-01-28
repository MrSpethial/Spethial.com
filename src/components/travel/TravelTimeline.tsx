import type { TravelLocation } from '@/data/travels'
import { getTravelsByYear } from '@/data/travels'
import TravelCard from './TravelCard'

interface TravelTimelineProps {
  travels: TravelLocation[]
  onCountryClick?: (countryCode: string) => void
}

export default function TravelTimeline({ travels, onCountryClick }: TravelTimelineProps) {
  // Group travels by year
  const travelIds = new Set(travels.map(t => t.id))
  const allByYear = getTravelsByYear()

  // Filter to only include travels that match the filter
  const filteredByYear = new Map<number, TravelLocation[]>()
  allByYear.forEach((yearTravels, year) => {
    const filtered = yearTravels.filter(t => travelIds.has(t.id))
    if (filtered.length > 0) {
      filteredByYear.set(year, filtered)
    }
  })

  const years = Array.from(filteredByYear.keys()).sort((a, b) => b - a)

  if (years.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-spethial-muted">
        No travels to display
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-spethial-border" />

      {/* Years and entries */}
      <div className="space-y-12">
        {years.map((year) => (
          <div key={year} className="relative">
            {/* Year marker */}
            <div className="sticky top-20 z-10 flex items-center gap-4 mb-6">
              <div className="w-8 sm:w-16 h-8 sm:h-12 bg-spethial-accent rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
                {year}
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-spethial-accent to-transparent" />
            </div>

            {/* Entries for this year */}
            <div className="space-y-6 ml-12 sm:ml-20">
              {filteredByYear.get(year)!.map((travel) => (
                <div key={travel.id} className="relative">
                  {/* Connector dot */}
                  <div className="absolute -left-8 sm:-left-12 top-8 w-4 h-4 rounded-full bg-white dark:bg-spethial-bg border-4 border-spethial-accent shadow" />

                  {/* Card */}
                  <TravelCard
                    travel={travel}
                    onCountryClick={onCountryClick}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
