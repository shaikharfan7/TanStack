import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 sm:py-20">
      <section className="relative w-full overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7 shadow-xl shadow-emerald-950/5 sm:p-12">
        <div className="absolute -right-20 -top-24 size-64 rounded-full bg-[var(--hero-a)] blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            A little project, a lot of learning
          </p>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            Learn by making something real.
          </h1>
          <p className="mb-8 max-w-xl text-base leading-7 text-[var(--sea-ink-soft)] sm:text-lg">
            A hands-on TanStack playground for exploring routes, server data,
            and the little details that make an app feel complete.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-full bg-[var(--palm)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Browse products
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 text-sm font-bold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
            >
              About this project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
