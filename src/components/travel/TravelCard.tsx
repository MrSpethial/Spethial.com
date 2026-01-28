import { useState } from 'react'
import type { TravelLocation } from '@/data/travels'
import { formatDateRange, getCountryFlag } from '@/lib/utils'
import { StarIconSolid, StarIcon, ChevronDownIcon, MapPinIcon } from '@/components/Icons'

interface TravelCardProps {
  travel: TravelLocation
  onCountryClick?: (countryCode: string) => void
}

export default function TravelCard({ travel, onCountryClick }: TravelCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const flag = getCountryFlag(travel.countryCode)
  const hasRecommendations = travel.recommendations && travel.recommendations.length > 0

  return (
    <article className="card group relative overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-spethial-accent/5">
      {/* Favorite Badge */}
      {travel.isFavorite && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
            <StarIconSolid className="h-3 w-3" />
            FAVORITE
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <button
          onClick={() => onCountryClick?.(travel.countryCode)}
          className="text-3xl hover:scale-110 transition-transform"
          title={`View all trips to ${travel.country}`}
        >
          {flag}
        </button>
        <div className="flex-1 min-w-0 pr-20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-spethial-text truncate">
            {travel.city}
          </h3>
          <button
            onClick={() => onCountryClick?.(travel.countryCode)}
            className="text-gray-600 dark:text-spethial-muted hover:text-spethial-accent transition-colors"
          >
            {travel.country}
          </button>
        </div>
      </div>

      {/* Rating - Large and prominent */}
      {travel.rating !== undefined && (
        <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${travel.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            star <= travel.rating! ? (
              <StarIconSolid
                key={star}
                className="h-5 w-5 text-amber-400"
              />
            ) : (
              <StarIcon
                key={star}
                className="h-5 w-5 text-gray-300 dark:text-spethial-muted"
              />
            )
          ))}
          <span className="ml-2 text-sm text-gray-500 dark:text-spethial-muted">
            ({travel.rating}/5)
          </span>
        </div>
      )}

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-spethial-muted mb-4">
        <MapPinIcon className="h-4 w-4" />
        <time dateTime={travel.visitDate.start}>
          {formatDateRange(travel.visitDate.start, travel.visitDate.end)}
        </time>
      </div>

      {/* Notes */}
      {travel.notes && (
        <p className="text-gray-600 dark:text-spethial-muted mb-4 line-clamp-3">
          "{travel.notes}"
        </p>
      )}

      {/* Tags */}
      {travel.tags && travel.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {travel.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-spethial-border text-gray-700 dark:text-spethial-muted rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Recommendations - Expandable */}
      {hasRecommendations && (
        <div className="border-t border-gray-200 dark:border-spethial-border pt-4 mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-spethial-text hover:text-spethial-accent transition-colors"
            aria-expanded={isExpanded}
          >
            <span>Recommendations ({travel.recommendations!.length})</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <ul className="mt-3 space-y-2">
              {travel.recommendations!.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-spethial-muted"
                >
                  <span className="text-spethial-accent mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  )
}
