"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Grid, Menu, User } from "react-feather"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { componentsData } from "../../data/components"
import "../../styles/featured-components.css"

// Animaciones para los componentes
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

const FeaturedComponents = () => {
  // Mostrar solo los 3 primeros componentes
  const featuredComponents = componentsData.slice(0, 3)

  const getIconComponent = (id: string) => {
    switch (id) {
      case "button":
        return <Grid size={24} />
      case "dropdown":
        return <Menu size={24} />
      case "avatar":
        return <User size={24} />
      default:
        return <Grid size={24} />
    }
  }

  const getGradientClass = (index: number) => {
    const gradients = ["gradient-purple", "gradient-blue", "gradient-teal"]
    return gradients[index % gradients.length]
  }

  return (
    <motion.div className="featured-components" variants={containerAnimation} initial="hidden" animate="visible">
      {featuredComponents.map((component, index) => (
        <motion.div key={component.id} variants={itemAnimation}>
          <Link to={`/componentes/${component.id}`} className="component-card-link">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="component-card">
                <div className="component-card-header">
                  <div className={`component-icon ${getGradientClass(index)}`}>{getIconComponent(component.id)}</div>
                  <Badge className="component-badge">{component.category}</Badge>
                </div>
                <h3 className="component-title">{component.name}</h3>
                <p className="component-description">{component.description}</p>
                <div className="component-footer">
                  <span className="component-version">v{component.version}</span>
                  <Button className="component-button">
                    Ver <ArrowRight size={14} />
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

export default FeaturedComponents
