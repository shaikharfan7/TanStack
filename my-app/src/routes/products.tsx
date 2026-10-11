import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '../utils'

export const Route = createFileRoute('/products')({
  component: Products,
  loader: async ()=>{
    const products = await getProducts()
        console.log("Hello world!")

    return {products}
  }
})

function Products() {
  const {products} = Route.useLoaderData()

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">The collection</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">Products</h1>
        <p className="mt-2 text-[var(--sea-ink-soft)]">A few things to explore in the database.</p>
      </div>
      {products.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="group flex min-h-36 flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--lagoon)] hover:bg-[var(--surface-strong)] hover:shadow-lg"
              >
                <span className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[var(--hero-a)] text-lg text-[var(--palm)]">✦</span>
                <span className="flex items-center justify-between gap-3 font-bold text-[var(--sea-ink)]">
                  {product.name}
                  <span className="text-[var(--lagoon-deep)] transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-[var(--line)] p-6 text-[var(--sea-ink-soft)]">
          No products yet. Seed the database to add a few examples.
        </p>
      )}
    </main>
  )
}
