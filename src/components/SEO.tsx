import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

export default function SEO({
  title = 'Spethial.com',
  description = 'A personal website and blog by a Product Manager who codes. Experiments, thoughts, and caffeine-fueled projects.',
  ogImage = '/og-image.png',
  ogType = 'website',
  canonical,
}: SEOProps) {
  const fullTitle = title === 'Spethial.com' ? title : `${title} | Spethial.com`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Spethial.com" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

