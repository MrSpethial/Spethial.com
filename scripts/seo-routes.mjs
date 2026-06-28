#!/usr/bin/env node
/**
 * Shared public routes for sitemap generation and prerendering.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const STATIC_PATHS = ['/', '/blog', '/lab', '/travels', '/travels/japan', '/travels/japan/2026', '/music']

/** @returns {{ slug: string, date: string }[]} */
export function readBlogPosts() {
  const postsPath = path.join(root, 'src', 'data', 'posts.ts')
  const content = fs.readFileSync(postsPath, 'utf8')
  const posts = []
  const blockRe = /\{\s*slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g
  let match
  while ((match = blockRe.exec(content)) !== null) {
    posts.push({ slug: match[1], date: match[2] })
  }
  return posts
}

/** @returns {string[]} */
export function getPrerenderPaths() {
  const blogPaths = readBlogPosts().map(p => `/blog/${p.slug}`)
  return [...STATIC_PATHS, ...blogPaths]
}
