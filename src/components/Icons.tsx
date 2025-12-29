/**
 * Icon Components
 * 
 * This file provides reusable icon components using Hero Icons as the standard icon library.
 * 
 * @see https://heroicons.com/ - Hero Icons documentation
 * 
 * ## Adding New Icons
 * 
 * 1. Check if the icon exists in Hero Icons: https://heroicons.com/
 * 2. Import the icon from `@heroicons/react/24/outline` (use outline variant for consistency)
 * 3. Create a wrapper component following this pattern:
 * 
 * ```tsx
 * import { IconName as HeroIconName } from '@heroicons/react/24/outline'
 * 
 * export function IconName({ className = 'h-5 w-5' }: IconProps) {
 *   return <HeroIconName className={className} />
 * }
 * ```
 * 
 * ## When to Use Custom SVGs
 * 
 * Only use custom SVG icons when:
 * - The icon is not available in Hero Icons (e.g., GitHubIcon)
 * - The icon is brand-specific and not available in any icon library
 * 
 * Always prefer Hero Icons for consistency and maintainability.
 */

import { 
  ArrowLeftIcon as HeroArrowLeftIcon,
  ArrowRightIcon as HeroArrowRightIcon,
  SunIcon as HeroSunIcon,
  MoonIcon as HeroMoonIcon,
  ExclamationTriangleIcon as HeroExclamationTriangleIcon,
  BeakerIcon as HeroBeakerIcon,
} from '@heroicons/react/24/outline'

interface IconProps {
  className?: string
}

// Re-export Hero Icons with consistent default className
export function ArrowLeftIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroArrowLeftIcon className={className} />
}

export function ArrowRightIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroArrowRightIcon className={className} />
}

export function SunIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroSunIcon className={className} />
}

export function MoonIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroMoonIcon className={className} />
}

export function ExclamationTriangleIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroExclamationTriangleIcon className={className} />
}

export function BeakerIcon({ className = 'h-5 w-5' }: IconProps) {
  return <HeroBeakerIcon className={className} />
}

// GitHub icon is not available in Hero Icons, keeping custom SVG
export function GitHubIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

