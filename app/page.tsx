import Link from 'next/link'
import { ArrowRight, Columns3, MapPinned, QrCode, ScanLine, Smartphone, Footprints } from 'lucide-react'
import { BOOKS, RACKS, booksInRack, getBook } from '@/lib/library'
import { SearchBar } from '@/components/search-bar'
import { BookCard } from '@/components/book-card'
import { FloorMap } from '@/components/floor-map'

const FEATURED = ['BK-1001', 'BK-2002', 'BK-7001', 'BK-1201']

const STEPS = [
  { icon: Smartphone, title: 'Scan the QR', text: 'Point your phone at any QR code on a rack, catalogue card or poster.' },
  { icon: MapPinned, title: 'See the exact spot', text: 'Floor, section, rack number, shelf number and position — all at a glance.' },
  { icon: Footprints, title: 'Walk straight to it', text: 'Follow step-by-step directions and a highlighted rack diagram.' },
]

export default function HomePage() {
  const totalCopies = BOOKS.reduce((sum, b) => sum + b.copies, 0)
  const available = BOOKS.reduce((sum, b) => sum + b.available, 0)
  const stats = [
    { label: 'Titles catalogued', value: BOOKS.length },
    { label: 'Racks mapped', value: RACKS.length },
    { label: 'Copies on hand', value: totalCopies },
    { label: 'Available now', value: available },
  ]

  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-10 pt-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-6">
          <span className="neu-inset-sm inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-primary">
            <ScanLine className="size-3.5" aria-hidden="true" />
            QR-powered book navigation
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Find any book. <span className="text-primary">Down to the shelf.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Scan a QR code or search the catalogue to see exactly which floor, rack and shelf a book is on — then
            follow the directions straight to it.
          </p>
          <SearchBar />
          <div className="flex flex-wrap gap-3">
            <Link href="/scan" className="neu-primary flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold">
              <QrCode className="size-5" aria-hidden="true" />
              Scan a QR code
            </Link>
            <Link href="/map" className="neu-button flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold">
              <Columns3 className="size-5" aria-hidden="true" />
              Browse the map
            </Link>
          </div>
        </div>

        <div className="neu-raised relative mx-auto w-full max-w-sm rounded-[2.5rem] p-6">
          <div className="neu-inset rounded-[2rem] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scanned just now</p>
            <p className="mt-2 text-lg font-extrabold leading-snug">Introduction to Algorithms</p>
            <p className="text-sm text-muted-foreground">Thomas H. Cormen et al.</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                ['Floor', 'GF'],
                ['Rack', 'R-01'],
                ['Shelf', '2'],
              ].map(([label, value]) => (
                <div key={label} className="neu-raised-sm rounded-2xl py-3">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</p>
                  <p className="font-mono text-lg font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-1.5">
              {[1, 2, 3, 4, 5].map((shelf) => (
                <div key={shelf} className="flex gap-1">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        shelf === 2 && i === 2
                          ? 'h-5 flex-1 animate-pulse rounded bg-accent'
                          : 'neu-inset-sm h-5 flex-1 rounded'
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/books/BK-1001"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Open this example <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Library at a glance">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="neu-raised rounded-3xl p-5">
              <dt className="text-sm font-semibold text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-mono text-3xl font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="how-heading" className="flex flex-col gap-6">
        <h2 id="how-heading" className="text-2xl font-extrabold tracking-tight md:text-3xl">
          How it works
        </h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="neu-raised flex flex-col gap-4 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <span className="neu-inset flex size-14 items-center justify-center rounded-2xl text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-mono text-4xl font-bold text-muted-foreground/30">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="subjects-heading" className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <h2 id="subjects-heading" className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Browse by subject
          </h2>
          <Link href="/catalog" className="text-sm font-bold text-primary hover:underline">
            Full catalogue
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {RACKS.map((rack) => (
            <li key={rack.id}>
              <Link
                href={`/catalog?subject=${encodeURIComponent(rack.subject)}`}
                className="neu-button flex h-full flex-col gap-3 rounded-3xl p-5"
              >
                <span className="flex items-center justify-between">
                  <span className="size-3 rounded-full" style={{ backgroundColor: rack.color }} aria-hidden="true" />
                  <span className="font-mono text-xs font-bold text-muted-foreground">{rack.id}</span>
                </span>
                <span className="font-bold">{rack.subject}</span>
                <span className="text-xs text-muted-foreground">
                  {booksInRack(rack.id).length} titles · Section {rack.section}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-heading" className="flex flex-col gap-6">
        <h2 id="featured-heading" className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Most requested this week
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {FEATURED.map((id) => {
            const book = getBook(id)
            return book ? <BookCard key={id} book={book} /> : null
          })}
        </div>
      </section>

      <FloorMap compact />
    </div>
  )
}
