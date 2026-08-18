import type { TaskRead } from "@/types/api.types"
import { TaskStatus } from "@/types/domain.types"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { formatDate } from "@/utils/formatDate"

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
].slice(0, 3)

interface TaskCardProps {
  task: TaskRead
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="h-fit p-1">
      <Card key={task.id} className="p-0">
        <div className="px-5 py-3">
          <div className="flex items-start gap-3">
            <Checkbox
              className={"mt-0.5"}
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
        </div>
      </Card>
    </div>
  )
}
export default function TaskList() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      {dummyData.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  )
}
