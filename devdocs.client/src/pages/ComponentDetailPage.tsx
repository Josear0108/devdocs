"use client"

import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/PageHeader"
import { Separator } from "../components/ui/Separator"
import { componentsData } from "../data/components"
import "../styles/component-detail.css"

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

const ComponentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const component = componentsData.find((c) => c.id === slug)

  if (!component) {
    return (
      <div className="container">
        <PageHeader title="Componente no encontrado" description="El componente que buscas no existe." />
      </div>
    )
  }

  return (
    <motion.div className="container" initial="hidden" animate="visible" variants={pageAnimation}>
      <motion.div variants={itemAnimation}>
        <PageHeader
          title={component.name}
          description={`${component.description} • Versión ${component.version}`}
        />
      </motion.div>

      <motion.div className="component-detail-content" variants={itemAnimation}>
        <div className="component-detail-main">
          <section className="component-section">
            <h2>Descripción</h2>
            <p>{component.description}</p>
          </section>

          <Separator />

          <section className="component-section">
            <h2>Detalles</h2>
            <div className="component-details">
              <div className="component-detail-item">
                <span className="detail-label">Categoría</span>
                <span className="detail-value">{component.category}</span>
              </div>
              <div className="component-detail-item">
                <span className="detail-label">Versión</span>
                <span className="detail-value">v{component.version}</span>
              </div>
              <div className="component-detail-item">
                <span className="detail-label">Última actualización</span>
                <span className="detail-value">{new Date(component.lastUpdate).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <Separator />

          <section className="component-section">
            <h2>Ejemplo de uso</h2>
            <div className="component-example">
              {/* Aquí iría el ejemplo de uso del componente */}
              <p>Ejemplo de implementación del componente {component.name}</p>
            </div>
          </section>
        </div>

        <aside className="component-detail-sidebar">
          <div className="component-sidebar-section">
            <h3>Información</h3>
            <ul className="component-sidebar-list">
              <li>
                <span className="sidebar-label">Categoría</span>
                <span className="sidebar-value">{component.category}</span>
              </li>
              <li>
                <span className="sidebar-label">Versión</span>
                <span className="sidebar-value">v{component.version}</span>
              </li>
              <li>
                <span className="sidebar-label">Última actualización</span>
                <span className="sidebar-value">{new Date(component.lastUpdate).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
        </aside>
      </motion.div>
    </motion.div>
  )
}

export default ComponentDetailPage 