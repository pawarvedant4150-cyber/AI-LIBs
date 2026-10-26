import { Building2, Columns3, Hash, LayoutGrid, Rows3 } from 'lucide-react'
import { getLocation, type Book } from '@/lib/library'

export function LocationCard({ book }: { book: Book }) {
  const { rack, floor } = getLocation(book)
  const items = [
    { label: 'Floor', value: floor.name.replace(' Floor', ''), icon: Building2 },
    { label: 'Section', value: rack.section, icon: LayoutGrid },
    { label: 'Rack No.', value: rack.id, icon: Columns3 },
    { label: 'Shelf No.', value: String(book.shelf), icon: Rows3 },
    { label: 'Position', value: `#${book.position}`, icon: Hash },
  ]

  return (
    <section aria-labelledby="location-heading" className="neu-raised rounded-3xl p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="location-heading" className="text-lg font-extrabold">
          Exact location
        </h2>
        <span className="neu-inset-sm rounded-full px-3 py-1 font-mono text-xs font-semibold text-primary">
          {book.callNumber}
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map(({ label, value, icon: Icon }, i) => (
          <div
            key={label}
            className={`neu-inset flex flex-col items-center gap-1 rounded-2xl px-2 py-4 text-center ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="font-mono text-xl font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">
        Section {rack.section} holds <span className="font-semibold text-foreground">{rack.subject}</span> (DDC{' '}
        {rack.ddcRange}). Shelves are counted from the top, positions from the left.
      </p>
    </section>
  )
}
