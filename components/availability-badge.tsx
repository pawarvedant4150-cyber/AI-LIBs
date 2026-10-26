import { availabilityOf, type Book } from '@/lib/library'
import { cn } from '@/lib/utils'

export function AvailabilityBadge({ book, className }: { book: Book; className?: string }) {
  const { label, tone } = availabilityOf(book)
  return (
    <span
      className={cn(
        'neu-inset-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
        tone === 'success' && 'text-success',
        tone === 'accent' && 'text-accent',
        tone === 'destructive' && 'text-destructive',
        className,
      )}
    >
      <span
        className={cn(
          'size-2 rounded-full',
          tone === 'success' && 'bg-success',
          tone === 'accent' && 'bg-accent',
          tone === 'destructive' && 'bg-destructive',
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
