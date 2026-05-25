import { useParams, Link, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import { TagList } from '@/components/Tag'
import { getPostBySlug } from '@/data/posts'
import { formatDate } from '@/lib/utils'
import { trackBlogPost } from '@/lib/analytics'

const postComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'hello-world': lazy(() => import('@/posts/hello-world.mdx')),
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60]" style={{ background: 'var(--hairline)' }}>
      <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'var(--teal)', boxShadow: '0 0 8px var(--teal-glow)' }} />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return <Navigate to="/blog" replace />

  const post = getPostBySlug(slug)
  const PostContent = postComponents[slug]

  useEffect(() => {
    if (post) trackBlogPost(post.title, post.slug, post.tags ?? [])
  }, [post])

  if (!post || !PostContent) {
    return (
      <section className="py-24">
        <div className="container-main">
          <div className="max-w-3xl text-center">
            <h1 className="text-3xl font-medium mb-4">Post Not Found</h1>
            <p className="mb-8" style={{ color: 'var(--ink-mute)' }}>
              The post you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sp-teal hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <ReadingProgress />
      <SEO title={post.title} description={post.description} ogType="article" />

      <article className="py-24">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-sp-teal" style={{ color: 'var(--ink-mute)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Blog
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4 font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
                <time>{formatDate(post.date)}</time>
              </div>
              <h1 className="text-[clamp(28px,4vw,48px)] font-medium tracking-[-0.02em] leading-[1.08] mb-4">{post.title}</h1>
              <TagList tags={post.tags} />
            </header>

            <div className="prose prose-lg max-w-none">
              <Suspense fallback={<div className="animate-pulse" style={{ color: 'var(--ink-mute)' }}>Loading...</div>}>
                <PostContent />
              </Suspense>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
