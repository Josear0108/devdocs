import type React from "react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function Callout({ children, icon, className, ...props }: CalloutProps) {
  return (
    <div className={cn("flex items-start rounded-md border border-border bg-card p-4", className)} {...props}>
      {icon && <div className="mr-4 mt-1">{icon}</div>}
      <div>{children}</div>
    </div>
  )
}
