import React, { useRef } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
} from "../ui/sheet"
import { Input } from "../ui/input"
import type { TaskRead } from "@/types/api.types"
import { Button } from "../ui/button"

interface EditTaskSheetProps {
  task: TaskRead | null
  onOpenChange: (open: boolean) => void
}

export default function EditTaskSheet({
  task,
  onOpenChange,
}: EditTaskSheetProps) {
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descInputRef = useRef<HTMLInputElement>(null)

  return (
    <Sheet open={task != null} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <SheetHeader>
          {`Edit task '${task?.title}'`}
          <SheetDescription>Update the task details below</SheetDescription>
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
          <Button className={"w-full"} variant={"default"}>
            Submit
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
