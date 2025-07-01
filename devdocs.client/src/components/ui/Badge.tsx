"use client"

import { forwardRef } from "react"
import "../../styles/ui/badge.css"

type Variant = "default" | "secondary" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    className?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ children, variant = "default", className = "", ...props }, ref) => {
        // Construimos las clases: siempre “badge”, más la de variante y la que pase el user
        const badgeClasses = ["badge", `badge--${variant}`, className]
            .filter(Boolean)
            .join(" ")

        return (
            <span ref={ref} className={badgeClasses} {...props}>
                {children}
            </span>
        )
    }
)

Badge.displayName = "Badge"
