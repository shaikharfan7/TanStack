import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import type { Product } from '@prisma/client'
import { getProducts } from '../utils'

export const Route = createFileRoute('/table')({
  component: TableDemo,
})

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-[var(--sea-ink-soft)]">
        {String(getValue()).slice(0, 12)}…
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Added',
    cell: ({ getValue }) =>
      new Date(getValue<Date>()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
  },
]

function TableDemo() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const table = useReactTable({
    data: productsQuery.data ?? [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  })

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="mb-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
          Interactive example
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          TanStack Table
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--sea-ink-soft)]">
          A headless table powered by <code className="rounded bg-[var(--chip-bg)] px-1.5 py-0.5 font-mono text-sm">useReactTable</code>.
          Search the product list, sort by a column, and move through pages.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--sea-ink)]">Products</h2>
            <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
              {productsQuery.isSuccess
                ? `${table.getFilteredRowModel().rows.length} of ${productsQuery.data.length} products`
                : 'Loading product data'}
            </p>
          </div>
          <label className="flex w-full max-w-sm flex-col gap-1.5 text-xs font-semibold text-[var(--sea-ink-soft)]">
            Filter products
            <input
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder="Search name or ID…"
              className="rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2.5 text-sm font-normal text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon-deep)] focus:ring-2 focus:ring-[var(--hero-a)]"
            />
          </label>
        </div>

        {productsQuery.isPending ? (
          <p className="p-6 text-[var(--sea-ink-soft)]">Loading products…</p>
        ) : productsQuery.isError ? (
          <div className="p-6 text-sm text-red-700 dark:text-red-200">
            Could not load products: {productsQuery.error.message}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                <thead className="bg-[var(--chip-bg)] text-xs uppercase tracking-wider text-[var(--sea-ink-soft)]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-5 py-4 font-bold sm:px-6">
                          {header.isPlaceholder ? null : (
                            <button
                              type="button"
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={!header.column.getCanSort()}
                              className="inline-flex items-center gap-2 transition hover:text-[var(--sea-ink)] disabled:cursor-default"
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <span aria-hidden="true">
                                {{ asc: '↑', desc: '↓' }[header.column.getIsSorted() as string] ?? '↕'}
                              </span>
                            </button>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="transition hover:bg-[var(--link-bg-hover)]">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-5 py-4 text-[var(--sea-ink)] sm:px-6">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-10 text-center text-[var(--sea-ink-soft)]">
                        No products match that search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] px-5 py-4 sm:px-6">
              <p className="text-sm text-[var(--sea-ink-soft)]">
                Page <strong className="text-[var(--sea-ink)]">{table.getState().pagination.pageIndex + 1}</strong> of{' '}
                <strong className="text-[var(--sea-ink)]">{Math.max(table.getPageCount(), 1)}</strong>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="rounded-full border border-[var(--chip-line)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="rounded-full border border-[var(--chip-line)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
