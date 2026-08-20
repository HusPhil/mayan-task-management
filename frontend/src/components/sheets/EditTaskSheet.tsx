import { useRef } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import type { TaskRead, TaskUpdate } from "@/types/api.types"
import useEditTask from "@/hooks/mutations/useEditTask"
import TaskSheet from "../TaskSheet"

interface EditTaskSheetProps {
  task: TaskRead | null
  onOpenChange: (open: boolean) => void
}

export default function EditTaskSheet({
  task,
  onOpenChange,
}: EditTaskSheetProps) {
  const { isPending, isError, mutate: editTask } = useEditTask()

  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)

  const handleEditTask = () => {
    if (!task) return

    const title = titleInputRef.current?.value
    const description = descInputRef.current?.value

    if (!title || !description) {
      return
    }

    const taskUpdate: TaskUpdate = {
      title,
      description,
    }

    editTask(
      {
        taskId: task.id,
        taskUpdate,
      },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <TaskSheet
      open={task != null}
      onOpenChange={onOpenChange}
      title={task ? `Edit task '${task.title}'` : ""}
      description="Update the task details below"
      isPending={isPending}
      isError={isError}
      actionLabel="Submit"
      pendingLabel="Editing Task…"
      onAction={handleEditTask}
    >
      <div className="space-y-3 px-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="edit-task-title">Title</label>
          <Input
            ref={titleInputRef}
            id="edit-task-title"
            placeholder="e.g. Buy groceries"
            defaultValue={task?.title}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="edit-task-description">Description</label>
          <Textarea
            ref={descInputRef}
            id="edit-task-description"
            placeholder="e.g. Milk, eggs, bread"
            defaultValue={task?.description}
          />
        </div>
      </div>
    </TaskSheet>
  )
}
