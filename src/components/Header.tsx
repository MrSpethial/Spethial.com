import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { GitHubIcon } from './Icons'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/playground', label: 'Playground' },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-spethial-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-spethial-border">
      <div className="container-main">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-spethial-text hover:text-spethial-accent transition-colors">
            Spethial
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-spethial-accent/10 text-spethial-accent'
                    : 'text-gray-600 dark:text-spethial-muted hover:text-gray-900 dark:hover:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-surface'
                }`}
              >
                {label}
              </Link>
            ))}

            <a
              href="https://github.com/mrspethial/spethial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-spethial-muted hover:text-gray-900 dark:hover:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-surface transition-colors"
              aria-label="GitHub Repository"
            >
              <GitHubIcon />
            </a>

            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
