import {
  buildSearchParams,
  TaskSearchAlias,
  type SortDirection,
  type TaskSearchParams,
} from "@/api/params"
import type { TaskStatus } from "@/types/domain.types"
import { useState } from "react"

export default function useTaskFilters() {
  const [filters, setFilters] = useState<TaskSearchParams>(() => {
    const params = new URLSearchParams(window.location.search)

    return {
      query: params.get(TaskSearchAlias.QUERY) ?? undefined,
      status: params.getAll(TaskSearchAlias.STATUS).map(Number) as TaskStatus[],
      sort: params.get(TaskSearchAlias.SORT) as SortDirection,
    }
  })

  const updateFilters = (newFilters: TaskSearchParams) => {
    console.log(newFilters)
    setFilters(newFilters)
    const params = buildSearchParams(newFilters)
    const query = params.toString()

    window.history.pushState(
      {},
      "",
      query ? "?" + query : window.location.pathname
    )
  }

  return { filters, updateFilters }
}
