'use client'

import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Check, Download, Link2, Printer } from 'lucide-react'
import { useOrigin } from '@/hooks/use-origin'

export function QrCard({
  path,
  code,
  title,
  subtitle,
}: {
  path: string
  code: string
  title: string
  subtitle: string
}) {
  const origin = useOrigin()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const url = origin ? `${origin}${path}` : ''

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${code}-qr.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  async function copyLink() {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section aria-labelledby={`qr-${code}`} className="neu-raised print-plain rounded-3xl p-5 md:p-6">
      <h2 id={`qr-${code}`} className="text-lg font-extrabold">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="neu-inset mx-auto mt-5 flex aspect-square w-full max-w-56 items-center justify-center rounded-3xl p-5">
        <div className="rounded-2xl bg-white p-3">
          {url ? (
            <QRCodeCanvas
              ref={canvasRef}
              value={url}
              size={512}
              level="M"
              marginSize={1}
              fgColor="#1d2533"
              style={{ width: '100%', height: 'auto', maxWidth: 160 }}
              aria-label={`QR code linking to ${code}`}
            />
          ) : (
            <div className="size-40 animate-pulse rounded-lg bg-muted" aria-hidden="true" />
          )}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-sm font-bold tracking-widest">{code}</p>
      <div className="no-print mt-5 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={download}
          className="neu-button flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-semibold"
        >
          <Download className="size-4" aria-hidden="true" />
          Save PNG
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="neu-button flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-semibold"
        >
          <Printer className="size-4" aria-hidden="true" />
          Print
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="neu-button flex flex-col items-center gap-1 rounded-2xl py-3 text-xs font-semibold"
          aria-live="polite"
        >
          {copied ? <Check className="size-4 text-primary" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </section>
  )
}
