import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookMarked, Calendar, FileText, Layers } from 'lucide-react'
import { BOOKS, booksInRack, formatYear, getBook, getDirections, getLocation } from '@/lib/library'
import { BookCover } from '@/components/book-cover'
import { AvailabilityBadge } from '@/components/availability-badge'
import { LocationCard } from '@/components/location-card'
import { RackDiagram } from '@/components/rack-diagram'
import { FloorMap } from '@/components/floor-map'
import { QrCard } from '@/components/qr-card'
import { BookCard } from '@/components/book-card'

export function generateStaticParams() {
  return BOOKS.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const book = getBook(id)
  if (!book) return { title: 'Book not found' }
  const { rack } = getLocation(book)
  return {
    title: book.title,
    description: `${book.title} by ${book.author} — Rack ${rack.id}, Shelf ${book.shelf}, Section ${rack.section}.`,
  }
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = getBook(id)
  if (!book) notFound()

  const { rack, floor } = getLocation(book)
  const directions = getDirections(book)
  const nearby = booksInRack(rack.id).filter((b) => b.id !== book.id).slice(0, 2)

  const meta = [
    { icon: Calendar, label: 'Published', value: formatYear(book.year) },
    { icon: Layers, label: 'Edition', value: book.edition ?? '—' },
    { icon: FileText, label: 'Pages', value: book.pages.toLocaleString() },
    { icon: BookMarked, label: 'Accession', value: book.id },
  ]

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/catalog"
        className="neu-button no-print flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to catalogue
      </Link>

      <section className="neu-raised flex flex-col gap-6 rounded-3xl p-6 md:flex-row md:p-8">
        <div className="flex justify-center md:block">
          <BookCover title={book.title} author={book.author} color={rack.color} size="lg" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: rack.color }}>
            {rack.subject} · {floor.name}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-balance md:text-4xl">
            {book.title}
          </h1>
          <p className="text-lg text-muted-foreground">{book.author}</p>
          <div className="flex flex-wrap items-center gap-3">
            <AvailabilityBadge book={book} />
            <span className="text-sm text-muted-foreground">{book.publisher}</span>
          </div>
          <p className="max-w-2xl leading-relaxed text-pretty">{book.description}</p>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="neu-inset-sm rounded-2xl px-3 py-3">
                <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 font-mono text-sm font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {book.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/catalog?q=${encodeURIComponent(tag)}`}
                  className="neu-raised-sm block rounded-full px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-primary"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-8">
          <LocationCard book={book} />
          <RackDiagram rack={rack} highlight={{ shelf: book.shelf, position: book.position }} />
          <section aria-labelledby="directions-heading" className="neu-raised rounded-3xl p-5 md:p-6">
            <h2 id="directions-heading" className="text-lg font-extrabold">
              Directions
            </h2>
            <ol className="mt-5 flex flex-col gap-3">
              {directions.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="neu-inset-sm flex size-9 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
          <FloorMap highlightRackId={rack.id} />
        </div>

        <aside className="flex flex-col gap-8">
          <QrCard
            path={`/books/${book.id}`}
            code={book.id}
            title="Book QR code"
            subtitle="Print and stick on the catalogue card or spine label. Scanning it opens this page."
          />
          {nearby.length > 0 && (
            <section aria-labelledby="nearby-heading" className="flex flex-col gap-4">
              <h2 id="nearby-heading" className="text-lg font-extrabold">
                Also on rack {rack.id}
              </h2>
              {nearby.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
              <Link href={`/racks/${rack.id}`} className="text-sm font-bold text-primary hover:underline">
                See everything on this rack
              </Link>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
