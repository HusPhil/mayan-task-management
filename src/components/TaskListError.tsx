import { AlertTriangleIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function TaskListError({ message }: { message?: string }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 py-8 text-center">
      <AlertTriangleIcon className="mx-auto mb-2 size-8 text-destructive" />
      <p className="text-sm font-medium text-destructive">
        Something went wrong
      </p>
      <p className="text-xs text-destructive">{message}</p>
      <Button
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  )
}
