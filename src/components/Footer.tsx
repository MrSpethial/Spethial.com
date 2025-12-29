import { GitHubIcon } from './Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-spethial-border py-8 mt-auto">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-spethial-muted">
            © {currentYear} Spethial.com. Built with caffeine and curiosity.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mrspethial/spethial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-spethial-muted hover:text-spethial-accent transition-colors underline-offset-4 hover:underline"
              aria-label="View source code on GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

