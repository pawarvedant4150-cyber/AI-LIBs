import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { getLocation, type Book } from '@/lib/library'
import { BookCover } from '@/components/book-cover'
import { AvailabilityBadge } from '@/components/availability-badge'

export function BookCard({ book }: { book: Book }) {
  const { rack, floor } = getLocation(book)
  return (
    <Link
      href={`/books/${book.id}`}
      className="neu-raised group flex gap-4 rounded-3xl p-4 transition-transform hover:-translate-y-0.5"
    >
      <BookCover title={book.title} author={book.author} color={rack.color} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: rack.color }}>
            {rack.subject}
          </p>
          <h3 className="line-clamp-2 font-bold leading-snug text-pretty group-hover:text-primary">{book.title}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
        </div>
        <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">
            {floor.level === 0 ? 'GF' : '1F'} · Sec {rack.section} · {rack.id} · Shelf {book.shelf}
          </span>
        </p>
        <div className="mt-auto">
          <AvailabilityBadge book={book} />
        </div>
      </div>
    </Link>
  )
}
