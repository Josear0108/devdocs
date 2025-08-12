"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Code, Droplet } from "react-feather"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { toolsData } from "../../data/tools"
import "../../styles/popular-tools.css"

// Animaciones para las herramientas
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

const PopularTools = () => {
  // Mostrar solo las 3 herramientas más populares
  const popularTools = toolsData.slice(0, 3)

  const getIconComponent = (id: string) => {
    switch (id) {
      case "generador-qr":
        return <Code size={24} />
      case "generador-plantillas":
        return <FileText size={24} />
      case "generador-colores":
        return <Droplet size={24} />
      default:
        return <FileText size={24} />
    }
  }

  const getGradientClass = (index: number) => {
    const gradients = ["gradient-purple", "gradient-blue", "gradient-teal"]
    return gradients[index % gradients.length]
  }

  return (
    <motion.div className="popular-tools" variants={containerAnimation} initial="hidden" animate="visible">
      {popularTools.map((tool, index) => (
        <motion.div key={tool.id} variants={itemAnimation}>
          <Link to={`/herramientas/${tool.id}`} className="tool-card-link">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="tool-card">
                <div className="tool-card-header">
                  <div className={`tool-icon ${getGradientClass(index)}`}>{getIconComponent(tool.id)}</div>
                  <Badge className="tool-badge">{tool.category}</Badge>
                </div>
                <h3 className="tool-title">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-footer">
                  <Button className="tool-button">
                    Usar Herramienta <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PopularTools
