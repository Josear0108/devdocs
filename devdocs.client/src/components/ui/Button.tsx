"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import "../../styles/ui/button.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", size = "md", className = "", ...props }, ref) => {
    const buttonClasses = ["button", `button-${variant}`, `button-${size}`, className].join(" ")

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

Button.displayName = "Button"
