import { useParams, Link, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import SEO from '@/components/SEO'
import { TagList } from '@/components/Tag'
import { ArrowLeftIcon } from '@/components/Icons'
import { getPostBySlug } from '@/data/posts'
import { formatDate } from '@/lib/utils'

// Dynamically import MDX posts
const postComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'hello-world': lazy(() => import('@/posts/hello-world.mdx')),
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) return <Navigate to="/blog" replace />

  const post = getPostBySlug(slug)
  const PostContent = postComponents[slug]

  if (!post || !PostContent) {
    return (
      <section className="py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-spethial-text mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-spethial-muted mb-8">
              The post you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/blog" className="inline-flex items-center text-spethial-accent hover:text-spethial-accent-hover transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO title={post.title} description={post.description} ogType="article" />

      <article className="py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            <Link to="/blog" className="inline-flex items-center text-sm text-gray-600 dark:text-spethial-muted hover:text-spethial-accent transition-colors mb-8">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>

            <header className="mb-12">
              <time className="text-sm text-gray-500 dark:text-spethial-muted">
                {formatDate(post.date)}
              </time>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-spethial-text mt-2 mb-4">
                {post.title}
              </h1>
              <TagList tags={post.tags} />
            </header>

            <div className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-spethial-text prose-p:text-gray-600 dark:prose-p:text-spethial-muted prose-a:text-spethial-accent hover:prose-a:text-spethial-accent-hover prose-code:text-spethial-accent prose-pre:bg-spethial-surface prose-pre:border prose-pre:border-spethial-border max-w-none">
              <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
                <PostContent />
              </Suspense>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
