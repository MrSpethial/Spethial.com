# Google Analytics (GA4) — operations checklist

## Vercel

| Setting | Value |
|---------|--------|
| Variable name | `VITE_GA_MEASUREMENT_ID` |
| Example value | `G-XXXXXXXXXX` (from GA4 Admin → Data streams) |
| Scope | Production (required); Preview optional |

After any change: trigger a **new production deployment**.

## Page coverage

| Route | Page views | Custom events |
|-------|------------|---------------|
| `/` | HTML snippet (first load) + SPA on navigate away/back | `click` (hero, prototype cards, header) |
| `/blog` | SPA `trackPageViewAfterTitle` | `click` (featured, list) |
| `/blog/:slug` | SPA | `blog_post_view` |
| `/lab` | SPA | `lab_filter` (category + chip) |
| `/travels` | SPA | `travel_filter`, `travel_sort`, `travel_view_mode`, `travel_country_click` |
| `/music` | SPA | `click` (Spotify links) |
| `/admin` | Excluded from SPA page views | — |
| `/playground` | Redirects to `/lab` | — |

**Initial load:** one `page_view` from the HTML gtag snippet only (SPA tracker skips the first navigation).

**SPA navigations:** `trackPageViewAfterTitle` waits for `react-helmet-async` to update `document.title` (double `requestAnimationFrame`).

## GA4 Admin setup (manual)

### Enhanced measurement

1. GA4 → **Admin** → **Data streams** → your Web stream.
2. **Enhanced measurement** → ensure toggles match your needs:
   - **Page views** — leave on (works with the HTML snippet + SPA updates).
   - **Outbound clicks** — optional; overlaps with custom `click` events. Enable one approach to avoid duplicate outbound reporting.
   - **Scrolls**, **File downloads**, **Site search** — enable if useful.
3. Save.

### Custom dimensions (event-scoped)

Register these so they appear in Explorations and standard reports:

| Dimension name | Event parameter | Used by |
|----------------|-----------------|---------|
| Link location | `link_location` | `click` |
| Post slug | `post_slug` | `blog_post_view` |
| Filter source | `filter_source` | `lab_filter` (values: `category`, `chip`) |

Steps: **Admin** → **Custom definitions** → **Create custom dimension** → Scope: **Event** → Parameter name as above.

### Conversions (optional)

**Admin** → **Events** → mark as key events if desired:

- `blog_post_view`
- `click` (only if you use clicks as goals; can be noisy)

### Data stream URL

Stream URL should match how users visit (`https://www.spethial.com` or `https://spethial.com`, consistently).

## Custom events (spot-check in Realtime)

| Event | Where |
|-------|--------|
| `page_view` | First load (HTML snippet); SPA route changes |
| `click` | Header (nav, logo, GitHub), home hero + prototypes, blog, music |
| `blog_post_view` | Opening a blog post |
| `lab_filter` | Lab category cards + filter chips |
| `travel_filter`, `travel_sort`, `travel_view_mode`, `travel_country_click` | Travels page |

## Implementation note

GA is injected via the **official HTML gtag snippet** at the top of `<head>` during `vite build`. SPA route changes use [`src/lib/analytics.ts`](../src/lib/analytics.ts) (`trackPageViewAfterTitle`).

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| No `gtag/js` in Network | Missing env at build time; redeploy after setting `VITE_GA_MEASUREMENT_ID` |
| gtag loads, no `collect` | Fixed by HTML snippet (2026-05); redeploy if still broken |
| Two `collect` on first load | Fixed: SPA tracker skips first navigation |
| Wrong page title in GA4 | Fixed: deferred tracking after Helmet updates title |
| gtag loads, no Realtime | Ad blocker, wrong GA property, or stream domain mismatch |
| Works in preview, not dev | Expected — use `VITE_GA_ENABLE_IN_DEV=true` or `npm run preview` |
