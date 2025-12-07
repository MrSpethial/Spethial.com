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
              className="text-sm text-gray-600 dark:text-spethial-muted hover:text-spethial-accent transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

