import type { TaskRead, TaskUpdate } from "@/types/api.types"
import { TaskStatus } from "@/types/domain.types"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { ScrollArea } from "./ui/scroll-area"
import { formatDate } from "@/utils/formatDate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import {
  AlertCircle,
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2,
} from "lucide-react"
import DeleteTaskSheet from "./sheets/DeleteTaskSheet"
import EditTaskSheet from "./sheets/EditTaskSheet"
import { useState } from "react"
import useEditTask from "@/hooks/mutations/useEditTask"
import { Spinner } from "./ui/spinner"

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
  onCheckError: (isError: boolean) => void
}

function TaskCard({ task, onDelete, onEdit, onCheckError }: TaskCardProps) {
  const { isPending, mutate: checkTask } = useEditTask()

  const handleCompleteTask = (completed: boolean) => {
    const taskUpdate: TaskUpdate = {
      status: completed ? TaskStatus.COMPLETED : TaskStatus.INCOMPLETE,
    }
    checkTask(
      { taskId: task.id, taskUpdate },
      {
        onSuccess() {
          onCheckError(false)
        },
        onError: (error) => {
          onCheckError(true)
          console.error(error)
        },
      }
    )
  }

  return (
    <div className="h-fit p-1">
      <Card
        key={task.id}
        className="overflow-auto p-0 transition-colors hover:bg-muted/50"
      >
        <div className="flex items-start justify-between px-5 py-3">
          <div className="flex items-start gap-3">
            {isPending ? (
              <Spinner />
            ) : (
              <Checkbox
                className={"mt-0.5 cursor-pointer"}
                disabled={isPending}
                checked={task.status === TaskStatus.COMPLETED}
                onCheckedChange={handleCompleteTask}
              />
            )}
            <div>
              <div className="space-y-0.5">
                <p
                  className={`text-sm leading-snug font-medium text-foreground ${task.status === TaskStatus.COMPLETED && "text-muted-foreground line-through"}`}
                >
                  {task.title}
                </p>
                <p
                  className={`text-xs leading-relaxed whitespace-pre-line text-muted-foreground ${task.status === TaskStatus.COMPLETED && "text-muted-foreground line-through"}`}
                >
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
  const [isCheckError, setIsCheckEror] = useState<boolean>(false)

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    setTaskToEdit(task)
  }

  const handleDelete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    setTaskToDelete(task)
  }

  const handleCheckError = (isError: boolean) => {
    setIsCheckEror(isError)
  }

  if (tasks.length <= 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
        No tasks found.
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {isCheckError && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{"Something went wrong. Please try again."}</span>
        </div>
      )}
      <ScrollArea className="mb-5 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-3">
          {tasks?.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onCheckError={handleCheckError}
            />
          ))}
        </div>
      </ScrollArea>
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
