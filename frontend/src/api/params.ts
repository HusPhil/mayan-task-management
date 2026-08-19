export type SortDirection = "asc" | "desc"

export interface TaskSearchParams {
  query?: string
  status?: number[]
  sort?: SortDirection
}

export const TaskSearchAlias = {
  QUERY: "q",
  STATUS: "s",
  SORT: "sort",
} as const

export function buildSearchParams(filters: TaskSearchParams): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.query) {
    params.set(TaskSearchAlias.QUERY, filters.query)
  } else {
    params.delete(TaskSearchAlias.QUERY)
  }

  if (filters.status && filters.status.length > 0) {
    filters.status.forEach((s) =>
      params.append(TaskSearchAlias.STATUS, String(s))
    )
  } else {
    params.delete(TaskSearchAlias.STATUS)
  }

  if (filters.sort) {
    params.set(TaskSearchAlias.SORT, filters.sort)
  } else {
    params.delete(TaskSearchAlias.SORT)
  }

  return params
}
