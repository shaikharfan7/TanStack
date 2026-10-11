import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const linkClassName =
    'rounded-xl px-3 py-2 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] md:rounded-full'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="relative mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4">
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-[var(--sea-ink)] transition hover:text-[var(--lagoon-deep)]"
          onClick={closeMenu}
        >
          TanStack<span className="text-[var(--lagoon-deep)]">Playground</span>
        </Link>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lagoon-deep)] md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <div
          id="primary-navigation"
          className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full z-50 mt-2 flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--header-bg)] p-3 shadow-xl backdrop-blur-lg md:static md:mt-0 md:flex md:flex-row md:items-center md:justify-end md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
        >
          <Link
            to="/products"
            className={linkClassName}
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link
            to="/query"
            className={linkClassName}
            onClick={closeMenu}
          >
            Query
          </Link>
          <Link
            to="/table"
            className={linkClassName}
            onClick={closeMenu}
          >
            Table
          </Link>
          <Link
            to="/virtual"
            className={linkClassName}
            onClick={closeMenu}
          >
            Virtual
          </Link>
          <Link
            to="/ranger"
            className={linkClassName}
            onClick={closeMenu}
          >
            Ranger
          </Link>
          <Link
            to="/form"
            className={linkClassName}
            onClick={closeMenu}
          >
            Form
          </Link>
          <Link
            to="/about"
            className={linkClassName}
            onClick={closeMenu}
          >
            About
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
