import type { TaskRead } from "@/types/api.types"
import useDeleteTask from "@/hooks/mutations/useDeleteTask"
import TaskSheet from "../TaskSheet"

interface DeleteTaskSheetProps {
  task: TaskRead | null
  onOpenChange: (open: boolean) => void
}

export default function DeleteTaskSheet({
  task,
  onOpenChange,
}: DeleteTaskSheetProps) {
  const { isPending, isError, mutate: deleteTask } = useDeleteTask()

  const handleDeleteTask = () => {
    if (!task) return

    deleteTask(task.id, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <TaskSheet
      open={task != null}
      onOpenChange={onOpenChange}
      title={task ? `Delete task '${task.title}'` : ""}
      description="This action cannot be undone. Are you sure you want to continue?"
      isPending={isPending}
      isError={isError}
      actionLabel="Confirm"
      pendingLabel="Deleting Task…"
      actionVariant="destructive"
      onAction={handleDeleteTask}
    />
  )
}
