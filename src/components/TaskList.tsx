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

const dummyData: TaskRead[] = [
  {
    id: "1",
    title: "Review project requirements",
    description: "Go through the PRD and identify key features for the MVP.",
    created_at: "2026-08-17T07:02:26.347001Z",
    status: TaskStatus.INCOMPLETE,
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment.",
    created_at: "2026-08-18T08:10:07.547136Z",
    status: TaskStatus.INCOMPLETE,
  },
  {
    id: "3",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "5",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "7",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "8",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "9",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "10",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },

  {
    id: "11",
    title: "Design database schema",
    description: "Create ERD for users, tasks, and projects tables.",
    created_at: "2026-08-18T09:34:13.564469Z",
    status: TaskStatus.INCOMPLETE,
  },
].slice(0, 13)

interface DropDownOptionsProps {
  task_id: string
  onEdit: (task_id: string) => void
  onDelete: (task_id: string) => void
}

function DropDownOptions({ task_id, onDelete, onEdit }: DropDownOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon-xs"}>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(task_id)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(task_id)}
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
  onEdit: (task_id: string) => void
  onDelete: (task_id: string) => void
}

function TaskCard({ onDelete, onEdit, task }: TaskCardProps) {
  return (
    <div className="h-fit p-1">
      <Card key={task.id} className="p-0 transition-colors hover:bg-muted/50">
        <div className="flex items-start justify-between px-5 py-3">
          <div className="flex items-start gap-3">
            <Checkbox
              className={"mt-0.5 cursor-pointer"}
              checked={task.status === TaskStatus.COMPLETED}
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
            task_id={task.id}
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

  const handleEdit = (task_id: string) => {
    const task = dummyData.find((t) => t.id === task_id)
    setTaskToEdit(task)
  }

  const handleDelete = (task_id: string) => {
    const task = dummyData.find((t) => t.id === task_id)
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
