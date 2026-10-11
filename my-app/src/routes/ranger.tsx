import { createFileRoute } from '@tanstack/react-router'
import { useRanger } from '@tanstack/react-ranger'
import { useRef, useState } from 'react'
import type { Ranger } from '@tanstack/react-ranger'

export const Route = createFileRoute('/ranger')({
  component: RangerDemo,
})

const MIN_PRICE = 0
const MAX_PRICE = 1_000
const PRICE_TICKS = [0, 250, 500, 750, 1_000]

function RangerDemo() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<ReadonlyArray<number>>([200, 700])
  const ranger = useRanger<HTMLDivElement>({
    getRangerElement: () => trackRef.current,
    values,
    min: MIN_PRICE,
    max: MAX_PRICE,
    stepSize: 25,
    ticks: PRICE_TICKS,
    onChange: (instance: Ranger<HTMLDivElement>) => {
      setValues(instance.sortedValues)
    },
    onDrag: (instance: Ranger<HTMLDivElement>) => {
      setValues(instance.sortedValues)
    },
  })

  const [lowPrice, highPrice] = ranger.sortedValues

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
      <section className="mb-8 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-lg shadow-emerald-950/5 sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--kicker)]">
          Interactive example
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          TanStack Ranger
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-[var(--sea-ink-soft)]">
          Ranger provides the behavior for this multi-handle slider; the track,
          handles, labels, and styling are rendered by this page. Drag either
          handle or focus it and use the arrow keys.
        </p>
      </section>

      <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm sm:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--sea-ink-soft)]">Price range</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--sea-ink)]">
              ${lowPrice?.toLocaleString()} – ${highPrice?.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setValues([200, 700])}
            className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)]"
          >
            Reset range
          </button>
        </div>

        <div className="px-3 pb-8 pt-2 sm:px-5">
          <div
            ref={trackRef}
            className="relative h-10 touch-none"
            role="group"
            aria-label="Choose a price range"
          >
            <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--line)]" />
            <div
              className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--lagoon-deep)]"
              style={{
                left: `${ranger.getPercentageForValue(lowPrice ?? MIN_PRICE)}%`,
                width: `${ranger.getPercentageForValue(highPrice ?? MAX_PRICE) - ranger.getPercentageForValue(lowPrice ?? MIN_PRICE)}%`,
              }}
            />

            {ranger.handles().map(
              ({ value, isActive, onKeyDownHandler, onMouseDownHandler, onTouchStart }, index) => (
                <button
                  key={index}
                  type="button"
                  role="slider"
                  aria-label={index === 0 ? 'Minimum price' : 'Maximum price'}
                  aria-valuemin={MIN_PRICE}
                  aria-valuemax={MAX_PRICE}
                  aria-valuenow={value}
                  aria-valuetext={`$${value.toLocaleString()}`}
                  onKeyDown={onKeyDownHandler}
                  onMouseDown={onMouseDownHandler}
                  onTouchStart={onTouchStart}
                  className={`absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[var(--palm)] shadow-md outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-[var(--lagoon-deep)] ${isActive ? 'z-10 scale-110' : 'z-0'}`}
                  style={{ left: `${ranger.getPercentageForValue(value)}%` }}
                />
              ),
            )}

            {ranger.getTicks().map(({ value, key, percentage }) => (
              <div
                key={key}
                className="absolute top-8 -translate-x-1/2 text-xs text-[var(--sea-ink-soft)]"
                style={{ left: `${percentage}%` }}
              >
                ${value}
              </div>
            ))}
          </div>
        </div>

        <p className="rounded-2xl bg-[var(--chip-bg)] p-4 text-sm leading-6 text-[var(--sea-ink-soft)]">
          Values snap in $25 increments between $0 and $1,000. Try dragging
          either handle, or tab to it and use the left/right arrow keys.
        </p>
      </section>
    </main>
  )
}