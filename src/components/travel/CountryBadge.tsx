import { getCountryFlag } from '@/lib/utils'

interface CountryBadgeProps {
  countryCode: string
  countryName: string
  visitCount?: number
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  isActive?: boolean
}

export default function CountryBadge({
  countryCode,
  countryName,
  visitCount,
  size = 'md',
  onClick,
  isActive = false,
}: CountryBadgeProps) {
  const flag = getCountryFlag(countryCode)

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  }

  const flagSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-lg border transition-colors
        ${sizeClasses[size]}
        ${isActive
          ? 'bg-spethial-accent/10 border-spethial-accent text-spethial-accent'
          : 'bg-gray-100 dark:bg-spethial-surface border-gray-200 dark:border-spethial-border text-gray-700 dark:text-spethial-text'
        }
        ${onClick ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-spethial-border' : ''}
      `}
    >
      <span className={flagSizes[size]} role="img" aria-label={`${countryName} flag`}>
        {flag}
      </span>
      <span className="font-medium">{countryName}</span>
      {visitCount !== undefined && visitCount > 1 && (
        <span className="text-gray-500 dark:text-spethial-muted">
          ({visitCount})
        </span>
      )}
    </Component>
  )
}
