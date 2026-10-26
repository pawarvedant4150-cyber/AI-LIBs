import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { RACKS, booksInRack, getFloor, getRack } from '@/lib/library'
import { RackDiagram } from '@/components/rack-diagram'
import { QrCard } from '@/components/qr-card'
import { AvailabilityBadge } from '@/components/availability-badge'
import { FloorMap } from '@/components/floor-map'

export function generateStaticParams() {
  return RACKS.map((r) => ({ id: r.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const rack = getRack(id)
  return rack
    ? { title: `Rack ${rack.id} — ${rack.subject}`, description: `All titles on rack ${rack.id}, shelf by shelf.` }
    : { title: 'Rack not found' }
}

export default async function RackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rack = getRack(id)
  if (!rack) notFound()

  const floor = getFloor(rack.floor)
  const books = booksInRack(rack.id)
  const shelves = Array.from({ length: rack.shelves }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-8">
      <Link href="/map" className="neu-button no-print flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to map
      </Link>

      <header className="neu-raised flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 md:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: rack.color }}>
            {floor.name} · Section {rack.section} · DDC {rack.ddcRange}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
            Rack {rack.id} <span className="text-muted-foreground">— {rack.subject}</span>
          </h1>
        </div>
        <span className="neu-inset rounded-2xl px-5 py-3 text-center">
          <span className="block font-mono text-2xl font-bold">{books.length}</span>
          <span className="text-xs font-semibold text-muted-foreground">titles</span>
        </span>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-8">
          <RackDiagram rack={rack} />
          <section aria-labelledby="shelf-list" className="neu-raised rounded-3xl p-5 md:p-6">
            <h2 id="shelf-list" className="text-lg font-extrabold">
              Shelf by shelf
            </h2>
            <div className="mt-5 flex flex-col gap-5">
              {shelves.map((shelf) => {
                const onShelf = books.filter((b) => b.shelf === shelf)
                return (
                  <div key={shelf}>
                    <h3 className="mb-2 font-mono text-sm font-bold text-primary">Shelf {shelf}</h3>
                    {onShelf.length === 0 ? (
                      <p className="neu-inset-sm rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                        General collection — no featured titles catalogued.
                      </p>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {onShelf.map((b) => (
                          <li key={b.id}>
                            <Link
                              href={`/books/${b.id}`}
                              className="neu-inset-sm flex flex-wrap items-center justify-between gap-2 rounded-2xl px-4 py-3 hover:text-primary"
                            >
                              <span className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold text-muted-foreground">#{b.position}</span>
                                <span className="font-semibold">{b.title}</span>
                              </span>
                              <AvailabilityBadge book={b} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
        <aside className="flex flex-col gap-8">
          <QrCard
            path={`/racks/${rack.id}`}
            code={rack.id}
            title="Rack QR code"
            subtitle="Mount this on the rack's end panel so visitors can see every title on it."
          />
          <FloorMap highlightRackId={rack.id} compact />
        </aside>
      </div>
    </div>
  )
}
