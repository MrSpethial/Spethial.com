import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { getAllPosts } from '@/data/posts'

export default function Blog() {
  const posts = getAllPosts()

  return (
    <>
      <SEO
        title="Blog"
        description="Thoughts, tutorials, and musings from a Product Manager who codes. Technical explorations and caffeine-fueled insights."
      />

      <section className="py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-spethial-text mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-spethial-muted mb-12">
              Thoughts, experiments, and lessons learned along the way.
            </p>

            {/* Posts List */}
            <div className="space-y-8">
              {posts.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-500 dark:text-spethial-muted">
                    No posts yet. Check back soon!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="card hover:border-spethial-accent/50 transition-colors duration-200">
                        <time className="text-sm text-gray-500 dark:text-spethial-muted">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-spethial-text mt-2 mb-3 group-hover:text-spethial-accent transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-spethial-muted">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
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
                      </div>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

