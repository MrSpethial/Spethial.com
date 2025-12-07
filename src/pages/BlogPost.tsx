import { useParams, Link, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import SEO from '@/components/SEO'
import { getPostBySlug } from '@/data/posts'

// Dynamically import MDX posts
const postComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'hello-world': lazy(() => import('@/posts/hello-world.mdx')),
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/blog" replace />
  }

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
            <Link
              to="/blog"
              className="inline-flex items-center text-spethial-accent hover:text-spethial-accent-hover transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        ogType="article"
      />

      <article className="py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-gray-600 dark:text-spethial-muted hover:text-spethial-accent transition-colors mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Post Header */}
            <header className="mb-12">
              <time className="text-sm text-gray-500 dark:text-spethial-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-spethial-text mt-2 mb-4">
                {post.title}
              </h1>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-spethial-border text-gray-600 dark:text-spethial-muted rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
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

