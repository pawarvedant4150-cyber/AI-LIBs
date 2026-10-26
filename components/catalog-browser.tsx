'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { RACKS, searchBooks } from '@/lib/library'
import { BookCard } from '@/components/book-card'
import { cn } from '@/lib/utils'

export function CatalogBrowser({ initialQuery, initialSubject }: { initialQuery: string; initialSubject: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [subject, setSubject] = useState(initialSubject)
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const results = useMemo(() => searchBooks(query, subject, onlyAvailable), [query, subject, onlyAvailable])
  const subjects = ['all', ...RACKS.map((r) => r.subject)]

  return (
    <div className="flex flex-col gap-6">
      <div className="neu-raised flex flex-col gap-4 rounded-3xl p-4 md:p-5">
        <div className="neu-inset flex items-center gap-2 rounded-2xl px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="catalog-search" className="sr-only">
            Search the catalogue
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, tag, call number or rack…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-base outline-none placeholder:text-muted-foreground/80 focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-full p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by subject">
          {subjects.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={subject === s}
              onClick={() => setSubject(s)}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-semibold transition-all',
                subject === s ? 'neu-inset-sm text-primary' : 'neu-raised-sm text-muted-foreground hover:text-foreground',
              )}
            >
              {s === 'all' ? 'All subjects' : s}
            </button>
          ))}
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              'neu-inset-sm relative h-7 w-12 rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-ring',
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                'absolute top-1 size-5 rounded-full transition-all',
                onlyAvailable ? 'left-6 bg-primary' : 'neu-raised-sm left-1',
              )}
            />
          </span>
          Available now only
        </label>
      </div>

      <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? 'title' : 'titles'} found
      </p>

      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="neu-inset rounded-3xl p-10 text-center">
          <p className="font-bold">No books match your search.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a broader term or ask at the help desk.</p>
        </div>
      )}
    </div>
  )
}
