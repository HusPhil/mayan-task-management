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

export default function DeleteTaskSheet({
  task,
  onOpenChange,
}: EditTaskSheetProps) {
  return (
    <Sheet open={task != null} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
        <SheetHeader>
          {`Delete task '${task?.title}'`}
          <SheetDescription>
            This action cannot be undone. Are you sure you want to continue?
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button className={"w-full"} variant={"destructive"}>
            Confirm
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
