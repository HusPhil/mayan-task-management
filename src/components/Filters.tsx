import { Button } from "./ui/button"
import { TaskStatus } from "@/types/domain.types"
import { Input } from "./ui/input"
import { Search, SearchIcon } from "lucide-react"
import { useState } from "react"

interface FilterChipsProps {
  activeFilter: string
  filters: string[]
  onSetFilter: (filter: string) => void
}

function FilterChips({ onSetFilter, activeFilter, filters }: FilterChipsProps) {
  return (
    <div className="space-x-1">
      {filters.map((filter) => (
        <Button
          key={filter}
          className={"capitalize"}
          variant={activeFilter === filter ? "default" : "outline"}
          onClick={() => onSetFilter(filter)}
        >
          {filter.toLowerCase()}
        </Button>
      ))}
    </div>
  )
}

interface FiltersProps {}

export default function Filters({}: FiltersProps) {
  const [activefilter, setActiveFilter] = useState<string>("All")

  return (
    <div className="mb-3 space-y-2">
      <FilterChips
        onSetFilter={(filter: string) => setActiveFilter(filter)}
        activeFilter={activefilter}
        filters={["All", ...Object.keys(TaskStatus)]}
      />
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />

        <Input className="pl-8" placeholder="Search tasks..." />
      </div>
    </div>
  )
}
