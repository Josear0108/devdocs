"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card } from "../components/ui/card/Card"
import { Badge } from "../components/ui/badge/Badge"
import { PageHeader } from "../components/ui/PageHeader"
import { toolsData } from "../data/tools"
import "../styles/tools-page.css"

// Animaciones para la página
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const ToolsPage = () => {
  return (
    <motion.div
      className="tools-page"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      <PageHeader
        title="Herramientas"
        description="Utiliza nuestras herramientas para mejorar tu flujo de trabajo"
      />

      <div className="tools-grid">
        {toolsData.map((tool) => (
          <motion.div key={tool.id} variants={itemAnimation}>
            <Link to={`/herramientas/${tool.id}`} className="tool-card-link">
              <Card className="tool-card">
                <div className="tool-card-header">
                  <div className={`tool-icon ${tool.category.toLowerCase()}`}>
                    {tool.icon}
                  </div>
                  <Badge className="tool-badge">{tool.category}</Badge>
                </div>
                <h3 className="tool-title">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-footer">
                  <span className="tool-version">v{tool.version}</span>
                  <span className="tool-update">
                    Última actualización: {new Date(tool.lastUpdate).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ToolsPage 