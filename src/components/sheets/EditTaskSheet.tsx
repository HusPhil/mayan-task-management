import React, { useRef } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import { Input } from "../ui/input"
import type { TaskRead, TaskUpdate } from "@/types/api.types"
import { Button } from "../ui/button"
import useEditTask from "@/hooks/mutations/useEditTask"
import { AlertCircle } from "lucide-react"

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
  const descInputRef = useRef<HTMLInputElement>(null)

  const handleEditTask = () => {
    if (!task) return

    const titleText = titleInputRef.current?.value
    const descText = descInputRef.current?.value

    if (!titleText || !descText!) {
      return
    }

    const taskUpdate: TaskUpdate = {
      title: titleText,
      description: descText,
    }

    editTask(
      { taskId: task?.id, taskUpdate },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
        onError: (error) => console.error(error),
      }
    )
  }

  return (
    <Sheet open={task != null} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{task && `Edit task '${task?.title}'`}</SheetTitle>
          <SheetDescription>Update the task details below</SheetDescription>
          {isError && (
            <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{"Something went wrong. Please try again."}</span>
            </div>
          )}
        </SheetHeader>
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
            <Input
              ref={descInputRef}
              id="edit-task-description"
              placeholder="e.g. Milk, eggs, bread"
              defaultValue={task?.description}
            />
          </div>
        </div>

        <SheetFooter>
          <Button
            disabled={isPending}
            className={"w-full"}
            variant={"default"}
            onClick={handleEditTask}
          >
            {isPending ? "Editing Task…" : "Submit"}
          </Button>
          <SheetClose>
            <Button className={"w-full"} variant={"outline"}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
