#!/usr/bin/env node
/**
 * Post-build check: production bundles must include GA4 gtag loader and measurement ID.
 * Skipped when VITE_GA_SKIP_VALIDATION=1 (e.g. partial CI without secrets).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distAssets = path.join(root, 'dist', 'assets')
const env = loadEnv('production', root, '')
const skip = process.env.VITE_GA_SKIP_VALIDATION ?? env.VITE_GA_SKIP_VALIDATION

if (skip === '1') {
  console.log('verify-analytics-build: skipped (VITE_GA_SKIP_VALIDATION=1)')
  process.exit(0)
}

const measurementId = process.env.VITE_GA_MEASUREMENT_ID ?? env.VITE_GA_MEASUREMENT_ID
if (!measurementId) {
  console.error(
 'verify-analytics-build: VITE_GA_MEASUREMENT_ID is not set. Production builds must include GA4.'
  )
  process.exit(1)
}

if (!fs.existsSync(distAssets)) {
  console.error('verify-analytics-build: dist/assets not found. Run vite build first.')
  process.exit(1)
}

const indexHtml = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8')
const jsFiles = fs.readdirSync(distAssets).filter((f) => f.endsWith('.js'))
const combined = jsFiles.map((f) => fs.readFileSync(path.join(distAssets, f), 'utf8')).join('\n')

const required = [
  'googletagmanager.com/gtag/js',
  measurementId,
  'send_page_view',
]

const missing = required.filter(
  (needle) => !indexHtml.includes(needle) && !combined.includes(needle)
)
if (missing.length > 0) {
  console.error(
    'verify-analytics-build: production bundle is missing GA4 artifacts:',
    missing.join(', ')
  )
  process.exit(1)
}

console.log(`verify-analytics-build: OK (${measurementId} present in ${jsFiles.length} chunk(s))`)
