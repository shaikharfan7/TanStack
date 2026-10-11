import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const features = [
    {
      name: 'TanStack Start',
      description: 'Full-stack React app with file-based, type-safe routing.',
      mark: '↗',
    },
    {
      name: 'TanStack Query',
      description: 'Fetch, cache, and refresh server data with query invalidation.',
      mark: 'Q',
    },
    {
      name: 'TanStack Table',
      description: 'A headless product table with search, sorting, and pagination.',
      mark: '▤',
    },
    {
      name: 'TanStack Virtual',
      description: 'Render a long list efficiently by mounting visible rows only.',
      mark: '⇵',
    },
    {
      name: 'TanStack Ranger',
      description: 'An interactive, keyboard-friendly multi-handle range slider.',
      mark: '⌁',
    },
    {
      name: 'TanStack Form',
      description: 'Type-safe form state and validation with an in-memory submission preview.',
      mark: '✓',
    },
    {
      name: 'Prisma + SQLite',
      description: 'A simple local database for the product browsing example.',
      mark: '◈',
    },
  ]

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-[var(--hero-a)] blur-3xl" />
        <div className="relative">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            About this project
          </p>
          <h1 className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
            Learning TanStack by coding manually for fun.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
            A hands-on playground for exploring the TanStack ecosystem through
            small, working examples—built one feature at a time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://github.com/TanStack"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--palm)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Explore TanStack on GitHub ↗
            </a>
            <a
              href="https://github.com/shaikharfan7/TanStack"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-3 text-sm font-bold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
            >
              Browse source on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-5">
          <p className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            What I’m exploring
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-3xl">
            One playground, many TanStack tools.
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] hover:shadow-md"
            >
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--hero-a)] text-lg font-bold text-[var(--palm)]">
                {feature.mark}
              </span>
              <h3 className="mb-1 font-bold text-[var(--sea-ink)]">{feature.name}</h3>
              <p className="text-sm leading-6 text-[var(--sea-ink-soft)]">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 sm:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            Try it locally
          </p>
          <h2 className="mb-3 text-xl font-extrabold text-[var(--sea-ink)]">
            Get the playground running
          </h2>
          <p className="mb-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
            From the repository root, enter <span className="font-mono">my-app</span>,
            install dependencies, then prepare the local database and start the app.
          </p>
          <pre className="overflow-x-auto rounded-2xl bg-[var(--chip-bg)] p-4 text-sm leading-6 text-[var(--sea-ink)]"><code>{'cd my-app\nnpm install\ncp .env.example .env\nnpm run db:push\nnpm run db:seed\nnpm run dev'}</code></pre>
          <p className="mt-3 text-xs leading-5 text-[var(--sea-ink-soft)]">
            The development server runs at <span className="font-mono">localhost:3000</span>.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            A note about data
          </p>
          <h2 className="mb-3 text-xl font-extrabold text-[var(--sea-ink)]">
            Local SQLite database
          </h2>
          <p className="mb-5 text-sm leading-6 text-[var(--sea-ink-soft)]">
            Prisma stores the sample products in SQLite. The seed can be run
            again safely. The checked-in database is for this learning demo;
            deployments that need durable writes require persistent storage.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2.5 text-sm font-bold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
          >
            Explore products <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
