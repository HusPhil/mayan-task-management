import { useQuery } from "@tanstack/react-query"
import Filters from "./components/Filters"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import { tasksQueryOption } from "./api/tasks.options"
import TaskListError from "./components/TaskListError"
import TaskListLoading from "./components/TaskListLoading"

export function App() {
  const { data: tasks, isLoading, error } = useQuery(tasksQueryOption())

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full max-w-lg flex-1 flex-col px-3 md:px-0">
        <Header />
        <Filters />
        {isLoading ? (
          <TaskListLoading />
        ) : error ? (
          <TaskListError message={error.message} />
        ) : tasks == null ? (
          <TaskListError message="Tasks is not defined" />
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  )
}

export default App
