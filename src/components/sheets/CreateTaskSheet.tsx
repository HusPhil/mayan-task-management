import { useRef, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import type { TaskCreate } from "@/types/api.types"
import useCreateTask from "@/hooks/mutations/useCreateTask"
import TaskSheet from "../TaskSheet"

export default function CreateTaskSheet() {
  const { isPending, mutate: createTask, isError } = useCreateTask()
  const [open, setOpen] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    const title = titleInputRef.current?.value
    const description = descInputRef.current?.value

    if (!title || !description) {
      return
    }

    const taskCreate: TaskCreate = {
      title,
      description,
    }

    createTask(taskCreate, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        New Task
      </Button>

      <TaskSheet
        open={open}
        onOpenChange={setOpen}
        title="Create new Task"
        description="Add a new Task to your list"
        isPending={isPending}
        isError={isError}
        actionLabel="Submit"
        pendingLabel="Creating Task…"
        onAction={handleSubmit}
      >
        <div className="space-y-3 px-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="create-task-title">Title</label>
            <Input
              ref={titleInputRef}
              id="create-task-title"
              placeholder="e.g. Buy groceries"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="create-task-description">Description</label>
            <Textarea
              ref={descInputRef}
              id="create-task-description"
              placeholder="e.g. Milk, eggs, bread"
            />
          </div>
        </div>
      </TaskSheet>
    </>
  )
}
