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
    <article className="card group relative overflow-hidden">
      {/* Favorite Badge */}
      {travel.isFavorite && (
        <div className="absolute top-3 right-3 z-10">
          <span className="tag tag-amber text-[10px]">
            <StarIconSolid className="h-3 w-3" />
            FAVOURITE
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
          <h3 className="text-xl font-medium truncate">{travel.city}</h3>
          <button
            onClick={() => onCountryClick?.(travel.countryCode)}
            className="text-sp-ink-mute hover:text-sp-teal transition-colors"
          >
            {travel.country}
          </button>
        </div>
      </div>

      {/* Rating */}
      {travel.rating !== undefined && (
        <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${travel.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            star <= travel.rating! ? (
              <StarIconSolid key={star} className="h-5 w-5 text-sp-amber" />
            ) : (
              <StarIcon key={star} className="h-5 w-5 text-sp-ink-faint" />
            )
          ))}
          <span className="ml-2 text-sm" style={{ color: 'var(--ink-mute)' }}>({travel.rating}/5)</span>
        </div>
      )}

      {/* Date */}
      <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--ink-mute)' }}>
        <MapPinIcon className="h-4 w-4" />
        <time dateTime={travel.visitDate.start}>
          {formatDateRange(travel.visitDate.start, travel.visitDate.end)}
        </time>
      </div>

      {/* Notes */}
      {travel.notes && (
        <p className="mb-4 line-clamp-3 text-sm" style={{ color: 'var(--ink-soft)' }}>"{travel.notes}"</p>
      )}

      {/* Tags */}
      {travel.tags && travel.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {travel.tags.map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {hasRecommendations && (
        <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-sm font-medium hover:text-sp-teal transition-colors"
            aria-expanded={isExpanded}
          >
            <span>Recommendations ({travel.recommendations!.length})</span>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isExpanded && (
            <ul className="mt-3 space-y-2">
              {travel.recommendations!.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
                  <span className="text-sp-teal mt-0.5">·</span>
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
