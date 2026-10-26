'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Camera, CameraOff, Keyboard, ScanLine } from 'lucide-react'
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner'
import { parseScannedCode } from '@/lib/library'

const Scanner = dynamic(() => import('@yudiel/react-qr-scanner').then((m) => m.Scanner), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-3xl bg-muted" />,
})

const SAMPLE_CODES = ['BK-1001', 'BK-7001', 'BK-8002', 'R-05']

export function QrScanner() {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState<{ tone: 'error' | 'info'; text: string } | null>(null)
  const [manual, setManual] = useState('')

  function go(raw: string) {
    const result = parseScannedCode(raw)
    if (!result) {
      setMessage({ tone: 'error', text: `"${raw.slice(0, 60)}" is not a recognised library code.` })
      return
    }
    setMessage({ tone: 'info', text: `Found ${result.id}. Opening…` })
    setActive(false)
    router.push(result.type === 'book' ? `/books/${result.id}` : `/racks/${result.id}`)
  }

  function handleScan(codes: IDetectedBarcode[]) {
    const value = codes[0]?.rawValue
    if (value) go(value)
  }

  function handleManual(e: FormEvent) {
    e.preventDefault()
    if (manual.trim()) go(manual)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <section aria-label="Camera scanner" className="neu-raised flex flex-col gap-5 rounded-3xl p-5 md:p-6">
        <div className="neu-inset relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl p-3">
          {active ? (
            <div className="size-full overflow-hidden rounded-2xl">
              <Scanner
                onScan={handleScan}
                onError={() => {
                  setActive(false)
                  setMessage({
                    tone: 'error',
                    text: 'Camera unavailable. Allow camera access or enter the code below.',
                  })
                }}
                constraints={{ facingMode: 'environment' }}
                formats={['qr_code']}
                sound={false}
                styles={{ container: { width: '100%', height: '100%' }, video: { objectFit: 'cover' } }}
              />
            </div>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-4 text-center">
              <span className="neu-raised flex size-24 items-center justify-center rounded-3xl text-primary">
                <ScanLine className="size-10" aria-hidden="true" />
              </span>
              <p className="max-w-60 text-sm text-muted-foreground">
                Point your camera at a book or rack QR code to jump straight to its location.
              </p>
            </div>
          )}
          <span className="pointer-events-none absolute left-6 top-6 size-8 rounded-tl-xl border-l-4 border-t-4 border-primary" aria-hidden="true" />
          <span className="pointer-events-none absolute right-6 top-6 size-8 rounded-tr-xl border-r-4 border-t-4 border-primary" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-6 left-6 size-8 rounded-bl-xl border-b-4 border-l-4 border-primary" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-6 right-6 size-8 rounded-br-xl border-b-4 border-r-4 border-primary" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={() => {
            setMessage(null)
            setActive((v) => !v)
          }}
          className={`${active ? 'neu-button' : 'neu-primary'} mx-auto flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold`}
        >
          {active ? <CameraOff className="size-5" aria-hidden="true" /> : <Camera className="size-5" aria-hidden="true" />}
          {active ? 'Stop camera' : 'Start camera'}
        </button>

        <p
          role="status"
          className={`min-h-5 text-center text-sm font-semibold ${message?.tone === 'error' ? 'text-destructive' : 'text-primary'}`}
        >
          {message?.text}
        </p>
      </section>

      <aside className="flex flex-col gap-6">
        <section aria-labelledby="manual-heading" className="neu-raised rounded-3xl p-5 md:p-6">
          <h2 id="manual-heading" className="flex items-center gap-2 text-lg font-extrabold">
            <Keyboard className="size-5 text-primary" aria-hidden="true" />
            Enter a code
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Type the code printed under any QR label.</p>
          <form onSubmit={handleManual} className="mt-4 flex flex-col gap-3">
            <label htmlFor="manual-code" className="sr-only">
              Book or rack code
            </label>
            <input
              id="manual-code"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              placeholder="e.g. BK-1001 or R-05"
              autoComplete="off"
              autoCapitalize="characters"
              className="neu-inset rounded-2xl px-4 py-3.5 font-mono text-base uppercase outline-none placeholder:normal-case placeholder:text-muted-foreground/80"
            />
            <button type="submit" className="neu-primary rounded-2xl py-3 font-bold">
              Find location
            </button>
          </form>
        </section>

        <section aria-labelledby="try-heading" className="neu-raised rounded-3xl p-5 md:p-6">
          <h2 id="try-heading" className="text-lg font-extrabold">
            Try a sample
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {SAMPLE_CODES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => go(code)}
                className="neu-button rounded-2xl py-3 font-mono text-sm font-bold"
              >
                {code}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Need printed codes?{' '}
            <Link href="/labels" className="font-bold text-primary hover:underline">
              Open the label sheet
            </Link>
          </p>
        </section>
      </aside>
    </div>
  )
}
