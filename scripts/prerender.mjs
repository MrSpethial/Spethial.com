#!/usr/bin/env node
/**
 * Prerender public routes into dist/ using Puppeteer + vite preview.
 * Skip with VITE_PRERENDER_SKIP=1 (e.g. CI without Chromium).
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPrerenderPaths } from './seo-routes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')

/** @returns {Promise<number>} */
function getFreePort() {
  if (process.env.PRERENDER_PORT) {
    return Promise.resolve(Number(process.env.PRERENDER_PORT))
  }
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
    server.on('error', reject)
  })
}

if (process.env.VITE_PRERENDER_SKIP === '1') {
  console.log('prerender: skipped (VITE_PRERENDER_SKIP=1)')
  process.exit(0)
}

const port = await getFreePort()

if (!fs.existsSync(distDir)) {
  console.error('prerender: dist/ not found. Run vite build first.')
  process.exit(1)
}

let puppeteer
try {
  puppeteer = (await import('puppeteer')).default
} catch {
  console.warn('prerender: puppeteer not installed — skipping static HTML generation')
  process.exit(0)
}

const paths = getPrerenderPaths()
let previewLog = ''
const preview = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'production' },
})
preview.stdout?.on('data', chunk => {
  previewLog += chunk.toString()
})
preview.stderr?.on('data', chunk => {
  previewLog += chunk.toString()
})

function waitForServer(timeoutMs = 60_000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(`http://127.0.0.1:${port}/`, res => {
        res.resume()
        resolve()
      })
      req.on('error', () => {
        if (Date.now() - started > timeoutMs) {
          reject(
            new Error(
              `preview server did not start on port ${port}${previewLog ? `\n${previewLog}` : ''}`
            )
          )
          return
        }
        setTimeout(tick, 250)
      })
    }
    tick()
  })
}

function killPreview() {
  if (!preview.killed) {
    preview.kill('SIGTERM')
    setTimeout(() => {
      if (!preview.killed) preview.kill('SIGKILL')
    }, 2000)
  }
}

preview.on('error', err => {
  console.error('prerender: failed to start preview server', err)
  process.exit(1)
})

try {
  await waitForServer()
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  for (const routePath of paths) {
    const url = `http://127.0.0.1:${port}${routePath}`
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
    // Allow react-helmet-async to flush title/meta into head
    await page.waitForFunction(() => document.title.length > 0, { timeout: 10_000 })
    const html = await page.content()
    writeRouteHtml(routePath, html)
    console.log(`prerender: ${routePath}`)
  }

  await browser.close()
  console.log(`prerender: done (${paths.length} routes)`)
} catch (err) {
  console.error('prerender:', err)
  process.exit(1)
} finally {
  killPreview()
}

/**
 * @param {string} routePath
 * @param {string} html
 */
function writeRouteHtml(routePath, html) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html)
    return
  }
  const segments = routePath.replace(/^\//, '').split('/')
  const dir = path.join(distDir, ...segments)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}
