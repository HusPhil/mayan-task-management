export default function TaskListError({ message }: { message?: string }) {
  return <div>Something went wrong: {message ?? "unknown error"}</div>
}
