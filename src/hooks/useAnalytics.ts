import { useCallback } from 'react'

/**
 * Get the Google Analytics Measurement ID from environment variables
 */
function getMeasurementId(): string | null {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || null
}

/**
 * Check if Google Analytics is loaded and available
 * Only available in production
 */
function isGALoaded(): boolean {
  // Only check in production
  if (!import.meta.env.PROD) {
    return false
  }

  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' && 
         getMeasurementId() !== null
}

/**
 * Hook for Google Analytics tracking
 * Provides functions to track page views and custom events
 */
export function useAnalytics() {
  /**
   * Track a page view
   * @param path - The page path (defaults to current location)
   * @param title - The page title (optional)
   */
  const trackPageView = useCallback((path?: string, title?: string) => {
    if (!isGALoaded()) return

    const measurementId = getMeasurementId()
    if (!measurementId) return

    window.gtag('config', measurementId, {
      page_path: path || window.location.pathname + window.location.search,
      page_title: title || document.title,
    })
  }, [])

  /**
   * Track a custom event
   * @param eventName - The name of the event
   * @param eventParams - Additional parameters for the event
   */
  const trackEvent = useCallback((
    eventName: string,
    eventParams?: Record<string, unknown>
  ) => {
    if (!isGALoaded()) return

    window.gtag('event', eventName, eventParams)
  }, [])

  return {
    trackPageView,
    trackEvent,
    isEnabled: isGALoaded(),
  }
}

