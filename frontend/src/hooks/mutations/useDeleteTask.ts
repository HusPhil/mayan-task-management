import { client } from "@/api/client"
import { taskKeys } from "@/api/tasks.options"
import type { TaskRead } from "@/types/api.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId: string) => client.delete<TaskRead>(`/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })
}
