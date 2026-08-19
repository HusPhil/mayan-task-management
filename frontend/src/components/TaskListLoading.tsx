import { Skeleton } from "./ui/skeleton"

export default function TaskListLoading() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
        >
          <Skeleton className="size-4 shrink-0 rounded-xs" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="size-6 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  )
}
