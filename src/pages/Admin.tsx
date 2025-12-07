import { useState, useEffect, useMemo } from 'react'
import MarkdownEditor from '@/components/MarkdownEditor'
import SEO from '@/components/SEO'

interface PostData {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
}

interface ExistingPost {
  slug: string
  content: string
}

// Simple Markdown to HTML converter for preview
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-spethial-surface p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-spethial-surface px-1 rounded text-spethial-accent">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-spethial-accent hover:underline">$1</a>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-spethial-accent pl-4 italic my-4">$1</blockquote>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="my-4">')
    // Line breaks
    .replace(/\n/g, '<br>')
  
  return `<p class="my-4">${html}</p>`
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [existingPosts, setExistingPosts] = useState<ExistingPost[]>([])
  const [selectedPost, setSelectedPost] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  
  const [formData, setFormData] = useState<PostData>({
    slug: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    content: '# Your Post Title\n\nStart writing your content here...\n',
  })
  const [tagsInput, setTagsInput] = useState('')

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))
    }
  }, [formData.title, isEditing])

  // Parse tags input
  useEffect(() => {
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
    setFormData(prev => ({ ...prev, tags }))
  }, [tagsInput])

  // Fetch existing posts on mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/__api/posts/')
        if (response.ok) {
          const data = await response.json()
          setExistingPosts(data.posts || [])
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }
    fetchPosts()
  }, [])

  // Load selected post for editing
  const handleLoadPost = async (slug: string) => {
    if (!slug) {
      resetForm()
      return
    }
    
    const post = existingPosts.find(p => p.slug === slug)
    if (post) {
      setIsEditing(true)
      setSelectedPost(slug)
      setFormData({
        ...formData,
        slug: post.slug,
        content: post.content,
      })
      // Try to parse title from content
      const titleMatch = post.content.match(/^# (.+)$/m)
      if (titleMatch) {
        setFormData(prev => ({ ...prev, title: titleMatch[1] }))
      }
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setSelectedPost('')
    setFormData({
      slug: '',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      content: '# Your Post Title\n\nStart writing your content here...\n',
    })
    setTagsInput('')
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const endpoint = isEditing ? '/__api/posts/update' : '/__api/posts/create'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        setMessage({
          type: 'success',
          text: isEditing 
            ? `Post "${formData.title}" updated successfully! Refresh to see changes.` 
            : `Post "${formData.title}" created successfully! Refresh to see it in the blog.`,
        })
        if (!isEditing) {
          // Add to existing posts list
          setExistingPosts(prev => [...prev, { slug: formData.slug, content: formData.content }])
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save post' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  const preview = useMemo(() => markdownToHtml(formData.content), [formData.content])

  // Check if we're in dev mode
  const isDev = import.meta.env.DEV

  if (!isDev) {
    return (
      <>
        <SEO title="Admin" />
        <section className="py-16 sm:py-24">
          <div className="container-main">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-spethial-text mb-4">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-spethial-muted">
                The admin panel is only available in development mode.
                Run <code className="bg-spethial-surface px-2 py-1 rounded">npm run dev</code> locally to access it.
              </p>
            </div>
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-spethial-text">
                Blog Admin
              </h1>
              <p className="text-sm text-gray-600 dark:text-spethial-muted mt-1">
                {isEditing ? `Editing: ${selectedPost}` : 'Create a new blog post'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedPost}
                onChange={(e) => handleLoadPost(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-sm text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent"
              >
                <option value="">New Post</option>
                {existingPosts.map(post => (
                  <option key={post.slug} value={post.slug}>
                    Edit: {post.slug}
                  </option>
                ))}
              </select>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 text-sm bg-gray-200 dark:bg-spethial-border text-gray-700 dark:text-spethial-text rounded-lg hover:bg-gray-300 dark:hover:bg-spethial-muted transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent"
                    placeholder="My Awesome Post"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent font-mono text-sm"
                    placeholder="my-awesome-post"
                    required
                    disabled={isEditing}
                  />
                  <p className="text-xs text-gray-500 dark:text-spethial-muted mt-1">
                    URL: /blog/{formData.slug || 'your-post-slug'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent"
                    placeholder="A brief description for SEO and listings"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg text-gray-900 dark:text-spethial-text focus:outline-none focus:ring-2 focus:ring-spethial-accent"
                      placeholder="tag1, tag2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Editor and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-2">
                  Content (Markdown)
                </label>
                <div className="h-[500px]">
                  <MarkdownEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-spethial-text mb-2">
                  Preview
                </label>
                <div 
                  className="h-[500px] p-4 bg-white dark:bg-spethial-surface border border-gray-200 dark:border-spethial-border rounded-lg overflow-auto prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: preview }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-spethial-accent hover:bg-spethial-accent-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

