"use client"

import { forwardRef } from "react"
import "../../styles/ui/badge.css"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ children, className = "", ...props }, ref) => {
  const badgeClasses = ["badge", className].join(" ")

    return (
    <span ref={ref} className={badgeClasses} {...props}>
        {children}
    </span>
    )
})

Badge.displayName = "Badge"
