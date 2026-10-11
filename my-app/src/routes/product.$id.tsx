import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '../utils'

export const Route = createFileRoute('/product/$id')({
  loader: async ({ params }) => {
    const {id} = params
    console.log("Hello world!")
    const product = await getProductById({data:{id}})
    return {product}
  },
  component: RouteComponent,
})

function RouteComponent() {
    const {product} = Route.useLoaderData();
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
        {product ? (
          <article className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">Product details</p>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">{product.name}</h1>
            <p className="mb-6 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">{product.description}</p>
            <p className="text-sm text-[var(--sea-ink-soft)]">Last updated {product.updatedAt.toDateString()}</p>
          </article>
        ) : (
          <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-8">
            <h1 className="text-2xl font-bold text-[var(--sea-ink)]">Product not found</h1>
            <p className="mt-2 text-[var(--sea-ink-soft)]">This product may have been removed.</p>
          </section>
        )}
      </main>
    )
}
