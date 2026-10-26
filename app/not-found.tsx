import Link from 'next/link'
import { BookX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="neu-raised mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl p-10 text-center">
      <span className="neu-inset flex size-16 items-center justify-center rounded-2xl text-accent">
        <BookX className="size-7" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-extrabold">We couldn&apos;t find that</h1>
      <p className="text-sm text-muted-foreground">The code may be mistyped or the item was moved. Try searching the catalogue.</p>
      <div className="flex gap-3">
        <Link href="/catalog" className="neu-primary rounded-2xl px-5 py-3 text-sm font-bold">
          Search catalogue
        </Link>
        <Link href="/scan" className="neu-button rounded-2xl px-5 py-3 text-sm font-bold">
          Scan again
        </Link>
      </div>
    </div>
  )
}
