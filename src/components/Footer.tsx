export default function Footer() {
  return (
    <footer className="py-12 border-t mt-auto" style={{ borderColor: 'var(--hairline)', color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', letterSpacing: 'var(--tr-base)' }}>
      <div className="flex items-center justify-between max-w-[var(--container)] mx-auto px-[var(--gutter)]">
        <span>© 2026 Spethial · built with caffeine and curiosity</span>
        <span>v0.1.0</span>
      </div>
    </footer>
  )
}
