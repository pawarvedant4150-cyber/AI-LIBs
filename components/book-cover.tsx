import { cn } from '@/lib/utils'

export function BookCover({
  title,
  author,
  color,
  size = 'md',
}: {
  title: string
  author: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'neu-raised-sm relative flex shrink-0 flex-col justify-between overflow-hidden rounded-xl',
        size === 'sm' && 'h-24 w-16 p-2',
        size === 'md' && 'h-36 w-24 p-3',
        size === 'lg' && 'h-64 w-44 p-5',
      )}
    >
      <span className="absolute inset-y-0 left-0 w-2" style={{ backgroundColor: color }} />
      <span className="absolute inset-x-0 top-0 h-1/3 opacity-15" style={{ backgroundColor: color }} />
      <span
        className={cn(
          'relative pl-1.5 font-extrabold leading-tight text-foreground text-balance',
          size === 'sm' && 'line-clamp-3 text-[9px]',
          size === 'md' && 'line-clamp-4 text-xs',
          size === 'lg' && 'line-clamp-5 text-lg',
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          'relative line-clamp-2 pl-1.5 font-medium text-muted-foreground',
          size === 'sm' && 'text-[8px]',
          size === 'md' && 'text-[10px]',
          size === 'lg' && 'text-xs',
        )}
      >
        {author}
      </span>
    </div>
  )
}
