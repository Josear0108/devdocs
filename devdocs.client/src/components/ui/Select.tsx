"use client"

import { type SelectHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import "../../styles/ui/select.css"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, className = "", ...props }, ref) => {
  const selectClasses = ["select", className].join(" ")

  return (
    <motion.select
      ref={ref}
      className={selectClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.select>
  )
})

Select.displayName = "Select"
