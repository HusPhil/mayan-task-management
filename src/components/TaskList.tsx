import type { TaskRead } from "@/types/api.types"
import { TaskStatus } from "@/types/domain.types"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { formatDate } from "@/utils/formatDate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { EllipsisVerticalIcon, PencilIcon, Trash2 } from "lucide-react"
import DeleteTaskSheet from "./sheets/DeleteTaskSheet"
import EditTaskSheet from "./sheets/EditTaskSheet"
import { useState } from "react"

interface DropDownOptionsProps {
  taskId: string
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

function DropDownOptions({ taskId, onDelete, onEdit }: DropDownOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon-xs"}>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(taskId)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(taskId)}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface TaskCardProps {
  task: TaskRead
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

function TaskCard({ onDelete, onEdit, task }: TaskCardProps) {
  return (
    <div className="h-fit p-1">
      <Card key={task.id} className="p-0 transition-colors hover:bg-muted/50">
        <div className="flex items-start justify-between px-5 py-3">
          <div className="flex items-start gap-3">
            <Checkbox
              className={"mt-0.5 cursor-pointer"}
              defaultChecked={task.status === TaskStatus.COMPLETED}
            />
            <div>
              <div className="space-y-0.5">
                <p className="text-sm leading-snug font-medium text-foreground">
                  {task.title}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {task.description}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground/75">
                {formatDate(task.created_at)}
              </p>
            </div>
          </div>
          <DropDownOptions
            taskId={task.id}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </Card>
    </div>
  )
}

interface TaskListProps {
  tasks: TaskRead[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const [taskToEdit, setTaskToEdit] = useState<TaskRead | null>()
  const [taskToDelete, setTaskToDelete] = useState<TaskRead | null>()

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    setTaskToEdit(task)
  }

  const handleDelete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    setTaskToDelete(task)
  }

  return (
    <div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-5">
        {tasks?.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <DeleteTaskSheet
        task={taskToDelete ?? null}
        onOpenChange={(open) => {
          if (!open) setTaskToDelete(null)
        }}
      />
      <EditTaskSheet
        task={taskToEdit ?? null}
        onOpenChange={(open) => {
          if (!open) setTaskToEdit(null)
        }}
      />
    </div>
  )
}
