import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const demos = [
  {
    to: '/products',
    name: 'Products',
    description: 'Browse the product collection backed by Prisma and SQLite.',
    mark: '✦',
  },
  {
    to: '/query',
    name: 'TanStack Query',
    description: 'Explore server-state fetching, caching, and query invalidation.',
    mark: 'Q',
  },
  {
    to: '/table',
    name: 'TanStack Table',
    description: 'Search, sort, and paginate product data in a headless table.',
    mark: '▤',
  },
  {
    to: '/virtual',
    name: 'TanStack Virtual',
    description: 'Scroll a long list while rendering only visible rows.',
    mark: '⇵',
  },
  {
    to: '/ranger',
    name: 'TanStack Ranger',
    description: 'Try a keyboard-accessible, multi-handle range slider.',
    mark: '⌁',
  },
  {
    to: '/form',
    name: 'TanStack Form',
    description: 'Practice typed form state, field validation, and submission.',
    mark: '✓',
  },
] as const

function App() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-7 shadow-xl shadow-emerald-950/5 sm:mb-12 sm:p-12">
        <div className="absolute -right-20 -top-24 size-64 rounded-full bg-[var(--hero-a)] blur-3xl" />
        <div className="relative max-w-2xl">
          {/* <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            A little project, a lot of learning
          </p> */}
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Learning TanStack
          </h1>
          <p className="mb-8 max-w-xl text-base leading-7 text-[var(--sea-ink-soft)] sm:text-lg">
            A hands-on TanStack playground for exploring routes, server data,
            and the little details that make an app feel complete.
          </p>
          {/* <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-full bg-[var(--palm)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Browse products
            </Link>
          </div> */}
        </div>
      </section>

      <section aria-labelledby="demos-heading">
        <div className="mb-5">
          <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            Explore the demos
          </p>
          <h2
            id="demos-heading"
            className="text-2xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-3xl"
          >
            Pick a TanStack tool to explore.
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <li key={demo.to}>
              <Link
                to={demo.to}
                className="group flex h-full min-h-48 flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--lagoon)] hover:bg-[var(--surface-strong)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lagoon-deep)]"
              >
                <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-[var(--hero-a)] text-lg font-bold text-[var(--palm)]">
                  {demo.mark}
                </span>
                <span className="flex items-center justify-between gap-3 font-bold text-[var(--sea-ink)]">
                  {demo.name}
                  <span className="text-[var(--lagoon-deep)] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
                  {demo.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
