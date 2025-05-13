"use client"

import { forwardRef } from "react"
import "../../styles/ui/separator.css"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({ className = "", ...props }, ref) => {
  const separatorClasses = ["separator", className].join(" ")

  return <div ref={ref} className={separatorClasses} {...props} />
})

Separator.displayName = "Separator"
