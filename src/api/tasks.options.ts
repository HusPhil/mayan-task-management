import { queryOptions, type QueryOptions } from "@tanstack/react-query"
import { client } from "./client"
import type { TaskRead } from "@/types/api.types"

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => ["tasks", id] as const,
}

export function tasksQueryOption() {
  return queryOptions({
    queryKey: taskKeys.all,
    queryFn: () => client.get<TaskRead[]>("/tasks"),
  })
}
