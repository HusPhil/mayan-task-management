import Filters from "./components/Filters"
import Header from "./components/Header"
import TaskList from "./components/TaskList"

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full max-w-lg flex-1 flex-col px-3 md:px-0">
        <Header />
        <Filters />
        <TaskList />
      </div>
    </div>
  )
}

export default App
