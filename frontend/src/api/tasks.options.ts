import { queryOptions } from "@tanstack/react-query"
import { client } from "./client"
import type { TaskRead } from "@/types/api.types"
import { buildSearchParams, type TaskSearchParams } from "./params"

export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters: TaskSearchParams) => [...taskKeys.all, filters],
  detail: (id: string) => [...taskKeys.all, id] as const,
}

export function tasksQueryOption(filters: TaskSearchParams = {}) {
  const searchParams = buildSearchParams(filters)
  return queryOptions({
    queryKey: taskKeys.list(filters),
    queryFn: () => client.get<TaskRead[]>(`/tasks?${searchParams}`),
  })
}
