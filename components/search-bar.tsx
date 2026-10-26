import { Search } from 'lucide-react'

export function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form action="/catalog" role="search" className="neu-inset flex items-center gap-2 rounded-2xl p-2">
      <label htmlFor="site-search" className="sr-only">
        Search books by title, author, subject or call number
      </label>
      <Search className="ml-3 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Title, author, subject or call number…"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-base outline-none placeholder:text-muted-foreground/80 focus-visible:outline-none"
      />
      <button type="submit" className="neu-primary rounded-xl px-5 py-2.5 text-sm font-bold">
        Search
      </button>
    </form>
  )
}
