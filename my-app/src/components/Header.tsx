import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-5">
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-[var(--sea-ink)] transition hover:text-[var(--lagoon-deep)]"
        >
          TanStack<span className="text-[var(--lagoon-deep)]">Playground</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/products"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            About
          </Link>
          <Link
            to="/query"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            Query
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
