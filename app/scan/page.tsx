import type { Metadata } from 'next'
import { QrScanner } from '@/components/qr-scanner'

export const metadata: Metadata = {
  title: 'Scan QR',
  description: 'Scan a book or rack QR code to see its exact location in the library.',
}

export default function ScanPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Scan a QR code</h1>
        <p className="mt-2 text-muted-foreground">
          Works with book labels, catalogue cards and rack panels. You can also use your phone&apos;s camera app.
        </p>
      </header>
      <QrScanner />
    </div>
  )
}
