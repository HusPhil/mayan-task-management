import { useRef, useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Input } from "../ui/input"
import type { TaskCreate, TaskRead } from "@/types/api.types"

interface CreateTaskSheetProps {}

export default function CreateTaskSheet({}: CreateTaskSheetProps) {
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

    console.log(taskCreate)
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
          Create new Task
          <SheetDescription>Add a new Task to your list</SheetDescription>
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
            className={"w-full"}
            variant={"default"}
            onClick={handleSubmit}
          >
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
