'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Home, Library, Map, QrCode, Tags } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/catalog', label: 'Catalog', icon: BookOpen },
  { href: '/scan', label: 'Scan', icon: QrCode },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/labels', label: 'Labels', icon: Tags },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <>
      <header className="no-print sticky top-0 z-40 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 rounded-2xl">
            <span className="neu-raised-sm flex size-11 items-center justify-center rounded-2xl text-primary">
              <Library className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight">Shelfwise</span>
              <span className="text-xs font-medium text-muted-foreground">Academic Library Navigator</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="neu-inset-sm flex items-center gap-1 rounded-2xl p-1.5">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                        active ? 'neu-raised-sm text-primary' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Link
            href="/scan"
            className="neu-primary flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold md:hidden"
          >
            <QrCode className="size-4" aria-hidden="true" />
            Scan
          </Link>
        </div>
      </header>

      <nav aria-label="Mobile" className="no-print fixed inset-x-3 bottom-3 z-40 md:hidden">
        <ul className="neu-raised flex items-center justify-between rounded-3xl px-2 py-2">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition-all',
                    active ? 'neu-inset-sm text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
