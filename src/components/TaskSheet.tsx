import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import type { ReactNode } from "react"

interface TaskSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  title: string
  description: string

  children?: ReactNode

  isPending: boolean
  isError: boolean

  actionLabel: string
  pendingLabel: string
  actionVariant?: "default" | "destructive" | "outline"

  onAction: () => void
}

export default function TaskSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  isPending,
  isError,
  actionLabel,
  pendingLabel,
  actionVariant = "default",
  onAction,
}: TaskSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="inset-x-0 mx-auto mb-4 w-[calc(100%-2rem)] max-w-2xl rounded-xl"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>

          {isError && (
            <div className="mt-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}
        </SheetHeader>

        {children}

        <SheetFooter>
          <Button
            disabled={isPending}
            className="w-full disabled:cursor-not-allowed"
            variant={actionVariant}
            onClick={onAction}
          >
            {isPending ? pendingLabel : actionLabel}
          </Button>

          <SheetClose>
            <Button
              disabled={isPending}
              className="w-full disabled:cursor-not-allowed"
              variant="outline"
            >
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
