import { Clock, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="no-print mx-auto mb-24 w-full max-w-6xl px-4 md:mb-8 md:px-6">
      <div className="neu-raised grid gap-6 rounded-3xl p-6 text-sm md:grid-cols-3">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 text-primary" aria-hidden="true" />
          <div>
            <p className="font-bold">Opening hours</p>
            <p className="text-muted-foreground">Mon–Fri 8:00–22:00 · Sat 9:00–18:00</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 text-primary" aria-hidden="true" />
          <div>
            <p className="font-bold">Central Library</p>
            <p className="text-muted-foreground">Main Campus, Academic Block 2</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 size-4 text-primary" aria-hidden="true" />
          <div>
            <p className="font-bold">Help desk</p>
            <p className="text-muted-foreground">Ask at circulation, ground floor</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
