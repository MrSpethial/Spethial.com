#!/usr/bin/env node
/**
 * Writes dist/sitemap.xml after vite build.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { readBlogPosts, STATIC_PATHS } from './seo-routes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const env = loadEnv('production', root, '')
const siteUrl = (process.env.VITE_SITE_URL ?? env.VITE_SITE_URL ?? 'https://www.spethial.com').replace(
  /\/$/,
  ''
)

const distDir = path.join(root, 'dist')
if (!fs.existsSync(distDir)) {
  console.error('generate-sitemap: dist/ not found. Run vite build first.')
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)

/** @type {{ loc: string, lastmod: string, changefreq: string, priority: string }[]} */
const urls = []

for (const routePath of STATIC_PATHS) {
  const loc = routePath === '/' ? siteUrl : `${siteUrl}${routePath}`
  urls.push({
    loc,
    lastmod: today,
    changefreq: routePath === '/' ? 'weekly' : 'monthly',
    priority: routePath === '/' ? '1.0' : '0.8',
  })
}

for (const post of readBlogPosts()) {
  urls.push({
    loc: `${siteUrl}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'yearly',
    priority: '0.7',
  })
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const outPath = path.join(distDir, 'sitemap.xml')
fs.writeFileSync(outPath, xml)
console.log(`generate-sitemap: wrote ${urls.length} URLs to ${outPath}`)

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
