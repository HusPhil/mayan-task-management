import { Button } from "./ui/button"
import { TaskStatus } from "@/types/domain.types"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import type { TaskSearchParams } from "@/api/params"
import { useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

interface FilterChipsProps {
  activeStatusFilters?: TaskStatus[]
  statusFilters: string[]
  onSetFilter: (filter: TaskStatus | null) => void
}

function StatusFilterChips({
  onSetFilter,
  activeStatusFilters,
  statusFilters,
}: FilterChipsProps) {
  return (
    <div className="space-x-1">
      {statusFilters.map((filter) => {
        const isAll = filter === "All"

        const filterValue = isAll
          ? null
          : TaskStatus[filter as keyof typeof TaskStatus]

        const isActive = isAll
          ? !activeStatusFilters || activeStatusFilters.length === 0
          : activeStatusFilters?.includes(filterValue as TaskStatus)

        return (
          <Button
            key={filter}
            className={"capitalize"}
            variant={isActive ? "default" : "outline"}
            onClick={() => onSetFilter(filterValue)}
          >
            {filter.toLowerCase()}
          </Button>
        )
      })}
    </div>
  )
}

interface FiltersProps {
  filters: TaskSearchParams
  onUpdateFilters: (filter: TaskSearchParams) => void
}

export default function Filters({ filters, onUpdateFilters }: FiltersProps) {
  const queryInputRef = useRef<HTMLInputElement>(null)

  const handleQueryFilter = useDebouncedCallback(() => {
    let queryText = queryInputRef.current?.value
    onUpdateFilters({ ...filters, query: queryText })
  }, 500)

  return (
    <div className="mb-3 space-y-2">
      <StatusFilterChips
        onSetFilter={(statusFilter: TaskStatus | null) => {
          const status =
            statusFilter != null ? [Number(statusFilter)] : undefined
          onUpdateFilters({ ...filters, status })
        }}
        activeStatusFilters={filters.status as TaskStatus[]}
        statusFilters={["All", ...Object.keys(TaskStatus)]}
      />
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={queryInputRef}
          className="pl-8"
          placeholder="Search tasks..."
          onChange={handleQueryFilter}
        />
      </div>
    </div>
  )
}
