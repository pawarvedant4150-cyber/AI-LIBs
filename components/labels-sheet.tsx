'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Printer } from 'lucide-react'
import { BOOKS, RACKS, getRack } from '@/lib/library'
import { useOrigin } from '@/hooks/use-origin'
import { cn } from '@/lib/utils'

type Mode = 'books' | 'racks'

export function LabelsSheet() {
  const origin = useOrigin()
  const [mode, setMode] = useState<Mode>('books')
  const [rackFilter, setRackFilter] = useState('all')

  const books = BOOKS.filter((b) => rackFilter === 'all' || b.rackId === rackFilter)

  return (
    <div className="flex flex-col gap-6">
      <div className="no-print neu-raised flex flex-wrap items-center gap-4 rounded-3xl p-4 md:p-5">
        <div role="tablist" aria-label="Label type" className="neu-inset-sm flex gap-1 rounded-2xl p-1">
          {(['books', 'racks'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all',
                mode === m ? 'neu-raised-sm text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'books' ? 'Book labels' : 'Rack panels'}
            </button>
          ))}
        </div>
        {mode === 'books' && (
          <div className="flex items-center gap-2">
            <label htmlFor="rack-filter" className="text-sm font-semibold text-muted-foreground">
              Rack
            </label>
            <select
              id="rack-filter"
              value={rackFilter}
              onChange={(e) => setRackFilter(e.target.value)}
              className="neu-inset-sm rounded-xl px-3 py-2 text-sm font-semibold outline-none"
            >
              <option value="all">All racks</option>
              {RACKS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} — {r.subject}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="button"
          onClick={() => window.print()}
          className="neu-primary ml-auto flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold"
        >
          <Printer className="size-4" aria-hidden="true" />
          Print sheet
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {mode === 'books'
          ? books.map((b) => {
              const rack = getRack(b.rackId)!
              return (
                <li key={b.id} className="neu-raised print-plain flex break-inside-avoid flex-col items-center gap-3 rounded-3xl p-4 text-center">
                  <div className="rounded-xl bg-white p-2">
                    {origin ? (
                      <QRCodeSVG value={`${origin}/books/${b.id}`} size={112} level="M" fgColor="#1d2533" />
                    ) : (
                      <div className="size-28 animate-pulse rounded bg-muted" />
                    )}
                  </div>
                  <p className="font-mono text-sm font-bold tracking-widest">{b.id}</p>
                  <p className="line-clamp-2 text-xs font-semibold leading-snug">{b.title}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {rack.id} · S{b.shelf} · #{b.position} · {b.callNumber}
                  </p>
                </li>
              )
            })
          : RACKS.map((r) => (
              <li key={r.id} className="neu-raised print-plain flex break-inside-avoid flex-col items-center gap-3 rounded-3xl p-4 text-center">
                <span className="h-1.5 w-16 rounded-full" style={{ backgroundColor: r.color }} aria-hidden="true" />
                <div className="rounded-xl bg-white p-2">
                  {origin ? (
                    <QRCodeSVG value={`${origin}/racks/${r.id}`} size={112} level="M" fgColor="#1d2533" />
                  ) : (
                    <div className="size-28 animate-pulse rounded bg-muted" />
                  )}
                </div>
                <p className="font-mono text-2xl font-bold">{r.id}</p>
                <p className="text-xs font-semibold">{r.subject}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Section {r.section} · DDC {r.ddcRange}
                </p>
              </li>
            ))}
      </ul>
    </div>
  )
}
