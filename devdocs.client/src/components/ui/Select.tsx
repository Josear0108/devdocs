import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import "../../styles/ui/select.css"
interface SelectProps extends HTMLMotionProps<"select"> {
    className?: string;
    /* más props propias si hiciera falta */
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ children, className = "", ...props }, ref) => {
        const selectClasses = ["select", className].filter(Boolean).join(" ")
        return (
            <motion.select
                ref={ref}
                className={selectClasses}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                {...props}   // aqui ya sólo entran los props correctos
            >
                {children}
            </motion.select>
        )
    }
)

Select.displayName = "Select"
