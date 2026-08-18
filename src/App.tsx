import Header from "./components/Header"
import TaskList from "./components/TaskList"

export function App() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex max-w-lg flex-1 flex-col">
        <Header />
        <TaskList />
      </div>
    </div>
  )
}

export default App
