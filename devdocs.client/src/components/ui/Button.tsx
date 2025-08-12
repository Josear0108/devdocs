import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import "../../styles/ui/button.css"

/** Define aqu� tus variantes y tama�os */
type Variant = "default" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: Variant
    size?: Size
    className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = "default", size = "md", className = "", whileHover = { scale: 1.02 }, whileTap = { scale: 0.98 }, transition = { duration: 0.2 }, ...props }, ref) => {
        const btn = [
            "button",
            `button-${variant}`,
            `button-${size}`,
            className
        ].filter(Boolean).join(" ")

        return (
            <motion.button
                ref={ref}
                className={btn}
                whileHover={whileHover}
                whileTap={whileTap}
                transition={transition}
                {...props}
            >
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"
