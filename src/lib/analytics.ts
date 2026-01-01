// Google Analytics types
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Initialize Google Analytics (only in production)
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

if (import.meta.env.PROD && measurementId && typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

// Track page view
export function trackPageView(path?: string, title?: string) {
  if (!import.meta.env.PROD || !measurementId || !window.gtag) return
  window.gtag('config', measurementId, {
    page_path: path || window.location.pathname + window.location.search,
    page_title: title || document.title,
  })
}

// Track custom event
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!import.meta.env.PROD || !window.gtag) return
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
export function trackBlogPost(title: string, slug: string, tags?: string[]) {
  trackEvent('blog_post_view', {
    post_title: title,
    post_slug: slug,
    post_tags: tags?.join(', ') || '',
  })
}

// Track theme toggle
export function trackTheme(theme: 'dark' | 'light') {
  trackEvent('theme_toggle', { theme })
}
