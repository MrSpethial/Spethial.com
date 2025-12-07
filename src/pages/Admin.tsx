import { useState, useEffect, useMemo } from 'react'
import MarkdownEditor from '@/components/MarkdownEditor'
import SEO from '@/components/SEO'
import { generateSlug } from '@/lib/utils'

interface PostData {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
}

// Simple Markdown to HTML for preview
function markdownToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-spethial-surface p-4 rounded-lg my-4"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-spethial-surface px-1 rounded text-spethial-accent">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-spethial-accent hover:underline">$1</a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-spethial-accent pl-4 italic my-4">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="my-4">')
}

const defaultContent = '# Your Post Title\n\nStart writing your content here...\n'

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [existingPosts, setExistingPosts] = useState<{ slug: string, content: string }[]>([])
  const [selectedPost, setSelectedPost] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [tagsInput, setTagsInput] = useState('')
  
  const [form, setForm] = useState<PostData>({
    slug: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    content: defaultContent,
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && form.title) {
      setForm(f => ({ ...f, slug: generateSlug(f.title) }))
    }
  }, [form.title, isEditing])

  // Parse tags
  useEffect(() => {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    setForm(f => ({ ...f, tags }))
  }, [tagsInput])

  // Fetch posts on mount
  useEffect(() => {
    fetch('/__api/posts/')
      .then(r => r.ok ? r.json() : null)
      .then(data => data?.posts && setExistingPosts(data.posts))
      .catch(() => {})
  }, [])

  const resetForm = () => {
    setIsEditing(false)
    setSelectedPost('')
    setForm({ slug: '', title: '', description: '', date: new Date().toISOString().split('T')[0], tags: [], content: defaultContent })
    setTagsInput('')
    setMessage(null)
  }

  const handleLoadPost = (slug: string) => {
    if (!slug) return resetForm()
    const post = existingPosts.find(p => p.slug === slug)
    if (post) {
      setIsEditing(true)
      setSelectedPost(slug)
      setForm(f => ({ ...f, slug: post.slug, content: post.content }))
      const titleMatch = post.content.match(/^# (.+)$/m)
      if (titleMatch) setForm(f => ({ ...f, title: titleMatch[1] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const endpoint = isEditing ? '/__api/posts/update' : '/__api/posts/create'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()
      
      if (res.ok && result.success) {
        setMessage({ type: 'success', text: `Post "${form.title}" ${isEditing ? 'updated' : 'created'}! Refresh to see changes.` })
        if (!isEditing) setExistingPosts(p => [...p, { slug: form.slug, content: form.content }])
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: String(err) })
    } finally {
      setIsLoading(false)
    }
  }

  const preview = useMemo(() => `<p class="my-4">${markdownToHtml(form.content)}</p>`, [form.content])

  if (!import.meta.env.DEV) {
    return (
      <>
        <SEO title="Admin" />
        <section className="py-16 sm:py-24">
          <div className="container-main text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-spethial-text mb-4">Admin Panel</h1>
            <p className="text-gray-600 dark:text-spethial-muted">
              Only available in development. Run <code className="bg-spethial-surface px-2 py-1 rounded">npm run dev</code>
            </p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title="Admin" />
      <section className="py-8 sm:py-12">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-spethial-text">Blog Admin</h1>
              <p className="text-sm text-gray-600 dark:text-spethial-muted mt-1">
                {isEditing ? `Editing: ${selectedPost}` : 'Create a new blog post'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select value={selectedPost} onChange={e => handleLoadPost(e.target.value)} className="input">
                <option value="">New Post</option>
                {existingPosts.map(p => <option key={p.slug} value={p.slug}>Edit: {p.slug}</option>)}
              </select>
              {isEditing && <button type="button" onClick={resetForm} className="btn-secondary text-sm px-3 py-2">Cancel</button>}
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="label">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="My Awesome Post" required />
                </div>
                <div>
                  <label className="label">Slug</label>
                  <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="input font-mono text-sm" placeholder="my-awesome-post" required disabled={isEditing} />
                  <p className="text-xs text-gray-500 dark:text-spethial-muted mt-1">URL: /blog/{form.slug || 'your-post-slug'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="label">Description</label>
                  <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input" placeholder="Brief description for SEO" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Date</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input" required />
                  </div>
                  <div>
                    <label className="label">Tags</label>
                    <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="input" placeholder="tag1, tag2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="label">Content (Markdown)</label>
                <div className="h-[500px]">
                  <MarkdownEditor value={form.content} onChange={content => setForm({ ...form, content })} />
                </div>
              </div>
              <div>
                <label className="label">Preview</label>
                <div className="h-[500px] p-4 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg overflow-auto prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: preview }} />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isLoading} className="btn-primary disabled:opacity-50">
                {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
