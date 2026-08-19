import { client } from "@/api/client"
import { taskKeys } from "@/api/tasks.options"
import type { TaskRead, TaskUpdate } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useEditTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      taskId,
      taskUpdate,
    }: {
      taskId: string
      taskUpdate: TaskUpdate
    }) => client.patch<TaskRead>(`/tasks/${taskId}`, taskUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
