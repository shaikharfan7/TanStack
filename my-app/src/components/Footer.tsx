export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] px-4 py-6 text-sm text-[var(--sea-ink-soft)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p>Learning TanStack</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
         
          <a
            href="https://github.com/TanStack"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--lagoon-deep)] underline decoration-[var(--chip-line)] underline-offset-4 transition hover:decoration-current"
          >
            TanStack on GitHub ↗
          </a>
           <a
            href="https://github.com/shaikharfan7/TanStack"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--lagoon-deep)] underline decoration-[var(--chip-line)] underline-offset-4 transition hover:decoration-current"
          >
            Source code on GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
