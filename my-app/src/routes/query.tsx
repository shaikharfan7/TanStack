import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getProducts } from '../utils'

export const Route = createFileRoute('/query')({
  component: QueryDemo,
})

function QueryDemo() {
  const queryClient = useQueryClient()
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const lastUpdated = productsQuery.dataUpdatedAt
    ? new Date(productsQuery.dataUpdatedAt).toLocaleTimeString()
    : 'Not fetched yet'

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="mb-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
          Interactive example
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          TanStack Query
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--sea-ink-soft)]">
          This page uses <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 font-mono text-sm">useQuery</code> to fetch products through the existing server function.
          Query caches the result for 20 seconds, tracks request state, and can
          refresh stale data for you.
        </p>
      </section>

      <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--sea-ink)]">Cached products</h2>
            <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
              Query key: <code className="font-mono">['products']</code>
            </p>
          </div>
          <button
            type="button"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
            disabled={productsQuery.isFetching}
            className="rounded-full bg-[var(--palm)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            {productsQuery.isFetching ? 'Refreshing…' : 'Invalidate & refetch'}
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 rounded-2xl bg-[var(--chip-bg)] p-4 text-sm text-[var(--sea-ink-soft)]">
          <p>
            Status: <strong className="text-[var(--sea-ink)]">{productsQuery.status}</strong>
          </p>
          <p>
            Fetch: <strong className="text-[var(--sea-ink)]">{productsQuery.fetchStatus}</strong>
          </p>
          <p>
            Last updated: <strong className="text-[var(--sea-ink)]">{lastUpdated}</strong>
          </p>
        </div>

        {productsQuery.isPending ? (
          <p className="py-6 text-[var(--sea-ink-soft)]">Loading products…</p>
        ) : productsQuery.isError ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/5 p-5 text-sm text-red-700 dark:text-red-200">
            <p className="font-bold">Could not load products</p>
            <p className="mt-1">{productsQuery.error.message}</p>
            <button
              type="button"
              onClick={() => productsQuery.refetch()}
              className="mt-4 rounded-full border border-current px-4 py-2 font-semibold transition hover:bg-red-500/10"
            >
              Try again
            </button>
          </div>
        ) : productsQuery.data.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productsQuery.data.map((product) => (
              <li
                key={product.id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4 font-semibold text-[var(--sea-ink)]"
              >
                {product.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--line)] p-5 text-[var(--sea-ink-soft)]">
            No products found. Seed the database to populate this query.
          </p>
        )}
      </section>

      <p className="mt-5 text-sm leading-6 text-[var(--sea-ink-soft)]">
        Visit Products and return here to see the same <code className="font-mono">['products']</code> cache reused across routes.
      </p>
    </main>
  )
}
