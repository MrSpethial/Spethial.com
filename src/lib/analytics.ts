// Google Analytics types (gtag is defined by the snippet injected in index.html at build time)
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
const enableInDev = import.meta.env.VITE_GA_ENABLE_IN_DEV === 'true'
const analyticsEnabled =
  Boolean(measurementId) &&
  (import.meta.env.PROD || enableInDev) &&
  typeof window !== 'undefined'

function gtagReady(): boolean {
  return analyticsEnabled && typeof window.gtag === 'function'
}

/** Paths excluded from SPA page_view updates (initial HTML snippet may still fire once). */
function isExcludedPath(path: string): boolean {
  return path === '/admin' || path.startsWith('/admin?')
}

// Track page view (SPA route changes)
export function trackPageView(path?: string, title?: string) {
  if (!gtagReady() || !measurementId) return

  const pagePath = path ?? window.location.pathname + window.location.search
  if (isExcludedPath(pagePath)) return

  const pageTitle = title ?? document.title

  window.gtag('config', measurementId, {
    page_path: pagePath,
    page_title: pageTitle,
    send_page_view: true,
  })
}

/**
 * Defer page_view until after react-helmet-async updates document.title.
 * Returns a cleanup function to cancel if the route changes again quickly.
 */
export function trackPageViewAfterTitle(path: string): () => void {
  if (!gtagReady() || !measurementId || isExcludedPath(path)) return () => {}

  let cancelled = false
  const run = () => {
    if (!cancelled) trackPageView(path, document.title)
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(run)
  })

  return () => {
    cancelled = true
  }
}

// Track custom event
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!gtagReady()) return
  window.gtag('event', eventName, params)
}

// Track click events (internal links, external links, navigation)
export function trackClick(text: string, url: string, location?: string) {
  trackEvent('click', {
    link_text: text,
    link_url: url,
    ...(location && { link_location: location }),
  })
}

// Track blog post view
export function trackBlogPost(title: string, slug: string, tags: string[]) {
  trackEvent('blog_post_view', {
    post_title: title,
    post_slug: slug,
    post_tags: tags.join(', '),
  })
}
