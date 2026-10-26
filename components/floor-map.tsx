'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpDown, DoorOpen, Info, Navigation } from 'lucide-react'
import { FLOORS, RACKS, booksInRack, getRack } from '@/lib/library'
import { cn } from '@/lib/utils'

export function FloorMap({ highlightRackId, compact = false }: { highlightRackId?: string; compact?: boolean }) {
  const highlighted = highlightRackId ? getRack(highlightRackId) : undefined
  const [level, setLevel] = useState(highlighted?.floor ?? 0)
  const racks = RACKS.filter((r) => r.floor === level)

  return (
    <section aria-label="Library floor map" className="neu-raised rounded-3xl p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">Floor map</h2>
        <div role="tablist" aria-label="Select floor" className="neu-inset-sm flex gap-1 rounded-2xl p-1">
          {FLOORS.map((floor) => (
            <button
              key={floor.level}
              type="button"
              role="tab"
              aria-selected={level === floor.level}
              onClick={() => setLevel(floor.level)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                level === floor.level ? 'neu-raised-sm text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {floor.name}
            </button>
          ))}
        </div>
      </div>

      <div className="neu-inset mt-5 rounded-3xl p-4 md:p-6">
        <div className="mb-4 grid grid-cols-3 gap-3 text-xs font-semibold text-muted-foreground">
          <div className="neu-raised-sm flex items-center justify-center gap-2 rounded-xl py-2">
            <ArrowUpDown className="size-3.5" aria-hidden="true" /> Stairs / Lift
          </div>
          <div className="col-start-3 neu-raised-sm flex items-center justify-center gap-2 rounded-xl py-2">
            <Info className="size-3.5" aria-hidden="true" /> {level === 0 ? 'Help desk' : 'Reading hall'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {racks.map((rack) => {
            const active = rack.id === highlighted?.id
            const count = booksInRack(rack.id).length
            return (
              <Link
                key={rack.id}
                href={`/racks/${rack.id}`}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'relative flex flex-col justify-between gap-2 rounded-2xl p-3 transition-transform hover:-translate-y-0.5',
                  compact ? 'min-h-20' : 'min-h-28 md:min-h-32',
                  active ? 'neu-raised ring-2 ring-accent' : 'neu-raised-sm',
                )}
                style={{ gridColumnStart: rack.grid.col, gridRowStart: rack.grid.row }}
              >
                <span className="absolute inset-x-3 top-0 h-1 rounded-b-full" style={{ backgroundColor: rack.color }} aria-hidden="true" />
                <span className="flex items-center justify-between gap-1">
                  <span className="font-mono text-sm font-bold">{rack.id}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">Sec {rack.section}</span>
                </span>
                <span className="text-xs font-semibold leading-tight text-pretty md:text-sm">{rack.subject}</span>
                {!compact && <span className="text-[10px] text-muted-foreground">{count} titles</span>}
                {active && (
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md">
                    <Navigation className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">Your book is here</span>
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="neu-raised-sm flex items-center gap-2 rounded-xl px-6 py-2 text-xs font-semibold text-muted-foreground">
            <DoorOpen className="size-3.5" aria-hidden="true" />
            {level === 0 ? 'Main entrance' : 'Arrive from stairs'}
          </div>
        </div>
      </div>
      {highlighted && highlighted.floor !== level && (
        <p className="mt-3 text-sm text-muted-foreground">
          Your book is on the {FLOORS.find((f) => f.level === highlighted.floor)?.name}.
        </p>
      )}
    </section>
  )
}
