/**
 * Travel Data & Types
 *
 * This file contains all travel location data and helper functions.
 * To add a new travel entry, add it to the `travels` array below.
 *
 * Priority features: Favorites & Ratings (per user preference)
 */

export type TravelStatus = 'visited' | 'planned'

export interface TravelLocation {
  id: string
  city: string
  country: string
  countryCode: string        // ISO 3166-1 alpha-2 (e.g., "US", "JP")
  coordinates?: {
    lat: number
    lng: number
  }
  visitDate: {
    start: string            // ISO date (YYYY-MM-DD)
    end?: string             // Optional end date for trips
  }
  status?: TravelStatus      // Defaults to 'visited'
  tripSlug?: string          // Deep link to trip detail page (e.g. /travels/japan/2026)
  notes?: string             // Personal notes/memories
  recommendations?: string[] // Places/things to recommend
  isFavorite: boolean        // Mark as favorite destination
  rating?: number            // 1-5 star rating
  photos?: string[]          // Optional photo URLs
  tags?: string[]            // e.g., ["beach", "culture", "food"]
}

export interface TravelStats {
  totalCountries: number
  totalCities: number
  totalTrips: number
  favoriteCount: number
}

// Sample travel data - edit this array to add/modify travels
export const travels: TravelLocation[] = [
  {
    id: 'japan-2026',
    city: 'Japan',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: { lat: 35.6762, lng: 136.5 },
    visitDate: {
      start: '2026-11-04',
      end: '2026-11-27',
    },
    status: 'planned',
    tripSlug: '/travels/japan/2026',
    notes: '24-day walking trip through Kanazawa, Kiso Valley, Kumano Kodo, Kyoto and Nara — sequenced for peak autumn colour.',
    recommendations: [
      'Magome → Tsumago Nakasendo walk',
      'Kumano Kodo Nakahechi pilgrimage',
      'Eikandō temple for peak foliage in Kyoto',
    ],
    isFavorite: true,
    tags: ['walk', 'temple', 'foliage', 'culture', 'food'],
  },
  {
    id: 'tokyo-2024',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    visitDate: {
      start: '2024-03-15',
      end: '2024-03-22'
    },
    notes: 'Amazing cherry blossom season. The city was beautiful with sakura everywhere.',
    recommendations: [
      'Visit Shibuya Crossing at night',
      'Tsukiji Outer Market for fresh sushi',
      'TeamLab Borderless digital art museum'
    ],
    isFavorite: true,
    rating: 5,
    tags: ['culture', 'food', 'temples', 'technology']
  },
  {
    id: 'paris-2023',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    visitDate: {
      start: '2023-09-10',
      end: '2023-09-17'
    },
    notes: 'Perfect weather in September. The Louvre was incredible.',
    recommendations: [
      'Take the stairs up the Eiffel Tower for the experience',
      'Musée d\'Orsay for Impressionist art',
      'Le Marais for authentic patisseries'
    ],
    isFavorite: true,
    rating: 5,
    tags: ['art', 'culture', 'food', 'history']
  },
  {
    id: 'new-york-2023',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    visitDate: {
      start: '2023-05-20',
      end: '2023-05-27'
    },
    notes: 'The energy of the city is unmatched. Broadway shows were fantastic.',
    recommendations: [
      'Walk the High Line at sunset',
      'Get pizza at Joe\'s Pizza',
      'Central Park early morning is peaceful'
    ],
    isFavorite: false,
    rating: 4,
    tags: ['urban', 'food', 'entertainment', 'culture']
  },
  {
    id: 'sydney-2022',
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    visitDate: {
      start: '2022-12-01',
      end: '2022-12-10'
    },
    notes: 'Beautiful harbor city. The Opera House is even more impressive in person.',
    recommendations: [
      'Bondi to Coogee coastal walk',
      'Ferry ride to Manly Beach',
      'Climb the Sydney Harbour Bridge'
    ],
    isFavorite: true,
    rating: 5,
    tags: ['beach', 'nature', 'urban', 'adventure']
  },
  {
    id: 'london-2022',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    visitDate: {
      start: '2022-06-15',
      end: '2022-06-22'
    },
    notes: 'Historic and modern mixed perfectly. The museums are world-class.',
    recommendations: [
      'British Museum - free and incredible',
      'Borough Market for lunch',
      'West End show in the evening'
    ],
    isFavorite: false,
    rating: 4,
    tags: ['history', 'culture', 'food', 'entertainment']
  },
  {
    id: 'barcelona-2021',
    city: 'Barcelona',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    visitDate: {
      start: '2021-10-05',
      end: '2021-10-12'
    },
    notes: 'Gaudi\'s architecture is mind-blowing. Great beaches and nightlife.',
    recommendations: [
      'Sagrada Familia - book tickets early',
      'Park Güell for sunset views',
      'La Boqueria for tapas'
    ],
    isFavorite: true,
    rating: 5,
    tags: ['architecture', 'beach', 'food', 'nightlife']
  },
]

