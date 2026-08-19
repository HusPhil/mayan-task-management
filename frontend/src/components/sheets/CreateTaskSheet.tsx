import { useRef, useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { AlertCircle, Plus } from "lucide-react"
import { Input } from "../ui/input"
import type { TaskCreate } from "@/types/api.types"
import useCreateTask from "@/hooks/mutations/useCreateTask"

interface CreateTaskSheetProps {}

export default function CreateTaskSheet({}: CreateTaskSheetProps) {
  const { isPending, mutate: createTask, isError } = useCreateTask()
  const [open, setOpen] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const titleText = titleInputRef.current?.value
    const descText = descInputRef.current?.value

    if (!titleText || !descText!) {
      return
    }

    const taskCreate: TaskCreate = {
      title: titleText,
      description: descText,
    }

    createTask(taskCreate, {
      onSuccess: () => {
        setOpen(false)
      },
      onError: (error) => console.error(error),
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant={"default"}>
          <Plus /> New Task
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Create new Task</SheetTitle>
          <SheetDescription>Add a new Task to your list</SheetDescription>
          {isError && (
            <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{"Something went wrong. Please try again."}</span>
            </div>
          )}
        </SheetHeader>

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
            <Input
              ref={descInputRef}
              id="create-task-description"
              placeholder="e.g. Milk, eggs, bread"
            />
          </div>
        </div>

        <SheetFooter>
          <Button
            disabled={isPending}
            className={"w-full disabled:cursor-not-allowed"}
            variant={"default"}
            onClick={handleSubmit}
          >
            {isPending ? "Creating Task…" : "Submit"}
          </Button>
          <SheetClose
            disabled={isPending}
            className={"disabled:cursor-not-allowed"}
          >
            <Button
              disabled={isPending}
              className={"w-full"}
              variant={"outline"}
            >
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
