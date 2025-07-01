"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card } from "../components/ui/card/Card"
import { Badge } from "../components/ui/badge/Badge"
import { PageHeader } from "../components/ui/PageHeader"
import { modulesData } from "../data/modules"
import "../styles/modules-page.css"

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

const ModulesPage = () => {
  return (
    <motion.div
      className="modules-page"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      <PageHeader
        title="Módulos"
        description="Explora nuestra colección de módulos reutilizables para acelerar tu desarrollo"
      />

      <div className="modules-grid">
        {modulesData.map((module) => (
          <motion.div key={module.id} variants={itemAnimation}>
            <Link to={`/modulos/${module.slug}`} className="module-card-link">
              <Card className="module-card">
                <div className="module-card-header">
                  <div className={`module-icon ${module.category.toLowerCase()}`}>
                    {module.icon}
                  </div>
                  <Badge className="module-badge">{module.category}</Badge>
                </div>
                <h3 className="module-title">{module.name}</h3>
                <p className="module-description">{module.description}</p>
                <div className="module-footer">
                  <span className="module-version">v{module.version}</span>
                  <span className="module-update">
                    Última actualización: {new Date(module.lastUpdate).toLocaleDateString()}
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

export default ModulesPage 