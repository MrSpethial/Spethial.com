import { Link } from 'react-router-dom'
import PageSEO from '@/components/PageSEO'
import { blogIndexJsonLd } from '@/lib/jsonLd'
import { TagList } from '@/components/Tag'
import { getAllPosts } from '@/data/posts'
import { formatDate } from '@/lib/utils'
import { trackClick } from '@/lib/analytics'

export default function Blog() {
  const posts = getAllPosts()
  const featured = posts[0]
  const archive = posts

  return (
    <>
      <PageSEO
        title="Blog"
        description="Notes, drafts, and occasional epiphanies on product, code, and the strange overlap of the two."
        jsonLd={blogIndexJsonLd(posts)}
      />

      {/* Page Header */}
      <header className="pt-24 pb-12">
        <div className="container-main">
          <div className="t-eyebrow mb-2" style={{ color: 'var(--ink-faint)' }}>§ Blog</div>
          <h1 className="text-[clamp(40px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.02] max-w-[18ch] mb-6">
            Notes, drafts &amp;{' '}
            <b className="font-normal" style={{
              background: 'linear-gradient(90deg, var(--teal), var(--blue))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>occasional epiphanies.</b>
          </h1>
          <p className="max-w-[56ch] text-lg leading-[1.7]" style={{ color: 'var(--ink-soft)' }}>
            Long-ish form writing on product, code, the strange overlap of the
            two, and whatever else has been rattling around lately. Updated when
            a thought feels complete enough to share.
          </p>
        </div>
      </header>

      {/* Featured */}
      {featured && (
        <section className="py-12 border-t" style={{ borderColor: 'var(--hairline)' }}>
          <div className="container-main">
            <div className="flex flex-col gap-2 mb-8">
              <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 01 — Featured</div>
              <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Latest from the press.</h2>
            </div>

            <Link
              to={`/blog/${featured.slug}`}
              onClick={() => trackClick(featured.title, `/blog/${featured.slug}`, 'blog_featured')}
              className="block border-t pt-8 transition-opacity hover:opacity-85"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3.5 mb-4 font-mono text-xs tracking-[0.08em] uppercase" style={{ color: 'var(--ink-mute)' }}>
                    <span className="text-sp-teal">★ Featured</span>
                    <span>· {formatDate(featured.date)}</span>
                  </div>
                  <h3 className="text-[clamp(28px,3.4vw,48px)] font-normal tracking-[-0.03em] leading-[1.08] max-w-[18ch] mb-4">{featured.title}</h3>
                  <p className="text-lg leading-relaxed max-w-[50ch] mb-5" style={{ color: 'var(--ink-soft)' }}>{featured.description}</p>
                  <span className="inline-flex items-center gap-2 font-mono text-sm text-sp-teal pb-1" style={{ borderBottom: '1px solid var(--teal-soft)' }}>
                    Read the post
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </span>
                </div>
                <div className="aspect-[5/4] rounded-[var(--r-lg)] border relative overflow-hidden" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(100,255,218,0.4), transparent 50%), radial-gradient(circle at 70% 60%, rgba(165,200,255,0.3), transparent 50%), radial-gradient(circle at 50% 90%, rgba(255,176,136,0.15), transparent 50%), var(--bg-elev-1)',
                  borderColor: 'var(--border)',
                }} />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Archive */}
      <section className="py-12 border-t" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-2 mb-8">
            <div className="t-eyebrow" style={{ color: 'var(--ink-faint)' }}>§ 02 — Archive</div>
            <div className="flex items-baseline justify-between">
              <h2 style={{ fontSize: "40px", fontWeight: 400, letterSpacing: "-0.03em" }}>Everything else.</h2>
              <span className="font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>{posts.length} posts</span>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="card text-center py-12">
              <p style={{ color: 'var(--ink-mute)' }}>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {archive.map(post => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  onClick={() => trackClick(post.title, `/blog/${post.slug}`, 'blog_list')}
                  className="grid grid-cols-[1fr] sm:grid-cols-[160px_1fr_auto] gap-4 sm:gap-8 py-6 border-b items-baseline transition-all hover:pl-3"
                  style={{
                    borderColor: 'var(--hairline)',
                    color: 'inherit',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(90deg, var(--bg-elev-1), transparent 70%)')}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  <div className="font-mono text-xs" style={{ color: 'var(--ink-faint)' }}>
                    <span className="block text-sm mb-0.5" style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--fs-2xl)] font-medium tracking-[-0.02em] leading-[1.2]">{post.title}</span>
                    <span className="text-sm max-w-[60ch]" style={{ color: 'var(--ink-mute)', lineHeight: '1.55' }}>{post.description}</span>
                  </div>
                  <div className="hidden sm:flex">
                    <TagList tags={post.tags} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-12 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-[var(--r-lg)]" style={{ border: '1px dashed var(--border-strong)' }}>
            <div>
              <div className="text-[var(--fs-xl)] font-medium tracking-[-0.02em] mb-1.5">Whenever-it-clicks newsletter.</div>
              <div className="text-sm max-w-[44ch]" style={{ color: 'var(--ink-mute)', lineHeight: '1.55' }}>
                No schedule, no funnels — just an email when a new post goes up.
              </div>
            </div>
            <form className="flex gap-2 p-1.5 rounded-[var(--r-md)]" style={{ background: 'var(--bg-elev-1)', border: '1px solid var(--border)' }} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="you@yourdomain.com" className="flex-1 bg-transparent border-0 outline-none px-2.5 py-2 text-sm" style={{ color: 'var(--ink)' }} />
              <button type="submit" className="btn btn-primary text-sm">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
