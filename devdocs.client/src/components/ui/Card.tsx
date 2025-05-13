"use client"

import {  forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import "../../styles/ui/card.css"

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "bordered" | "elevated"
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", className = "", ...props }, ref) => {
    const cardClasses = ["card", `card-${variant}`, className].join(" ")

  return (
    <motion.div
      ref={ref}
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
  },
)

Card.displayName = "Card"

export function CardContent({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["card-content", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["card-header", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={["card-title", className].join(" ")} {...props}>
      {children}
    </h3>
  );
}
