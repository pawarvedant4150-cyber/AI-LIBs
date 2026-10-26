import type { Metadata } from 'next'
import { CatalogBrowser } from '@/components/catalog-browser'
import { RACKS } from '@/lib/library'

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Search every title in the library and see its exact rack and shelf.',
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; subject?: string }>
}) {
  const { q = '', subject = 'all' } = await searchParams
  const validSubject = RACKS.some((r) => r.subject === subject) ? subject : 'all'

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Catalogue</h1>
        <p className="mt-2 text-muted-foreground">Search, filter, and tap any title to see where it lives.</p>
      </header>
      <CatalogBrowser key={`${q}-${validSubject}`} initialQuery={q} initialSubject={validSubject} />
    </div>
  )
}
