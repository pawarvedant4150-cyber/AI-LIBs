import type { Metadata } from 'next'
import { FloorMap } from '@/components/floor-map'
import { FLOORS, RACKS } from '@/lib/library'

export const metadata: Metadata = {
  title: 'Library map',
  description: 'Interactive floor map of every rack and section in the library.',
}

export default function MapPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Library map</h1>
        <p className="mt-2 text-muted-foreground">Switch floors and tap any rack to see what&apos;s on each shelf.</p>
      </header>
      <FloorMap />
      <section aria-labelledby="directory" className="neu-raised rounded-3xl p-5 md:p-6">
        <h2 id="directory" className="text-lg font-extrabold">
          Section directory
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="pb-3 font-semibold">Rack</th>
                <th scope="col" className="pb-3 font-semibold">Subject</th>
                <th scope="col" className="pb-3 font-semibold">Section</th>
                <th scope="col" className="pb-3 font-semibold">Floor</th>
                <th scope="col" className="pb-3 font-semibold">DDC range</th>
              </tr>
            </thead>
            <tbody>
              {RACKS.map((rack) => (
                <tr key={rack.id} className="border-t border-border/80">
                  <td className="py-3 font-mono font-bold">
                    <a href={`/racks/${rack.id}`} className="hover:text-primary">
                      {rack.id}
                    </a>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: rack.color }} aria-hidden="true" />
                      {rack.subject}
                    </span>
                  </td>
                  <td className="py-3">{rack.section}</td>
                  <td className="py-3">{FLOORS.find((f) => f.level === rack.floor)?.name}</td>
                  <td className="py-3 font-mono text-muted-foreground">{rack.ddcRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
