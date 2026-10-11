import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef } from 'react'
import { getProducts } from '../utils'

export const Route = createFileRoute('/virtual')({
  component: VirtualDemo,
})

const DEMO_ROW_COUNT = 1_000
const ROW_HEIGHT = 68

function VirtualDemo() {
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const demoRows = useMemo(() => {
    const products = productsQuery.data ?? []
    if (products.length === 0) return []

    return Array.from({ length: DEMO_ROW_COUNT }, (_, index) => ({
      id: index + 1,
      name: products[index % products.length]!.name,
    }))
  }, [productsQuery.data])

  const virtualizer = useVirtualizer({
    count: demoRows.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
  })

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="mb-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
          Interactive example
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          TanStack Virtual
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--sea-ink-soft)]">
          Scroll through a thousand demo rows. The virtualizer only mounts the
          visible rows and a small overscan, rather than rendering the whole list.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-bold text-[var(--sea-ink)]">Product list</h2>
            <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
              {productsQuery.isSuccess
                ? `${demoRows.length.toLocaleString()} total rows`
                : 'Loading product data'}
            </p>
          </div>
          {productsQuery.isSuccess && demoRows.length > 0 && (
            <p className="rounded-full bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink-soft)]">
              Rendering {virtualizer.getVirtualItems().length} rows at a time
            </p>
          )}
        </div>

        {productsQuery.isPending ? (
          <p className="p-6 text-[var(--sea-ink-soft)]">Loading products…</p>
        ) : productsQuery.isError ? (
          <p className="p-6 text-sm text-red-700 dark:text-red-200">
            Could not load products: {productsQuery.error.message}
          </p>
        ) : demoRows.length === 0 ? (
          <p className="p-6 text-[var(--sea-ink-soft)]">Add products to the database to populate this demo.</p>
        ) : (
          <div
            ref={scrollElementRef}
            className="h-[420px] overflow-auto overscroll-contain"
            aria-label="Virtualized product list"
          >
            <ol
              className="relative m-0 list-none p-0"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = demoRows[virtualRow.index]!
                return (
                  <li
                    key={virtualRow.key}
                    className="absolute left-0 top-0 flex w-full items-center justify-between border-b border-[var(--line)] px-5 sm:px-6"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--hero-a)] text-xs font-bold text-[var(--palm)]">
                        {row.id}
                      </span>
                      <span className="truncate font-semibold text-[var(--sea-ink)]">
                        {row.name} <span className="font-normal text-[var(--sea-ink-soft)]">— demo row {row.id}</span>
                      </span>
                    </span>
                    <span className="ml-3 shrink-0 font-mono text-xs text-[var(--sea-ink-soft)]">
                      {row.id.toString().padStart(4, '0')}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </section>

      <p className="mt-5 text-sm leading-6 text-[var(--sea-ink-soft)]">
        Demo names are drawn from the Prisma product list and repeated to create
        a larger set. Row positions and the scrollable height are managed by{' '}
        <code className="font-mono">useVirtualizer</code>.
      </p>
    </main>
  )
}
