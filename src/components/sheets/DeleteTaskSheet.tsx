import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import type { TaskRead } from "@/types/api.types"
import { Button } from "../ui/button"
import useDeleteTask from "@/hooks/mutations/useDeleteTask"
import { AlertCircle } from "lucide-react"

interface EditTaskSheetProps {
  task: TaskRead | null
  onOpenChange: (open: boolean) => void
}

export default function DeleteTaskSheet({
  task,
  onOpenChange,
}: EditTaskSheetProps) {
  const { isPending, isError, mutate: deleteTask } = useDeleteTask()

  const handleDeleteTask = () => {
    if (!task) return
    deleteTask(task.id, {
      onSuccess: () => onOpenChange(false),
      onError: (error) => console.error(error),
    })
  }

  return (
    <Sheet open={task != null} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{task && `Delete task '${task.title}'`}</SheetTitle>
          <SheetDescription>
            This action cannot be undone. Are you sure you want to continue?
          </SheetDescription>
          {isError && (
            <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{"Something went wrong. Please try again."}</span>
            </div>
          )}
        </SheetHeader>

        <SheetFooter>
          <Button
            disabled={isPending}
            className={"w-full"}
            variant={"destructive"}
            onClick={handleDeleteTask}
          >
            {isPending ? "Deleting Task…" : "Confirm"}
          </Button>
          <SheetClose>
            <Button className={"w-full"} variant={"default"}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
