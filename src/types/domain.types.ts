const TaskStatus = {
  INCOMPLETE: 0,
  COMPLETED: 1,
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  created_at: string
}
