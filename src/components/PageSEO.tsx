import { useLocation } from 'react-router-dom'
import SEO, { type SEOProps } from '@/components/SEO'
import { canonicalUrl } from '@/lib/site'

type PageSEOProps = Omit<SEOProps, 'canonical'> & {
  /** Override auto-derived canonical from current pathname */
  canonical?: string
}

/** Per-route SEO with canonical URL derived from the active path. */
export default function PageSEO({ canonical, ...props }: PageSEOProps) {
  const { pathname } = useLocation()
  return <SEO {...props} canonical={canonical ?? canonicalUrl(pathname)} />
}