/** Trips that have actually been taken (excludes status: 'planned'). */
export function isVisitedTravel(travel: TravelLocation): boolean {
  return travel.status !== 'planned'
}

const visitedTravels = () => travels.filter(isVisitedTravel)

// Helper functions

/**
 * Get all travel locations sorted by date (newest first)
 */
export function getAllTravels(): TravelLocation[] {
  return [...travels].sort((a, b) =>
    new Date(b.visitDate.start).getTime() - new Date(a.visitDate.start).getTime()
  )
}

/**
 * Get all favorite travel locations
 */
export function getFavoriteTravels(): TravelLocation[] {
  return travels.filter(travel => travel.isFavorite)
}

/**
 * Get travels filtered by country code
 */
export function getTravelsByCountry(countryCode: string): TravelLocation[] {
  return travels.filter(travel => travel.countryCode === countryCode)
}

/**
 * Get a single travel by ID
 */
export function getTravelById(id: string): TravelLocation | undefined {
  return travels.find(travel => travel.id === id)
}

/**
 * Get unique list of visited countries
 */
export function getVisitedCountries(): { code: string; name: string; count: number }[] {
  const countryMap = new Map<string, { name: string; count: number }>()

  visitedTravels().forEach(travel => {
    const existing = countryMap.get(travel.countryCode)
    if (existing) {
      existing.count++
    } else {
      countryMap.set(travel.countryCode, { name: travel.country, count: 1 })
    }
  })

  return Array.from(countryMap.entries())
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get unique list of all tags used
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  travels.forEach(travel => {
    travel.tags?.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Get travel statistics
 */
export function getTravelStats(): TravelStats {
  const visited = visitedTravels()
  const countries = new Set(visited.map(t => t.countryCode))
  const cities = new Set(visited.map(t => t.city))

  return {
    totalCountries: countries.size,
    totalCities: cities.size,
    totalTrips: visited.length,
    favoriteCount: visited.filter(t => t.isFavorite).length,
  }
}

/**
 * Sort travels by various criteria
 */
export type SortOption = 'date-newest' | 'date-oldest' | 'rating' | 'favorites' | 'alphabetical'

export function sortTravels(locations: TravelLocation[], sortBy: SortOption): TravelLocation[] {
  const sorted = [...locations]

  switch (sortBy) {
    case 'date-newest':
      return sorted.sort((a, b) =>
        new Date(b.visitDate.start).getTime() - new Date(a.visitDate.start).getTime()
      )
    case 'date-oldest':
      return sorted.sort((a, b) =>
        new Date(a.visitDate.start).getTime() - new Date(b.visitDate.start).getTime()
      )
    case 'rating':
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case 'favorites':
      return sorted.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1
        if (!a.isFavorite && b.isFavorite) return 1
        return new Date(b.visitDate.start).getTime() - new Date(a.visitDate.start).getTime()
      })
    case 'alphabetical':
      return sorted.sort((a, b) => a.city.localeCompare(b.city))
    default:
      return sorted
  }
}

/**
 * Group travels by year for timeline view
 */
export function getTravelsByYear(): Map<number, TravelLocation[]> {
  const byYear = new Map<number, TravelLocation[]>()

  travels.forEach(travel => {
    const year = new Date(travel.visitDate.start).getFullYear()
    const existing = byYear.get(year) || []
    existing.push(travel)
    byYear.set(year, existing)
  })

  // Sort entries within each year by date
  byYear.forEach((locations, year) => {
    byYear.set(year, locations.sort((a, b) =>
      new Date(b.visitDate.start).getTime() - new Date(a.visitDate.start).getTime()
    ))
  })

  return new Map([...byYear.entries()].sort((a, b) => b[0] - a[0]))
}

/**
 * Filter travels by multiple criteria
 */
export interface TravelFilters {
  country?: string
  tag?: string
  favoritesOnly?: boolean
  minRating?: number
  searchQuery?: string
}

export function filterTravels(filters: TravelFilters): TravelLocation[] {
  let result = [...travels]

  if (filters.country) {
    result = result.filter(t => t.countryCode === filters.country)
  }

  if (filters.tag) {
    result = result.filter(t => t.tags?.includes(filters.tag!))
  }

  if (filters.favoritesOnly) {
    result = result.filter(t => t.isFavorite)
  }

  if (filters.minRating !== undefined) {
    result = result.filter(t => (t.rating ?? 0) >= filters.minRating!)
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    result = result.filter(t =>
      t.city.toLowerCase().includes(query) ||
      t.country.toLowerCase().includes(query) ||
      t.notes?.toLowerCase().includes(query) ||
      t.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return result
}
