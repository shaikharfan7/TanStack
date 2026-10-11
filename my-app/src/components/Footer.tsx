export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--line)] px-4 py-6 text-sm text-[var(--sea-ink-soft)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p>Learning TanStack by building things for fun.</p>
        <p>© {year} TanStack Playground</p>
      </div>
    </footer>
  )
}
