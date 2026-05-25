import { Link, useLocation } from 'react-router-dom'
import { GitHubIcon } from './Icons'
import { trackClick } from '@/lib/analytics'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/travels', label: 'Travels' },
  { path: '/music', label: 'Music' },
  { path: '/lab', label: 'Lab' },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50" style={{ background: 'var(--bg)' }}>
      <nav className="flex items-center justify-between py-5 max-w-[var(--container)] mx-auto px-[var(--gutter)]">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-mono text-sm tracking-[0.08em] text-sp-ink hover:text-sp-ink transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-sp-teal" style={{ boxShadow: '0 0 12px var(--teal-glow)' }} />
          spethial
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ path, label }) => {
            const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
            return (
              <Link
                key={path}
                to={path}
                onClick={() => trackClick(label, path, 'header')}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-2 rounded-[var(--r-sm)] font-mono text-xs tracking-[0.08em] uppercase transition-colors duration-[var(--dur)] ${
                  isActive
                    ? 'text-sp-teal'
                    : 'text-sp-ink-soft hover:text-sp-ink hover:bg-sp-hairline'
                }`}
              >
                {label}
              </Link>
            )
          })}

          <a
            href="https://github.com/mrspethial/spethial.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('GitHub', 'https://github.com/mrspethial/spethial.com', 'header')}
            className="w-[34px] h-[34px] inline-flex items-center justify-center rounded-[var(--r-sm)] text-sp-ink-soft hover:text-sp-ink hover:bg-sp-hairline transition-colors duration-[var(--dur)]"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
