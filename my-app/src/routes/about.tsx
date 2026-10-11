import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">About</p>
        <h1 className="mb-4 max-w-2xl text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  )
}
