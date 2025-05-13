"use client"

import { motion } from "framer-motion"
import { Separator } from "./Separator"
import "../../styles/ui/page-header.css"

interface PageHeaderProps {
  title: string
  description: string
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="page-header">
      <motion.div
        className="page-header-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="page-header-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="page-header-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {description}
        </motion.p>
      </motion.div>
      <Separator />
    </div>
  )
}
