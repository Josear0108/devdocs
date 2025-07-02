"use client"

import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/PageHeader"
import { componentsData } from "../data/components"
import "../styles/components-page.css"
import { useNavigate } from "react-router-dom"

const pageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
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

const ComponentsPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div className="container" initial="hidden" animate="visible" variants={pageAnimation}>
      <motion.div variants={itemAnimation}>
        <PageHeader
          title="Componentes"
          description="Explora nuestra biblioteca de componentes reutilizables con documentación detallada y ejemplos de uso."
        />
      </motion.div>

      <motion.div className="components-grid" variants={itemAnimation}>
        {componentsData.map((component) => (
          <motion.div
            key={component.id}
            className="component-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => navigate(`/componentes/${component.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="component-card-header">
              <h3 className="component-title">{component.name}</h3>
              <span className="component-version">v{component.lastUpdate}</span>
            </div>
            <p className="component-description">{component.description}</p>
            <div className="component-footer">
              <span className="component-category">{component.category}</span>
              <span className="component-update">
                Última actualización: {new Date(component.lastUpdate).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ComponentsPage 