"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "react-feather"
import { useTheme } from "../../context/ThemeContext"
import "../../styles/ui/theme-toggle.css"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button className="theme-toggle" onClick={toggleTheme} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
      {theme === "dark" ? (
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={16} className="theme-toggle-icon" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Moon size={16} className="theme-toggle-icon" />
        </motion.div>
      )}
      <span className="sr-only">Cambiar tema</span>
    </motion.button>
  )
}

export default ThemeToggle
