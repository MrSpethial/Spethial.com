// Utility functions

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format a date range for travel display
 * @param startDate - Start date in ISO format
 * @param endDate - Optional end date in ISO format
 * @returns Formatted date range string (e.g., "March 15-22, 2024" or "March 15, 2024")
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const startMonth = start.toLocaleDateString('en-US', { month: 'long' })
  const startDay = start.getDate()
  const startYear = start.getFullYear()

  if (!endDate) {
    return `${startMonth} ${startDay}, ${startYear}`
  }

  const end = new Date(endDate)
  const endMonth = end.toLocaleDateString('en-US', { month: 'long' })
  const endDay = end.getDate()
  const endYear = end.getFullYear()

  // Same month and year
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}-${endDay}, ${startYear}`
  }

  // Same year, different months
  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`
  }

  // Different years
  return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
}

/**
 * Get country flag emoji from ISO country code
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji for the country
 */
export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

