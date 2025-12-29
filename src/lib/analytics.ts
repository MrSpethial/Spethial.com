/**
 * Initialize Google Analytics
 * Only loads in production (Vercel)
 * This should be called once when the app loads
 */
export function initializeGoogleAnalytics() {
  // Only initialize in production
  if (!import.meta.env.PROD) {
    return
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (!measurementId || typeof window === 'undefined') {
    return
  }

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  // Set the current date
  window.gtag('js', new Date())
  
  // Configure GA with the Measurement ID
  window.gtag('config', measurementId)

  // Load the gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

