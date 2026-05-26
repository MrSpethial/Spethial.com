#!/usr/bin/env node
/**
 * Prerender public routes into dist/ using Puppeteer + vite preview.
 * Skip with VITE_PRERENDER_SKIP=1.
 * On Vercel uses @sparticuz/chromium (stock Puppeteer Chrome misses system libs).
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

/** @returns {Promise<import('puppeteer').Browser>} */
async function launchBrowser() {
  const useVercelChromium = process.env.VERCEL === '1'

  if (useVercelChromium) {
    const chromium = (await import('@sparticuz/chromium')).default
    const puppeteer = (await import('puppeteer-core')).default
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }

  const puppeteer = (await import('puppeteer')).default
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

if (process.env.VITE_PRERENDER_SKIP === '1') {
  console.log('prerender: skipped (VITE_PRERENDER_SKIP=1)')
  process.exit(0)
}

if (!fs.existsSync(distDir)) {
  console.error('prerender: dist/ not found. Run vite build first.')
  process.exit(1)
}

const port = await getFreePort()
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
  console.warn('prerender: preview server failed — skipping:', err.message)
  process.exit(0)
})

try {
  await waitForServer()
  const browser = await launchBrowser()
  const page = await browser.newPage()

  for (const routePath of paths) {
    const url = `http://127.0.0.1:${port}${routePath}`
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
    await page.waitForFunction(() => document.title.length > 0, { timeout: 10_000 })
    const html = await page.content()
    writeRouteHtml(routePath, html)
    console.log(`prerender: ${routePath}`)
  }

  await browser.close()
  console.log(`prerender: done (${paths.length} routes)`)
} catch (err) {
  console.warn(
    'prerender: skipped — build continues without static HTML per route.',
    err instanceof Error ? err.message : err
  )
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
