import type { Metadata } from 'next'
import { LabelsSheet } from '@/components/labels-sheet'

export const metadata: Metadata = {
  title: 'QR labels',
  description: 'Generate printable QR labels for books and rack panels.',
}

export default function LabelsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="no-print">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">QR label studio</h1>
        <p className="mt-2 text-muted-foreground">
          For librarians: print QR stickers for book spines and rack end panels. Each code opens its live location page.
        </p>
      </header>
      <LabelsSheet />
    </div>
  )
}
