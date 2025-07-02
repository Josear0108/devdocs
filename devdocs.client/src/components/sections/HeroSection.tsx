"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Grid, Layers, PenTool } from "react-feather"
import { Button } from "../ui/button/Button"
import "../../styles/hero-section.css"

// Animaciones para los elementos del hero
const heroAnimation = {
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

const HeroSection = () => {
  return (
    <motion.div className="hero-section" initial="hidden" animate="visible" variants={heroAnimation}>
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
      </div>

      <div className="hero-content">
        <motion.div variants={itemAnimation} className="hero-badge">
          <span className="hero-badge-text">Documentación Técnica</span>
          <span className="hero-badge-separator">•</span>
          <span className="hero-badge-version">v1.0 Beta</span>
        </motion.div>

        <motion.div variants={itemAnimation} className="hero-title-container">
          <h1 className="hero-title">
            <span className="gradient-text">Documenta. Implementa. Crea.</span>
          </h1>

          <p className="hero-description">
            Una plataforma minimalista para documentar módulos, implementar componentes y utilizar herramientas de
            desarrollo.
          </p>
        </motion.div>

        <motion.div variants={itemAnimation} className="hero-buttons">
          <Link to="/componentes">
            <Button className="button-primary button-purple" variant="default" size="md">
              Explorar Documentación
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/componentes">
            <Button className="button-outline">
              Ver Componentes
              <FileText size={16} />
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={itemAnimation} className="hero-features">
          <motion.div
            className="hero-feature"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="hero-feature-icon hero-feature-purple">
              <Grid size={24} />
            </div>
            <span className="hero-feature-text">Componentes</span>
          </motion.div>

          <motion.div
            className="hero-feature"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="hero-feature-icon hero-feature-blue">
              <Layers size={24} />
            </div>
            <span className="hero-feature-text">Módulos</span>
          </motion.div>

          <motion.div
            className="hero-feature"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="hero-feature-icon hero-feature-teal">
              <PenTool size={24} />
            </div>
            <span className="hero-feature-text">Herramientas</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeroSection
