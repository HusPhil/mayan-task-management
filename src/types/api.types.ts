import type { Task } from "./domain.types"

export type TaskCreate = Pick<Task, "description" | "title">

export type TaskUpdate = Partial<Pick<Task, "description" | "title" | "status">>

export interface TaskRead extends Task {}
