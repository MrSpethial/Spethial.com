# Google Analytics (GA4) — operations checklist

## Vercel

| Setting | Value |
|---------|--------|
| Variable name | `VITE_GA_MEASUREMENT_ID` |
| Example value | `G-XXXXXXXXXX` (from GA4 Admin → Data streams) |
| Scope | Production (required); Preview optional |

After any change: trigger a **new production deployment**.

## GA4 property

1. **Admin → Data streams → Web** — stream URL should match how users reach the site (`https://spethial.com` or `https://www.spethial.com`, consistently).
2. **Reports → Realtime** — confirm active users while testing.
3. **Admin → DebugView** — optional; enable debug in browser with [GA Debugger extension](https://chrome.google.com/webstore/detail/google-analytics-debugger) or temporary `debug_mode` in gtag config.

## Custom events (spot-check in Realtime)

| Event | Where |
|-------|--------|
| `page_view` | Every load and SPA route change |
| `click` | Header nav, home/blog CTAs |
| `blog_post_view` | Opening a blog post |
| `travel_filter`, `travel_sort`, `travel_view_mode`, `travel_country_click` | Travels page |

## Implementation note

GA is injected via the **official HTML gtag snippet** at the top of `<head>` during `vite build` (not from a late-loaded JS module). Late dynamic injection caused `gtag.js` to load without any `g/collect` hits in Chrome.

SPA route changes still call `trackPageView()` from [`src/lib/analytics.ts`](../src/lib/analytics.ts).

## Verification log (2026-05-26)

- **Before fix:** `gtag.js` returned 200 but Network filter `collect` was empty in Chrome and Brave.
- **After fix (local preview):** `https://www.google-analytics.com/g/collect?...&tid=G-…` returns 204.
- **GA4 dashboard** (manual after deploy): Reports → Realtime while browsing with ad blockers off.

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| No `gtag/js` in Network | Missing env at build time; redeploy after setting `VITE_GA_MEASUREMENT_ID` |
| gtag loads, no Realtime | Ad blocker, wrong GA property, or stream domain mismatch |
| Works in preview, not dev | Expected — use `VITE_GA_ENABLE_IN_DEV=true` or `npm run preview` |
