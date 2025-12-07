import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

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
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-spethial-text hover:text-spethial-accent dark:hover:text-spethial-accent transition-colors"
          >
            Spethial
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? 'bg-spethial-accent/10 text-spethial-accent'
                    : 'text-gray-600 dark:text-spethial-muted hover:text-gray-900 dark:hover:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-surface'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* GitHub Link */}
            <a
              href="https://github.com/mrspethial/spethial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-spethial-muted hover:text-gray-900 dark:hover:text-spethial-text hover:bg-gray-100 dark:hover:bg-spethial-surface transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

