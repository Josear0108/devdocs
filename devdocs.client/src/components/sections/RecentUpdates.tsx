"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, FileText, Zap, Code } from "react-feather"
import { Card } from "../ui/card/Card"
import { Badge } from "../ui/badge/Badge"
import { newsData } from "../../data/news"
import "../../styles/recent-updates.css"

// Animaciones para las actualizaciones
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

const RecentUpdates = () => {
  // Mostrar solo las 3 actualizaciones más recientes
  const recentUpdates = newsData.slice(0, 3)

  const getIconComponent = (id: string) => {
    switch (id) {
      case "nueva-version-componentes":
        return <Code size={20} />
      case "mejoras-rendimiento-plataforma":
        return <Zap size={20} />
      case "documentacion-api-actualizada":
        return <FileText size={20} />
      default:
        return <FileText size={20} />
    }
  }

  const getGradientClass = (index: number) => {
    const gradients = ["gradient-purple", "gradient-blue", "gradient-teal"]
    return gradients[index % gradients.length]
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerAnimation}>
      <Card className="recent-updates-card">
        <div className="recent-updates-header">
          <h3>Actualizaciones recientes</h3>
        </div>
        <div className="recent-updates-list">
          {recentUpdates.map((update, index) => (
            <motion.div key={update.id} variants={itemAnimation}>
              <Link to={`/noticias/${update.id}`} className="update-item">
                <div className={`update-icon ${getGradientClass(index)}`}>{getIconComponent(update.id)}</div>
                <div className="update-content">
                  <div className="update-title-row">
                    <h4 className="update-title">{update.title}</h4>
                    <Badge className={`update-badge ${getGradientClass(index)}`}>{update.category}</Badge>
                  </div>
                  <p className="update-excerpt">{update.excerpt}</p>
                  <div className="update-meta">
                    <Calendar size={12} />
                    <span>{new Date(update.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export default RecentUpdates
