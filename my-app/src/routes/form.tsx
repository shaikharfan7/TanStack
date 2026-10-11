import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

export const Route = createFileRoute('/form')({
  component: FormDemo,
})

function FormDemo() {
  const [submittedValues, setSubmittedValues] = useState<{
    name: string
    description: string
  } | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    onSubmit: ({ value }) => {
      setSubmittedValues({
        name: value.name.trim(),
        description: value.description.trim(),
      })
    },
  })

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="mb-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
          Interactive example
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          TanStack Form
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--sea-ink-soft)]">
          Explore type-safe fields, inline validation, and submission state.
          Submitted values stay in this page’s memory as a preview; nothing is
          sent to the server or saved in the database.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
        <form
          className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm sm:p-8"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--sea-ink)]">Product form</h2>
            <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
              Name is required; description is optional.
            </p>
          </div>

          <div className="space-y-5">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const name = value.trim()
                  if (name.length === 0) return 'Please enter a product name.'
                  if (name.length > 80) return 'Keep the name to 80 characters or fewer.'
                  return undefined
                },
              }}
            >
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-semibold text-[var(--sea-ink)]"
                  >
                    Product name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    maxLength={80}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="e.g. Trail running shoes"
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    aria-describedby={`${field.name}-hint`}
                    className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-3 text-sm text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon-deep)] focus:ring-2 focus:ring-[var(--hero-a)]"
                  />
                  <p id={`${field.name}-hint`} className="mt-1.5 text-xs text-[var(--sea-ink-soft)]">
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0
                      ? field.state.meta.errors.join(', ')
                      : `${field.state.value.length}/80 characters`}
                  </p>
                </div>
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  value.length > 240
                    ? 'Keep the description to 240 characters or fewer.'
                    : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-semibold text-[var(--sea-ink)]"
                  >
                    Description
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    maxLength={240}
                    rows={4}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="What makes this product useful?"
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    aria-describedby={`${field.name}-hint`}
                    className="w-full resize-y rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-3 text-sm leading-6 text-[var(--sea-ink)] outline-none transition placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon-deep)] focus:ring-2 focus:ring-[var(--hero-a)]"
                  />
                  <p id={`${field.name}-hint`} className="mt-1.5 text-xs text-[var(--sea-ink-soft)]">
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0
                      ? field.state.meta.errors.join(', ')
                      : `${field.state.value.length}/240 characters`}
                  </p>
                </div>
              )}
            </form.Field>
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="mt-6 rounded-full bg-[var(--palm)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting…' : 'Preview submitted values'}
              </button>
            )}
          </form.Subscribe>
        </form>

        <aside className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 sm:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
            Form state
          </p>
          <h2 className="text-xl font-bold text-[var(--sea-ink)]">Submit and see what happens</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
            TanStack Form tracks each field, runs validation, and manages
            submission. Only the latest submission is kept in React state.
          </p>

          {submittedValues ? (
            <div role="status" className="mt-6 rounded-2xl border border-[var(--chip-line)] bg-[var(--chip-bg)] p-4">
              <p className="font-bold text-[var(--sea-ink)]">Submitted preview</p>
              <p className="mt-3 font-semibold text-[var(--sea-ink)]">{submittedValues.name}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
                {submittedValues.description || 'No description provided.'}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--kicker)]">
                In memory only · not saved
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--line)] p-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
              Submit the form to preview the values here. Submitting again
              replaces this preview; no database records are created.
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}
