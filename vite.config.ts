import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import path from 'path'
import fs from 'fs'
import type { ViteDevServer } from 'vite'

// Blog post API middleware (dev mode only)
function blogApiPlugin() {
  return {
    name: 'blog-api',
    configureServer(server: ViteDevServer) {
      // GET /__api/posts - List all posts with content
      server.middlewares.use('/__api/posts', async (req, res, next) => {
        if (req.method === 'GET' && req.url === '/') {
          try {
            const postsDir = path.resolve(__dirname, 'src/posts')
            const postsDataPath = path.resolve(__dirname, 'src/data/posts.ts')
            
            // Read posts.ts to get metadata
            const postsDataContent = fs.readFileSync(postsDataPath, 'utf-8')
            
            // Parse posts array from the file
            const postsMatch = postsDataContent.match(/export const posts: BlogPost\[\] = \[([\s\S]*?)\]/)
            if (!postsMatch) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Could not parse posts' }))
              return
            }
            
            // Get list of MDX files
            const mdxFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
            
            // Read each post's content
            const posts = mdxFiles.map(file => {
              const slug = file.replace('.mdx', '')
              const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
              return { slug, content }
            })
            
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ posts, postsDataContent }))
          } catch (error) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(error) }))
          }
          return
        }
        next()
      })

      // POST /__api/posts - Create new post
      server.middlewares.use('/__api/posts/create', async (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              const { slug, title, description, date, tags, content } = JSON.parse(body)
              
              const postsDir = path.resolve(__dirname, 'src/posts')
              const postsDataPath = path.resolve(__dirname, 'src/data/posts.ts')
              const blogPostPath = path.resolve(__dirname, 'src/pages/BlogPost.tsx')
              
              // 1. Write MDX file
              const mdxPath = path.join(postsDir, `${slug}.mdx`)
              fs.writeFileSync(mdxPath, content)
              
              // 2. Update posts.ts
              let postsData = fs.readFileSync(postsDataPath, 'utf-8')
              const tagsStr = tags && tags.length > 0 ? `\n    tags: [${tags.map((t: string) => `'${t}'`).join(', ')}],` : ''
              const newPostEntry = `  {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    date: '${date}',${tagsStr}
  },`
              
              // Insert after the opening bracket of the posts array
              postsData = postsData.replace(
                /export const posts: BlogPost\[\] = \[/,
                `export const posts: BlogPost[] = [\n${newPostEntry}`
              )
              fs.writeFileSync(postsDataPath, postsData)
              
              // 3. Update BlogPost.tsx imports
              let blogPostData = fs.readFileSync(blogPostPath, 'utf-8')
              const importLine = `  '${slug}': lazy(() => import('@/posts/${slug}.mdx')),`
              
              // Add the new import after the opening brace
              blogPostData = blogPostData.replace(
                /const postComponents: Record<string, React\.LazyExoticComponent<React\.ComponentType>> = \{/,
                `const postComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {\n${importLine}`
              )
              fs.writeFileSync(blogPostPath, blogPostData)
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, slug }))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(error) }))
            }
          })
          return
        }
        next()
      })

      // PUT /__api/posts/update - Update existing post
      server.middlewares.use('/__api/posts/update', async (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              const { slug, title, description, date, tags, content } = JSON.parse(body)
              
              const postsDir = path.resolve(__dirname, 'src/posts')
              const postsDataPath = path.resolve(__dirname, 'src/data/posts.ts')
              
              // 1. Update MDX file
              const mdxPath = path.join(postsDir, `${slug}.mdx`)
              fs.writeFileSync(mdxPath, content)
              
              // 2. Update posts.ts metadata
              let postsData = fs.readFileSync(postsDataPath, 'utf-8')
              
              // Find and replace the post entry
              const tagsStr = tags && tags.length > 0 ? `\n    tags: [${tags.map((t: string) => `'${t}'`).join(', ')}],` : ''
              const newPostEntry = `{
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    date: '${date}',${tagsStr}
  }`
              
              // Match the existing post entry and replace it
              const postRegex = new RegExp(`\\{[\\s\\S]*?slug:\\s*'${slug}'[\\s\\S]*?\\}`, 'g')
              postsData = postsData.replace(postRegex, newPostEntry)
              fs.writeFileSync(postsDataPath, postsData)
              
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, slug }))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(error) }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    blogApiPlugin(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkGfm],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
