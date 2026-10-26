import Link from 'next/link'
import { booksInRack, type Rack } from '@/lib/library'
import { cn } from '@/lib/utils'

export function RackDiagram({
  rack,
  highlight,
}: {
  rack: Rack
  highlight?: { shelf: number; position: number }
}) {
  const books = booksInRack(rack.id)
  const shelves = Array.from({ length: rack.shelves }, (_, i) => i + 1)
  const slots = Array.from({ length: rack.slotsPerShelf }, (_, i) => i + 1)

  return (
    <figure className="neu-raised rounded-3xl p-5 md:p-6">
      <figcaption className="mb-4 flex items-center justify-between gap-2">
        <span className="text-lg font-extrabold">Rack {rack.id}</span>
        <span className="text-xs font-semibold text-muted-foreground">Front view</span>
      </figcaption>
      <div className="neu-inset flex flex-col gap-3 rounded-2xl p-3">
        {shelves.map((shelf) => {
          const isShelf = highlight?.shelf === shelf
          return (
            <div key={shelf} className="flex items-center gap-3">
              <span
                className={cn(
                  'w-6 shrink-0 text-center font-mono text-xs font-bold',
                  isShelf ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                S{shelf}
              </span>
              <div
                className={cn(
                  'grid flex-1 gap-1.5 rounded-xl p-1.5 transition-all',
                  isShelf ? 'neu-raised-sm' : '',
                )}
                style={{ gridTemplateColumns: `repeat(${rack.slotsPerShelf}, minmax(0, 1fr))` }}
              >
                {slots.map((slot) => {
                  const book = books.find((b) => b.shelf === shelf && b.position === slot)
                  const isTarget = isShelf && highlight?.position === slot
                  const base = 'flex h-10 items-end justify-center rounded-md pb-1 text-[10px] font-mono font-bold'
                  if (isTarget) {
                    return (
                      <span
                        key={slot}
                        className={cn(base, 'relative bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-background')}
                        aria-label={`Your book: shelf ${shelf}, position ${slot}`}
                      >
                        <span className="absolute inset-0 animate-pulse rounded-md bg-accent/40" aria-hidden="true" />
                        <span className="relative">{slot}</span>
                      </span>
                    )
                  }
                  if (book) {
                    return (
                      <Link
                        key={slot}
                        href={`/books/${book.id}`}
                        title={book.title}
                        className={cn(base, 'text-white/90 opacity-80 transition-opacity hover:opacity-100')}
                        style={{ backgroundColor: rack.color }}
                      >
                        <span className="sr-only">{book.title}</span>
                        <span aria-hidden="true">{slot}</span>
                      </Link>
                    )
                  }
                  return (
                    <span
                      key={slot}
                      className={cn(base, 'neu-inset-sm text-muted-foreground/60')}
                      aria-hidden="true"
                    >
                      {slot}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded bg-accent" aria-hidden="true" /> Your book
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded opacity-80" style={{ backgroundColor: rack.color }} aria-hidden="true" />{' '}
          Catalogued title
        </span>
        <span className="flex items-center gap-1.5">
          <span className="neu-inset-sm size-3 rounded" aria-hidden="true" /> Other / empty slot
        </span>
      </div>
    </figure>
  )
}
