/** Canonical site origin (no trailing slash). Set via VITE_SITE_URL in production. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/$/, '') || 'https://spethial.com'

export const SITE_NAME = 'Spethial.com'
export const DEFAULT_DESCRIPTION =
  'A personal website and blog by a Product Manager who codes. Experiments, thoughts, and caffeine-fueled projects.'
export const DEFAULT_OG_IMAGE = '/og-image.png'
export const AUTHOR_NAME = 'Mr. Spethial'

/** Build an absolute URL from a path or absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

/** Canonical URL for a pathname (e.g. `/blog` or `/blog/hello-world`). */
export function canonicalUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return absoluteUrl(path === '/' ? '/' : path.replace(/\/$/, '') || '/')
}
