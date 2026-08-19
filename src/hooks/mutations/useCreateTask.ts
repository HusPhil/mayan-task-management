import { client } from "@/api/client"
import { taskKeys } from "@/api/tasks.options"
import type { TaskCreate, TaskRead } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTask: TaskCreate) =>
      client.post<TaskRead>("/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
