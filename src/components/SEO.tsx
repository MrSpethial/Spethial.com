import { Helmet } from 'react-helmet-async'
import {
  absoluteUrl,
  AUTHOR_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'

export interface SEOProps {
  title?: string
  description?: string
  /** Path (e.g. `/og-image.png`) or absolute URL */
  ogImage?: string
  ogType?: string
  canonical?: string
  noIndex?: boolean
  locale?: string
  publishedTime?: string
  tags?: string[]
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function buildTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
}

export default function SEO({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonical,
  noIndex = false,
  locale = 'en_GB',
  publishedTime,
  tags,
  jsonLd,
}: SEOProps) {
  const fullTitle = buildTitle(title)
  const imageUrl = absoluteUrl(ogImage)
  const resolvedCanonical = canonical ?? SITE_URL
  const hasImage = Boolean(ogImage)
  const twitterCard = hasImage ? 'summary_large_image' : 'summary'

  const jsonLdScripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))
    : null

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      {hasImage && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {hasImage && <meta name="twitter:image" content={imageUrl} />}

      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && (
        <meta property="article:author" content={AUTHOR_NAME} />
      )}
      {ogType === 'article' &&
        tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      <link rel="canonical" href={resolvedCanonical} />

      {jsonLdScripts}
    </Helmet>
  )
}
