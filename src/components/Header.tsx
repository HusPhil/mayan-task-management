import { ListTodoIcon } from "lucide-react"
import CreateTaskSheet from "./sheets/CreateTaskSheet"

export default function Header() {
  return (
    <div className="flex items-center justify-between border px-1 py-5">
      <div className="flex items-center gap-2">
        <ListTodoIcon size={30} />
        <h1 className="text-2xl font-semibold">Mayan Tasks</h1>
      </div>
      <CreateTaskSheet />
    </div>
  )
}
