# Spethial.com

A personal website and blog built with React, Vite, and TypeScript. Part homepage, part blog, part experimental playground.

> Spethial.com – Proof that one Product Manager + caffeine can do anything… eventually.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown + JSX for blog posts
- **React Router** - Client-side routing
- **react-helmet-async** - Document head management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mrspethial/spethial.com.git
cd spethial.com

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Page footer
│   ├── Layout.tsx       # Main layout wrapper
│   ├── SEO.tsx          # Meta tags component
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── MottoDisplay.tsx # Random motto component
├── pages/               # Route pages
│   ├── Home.tsx         # Homepage
│   ├── Blog.tsx         # Blog listing
│   ├── BlogPost.tsx     # Individual post view
│   └── Playground.tsx   # Experimental area
├── posts/               # MDX blog posts
│   └── hello-world.mdx  # Sample post
├── data/                # Static data
│   ├── mottos.ts        # Funny taglines
│   └── posts.ts         # Blog post metadata
├── hooks/               # Custom React hooks
│   └── useTheme.ts      # Theme state management
├── types/               # TypeScript declarations
│   └── mdx.d.ts         # MDX module types
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Features

- **Dark Mode** - Class-based dark mode with localStorage persistence
- **Responsive Design** - Works on desktop, tablet, and mobile
- **SEO Ready** - Meta tags and Open Graph support on all pages
- **MDX Blog** - Write blog posts in Markdown with React components
- **Playground** - Experimental section for testing ideas

## Adding Blog Posts

1. Create a new `.mdx` file in `src/posts/`
2. Add the post metadata to `src/data/posts.ts`
3. Import the MDX component in `src/pages/BlogPost.tsx`

Example post metadata:

```typescript
{
  slug: 'my-new-post',
  title: 'My New Post',
  description: 'A brief description of the post.',
  date: '2024-12-07',
  tags: ['tag1', 'tag2'],
}
```

## Deployment

This site is configured for deployment on [Vercel](https://vercel.com).

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Vite and configure the build
4. Done! Your site will be live.

The `vercel.json` file is already configured for SPA routing.

## Color Palette

The site uses a Cursor-inspired dark theme:

| Token | Hex | Usage |
|-------|-----|-------|
| `spethial-bg` | `#0a0a0a` | Background |
| `spethial-surface` | `#141414` | Cards, surfaces |
| `spethial-border` | `#262626` | Borders |
| `spethial-muted` | `#525252` | Muted text |
| `spethial-text` | `#e5e5e5` | Primary text |
| `spethial-accent` | `#3b82f6` | Links, highlights |
| `spethial-accent-hover` | `#60a5fa` | Hover states |

## License

MIT
