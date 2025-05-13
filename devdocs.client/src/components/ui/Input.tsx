"use client"

import { forwardRef, type InputHTMLAttributes } from "react"
import "../../styles/ui/input.css"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={["input", className].join(" ")}
        {...props}
      />
    )
  }
)

Input.displayName = "Input" 