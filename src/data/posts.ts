export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    description: 'Welcome to Spethial.com - a new beginning for thoughts, experiments, and caffeine-fueled adventures.',
    date: '2024-12-07',
    tags: ['meta', 'introduction'],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

