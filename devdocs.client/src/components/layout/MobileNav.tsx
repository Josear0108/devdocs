"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, Home, FileText as Newspaper, Grid, Layers, PenTool, Package, Code } from "react-feather"
import ThemeToggle from "../ui/ThemeToggle"
import "../../styles/mobile-nav.css"

const menuAnimation = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "-100%",
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
}

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="mobile-nav">
      <div className="mobile-nav-container">
        <div className="mobile-nav-left">
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <Menu size={20} />
            <span className="sr-only">Abrir menú</span>
          </button>
          <NavLink to="/" className="mobile-logo">
            <div className="mobile-logo-icon">
              <FileText size={18} />
            </div>
            <span>DevDocs</span>
          </NavLink>
        </div>
        <div className="mobile-nav-right">
          <ThemeToggle />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="mobile-menu" initial="hidden" animate="visible" exit="exit" variants={menuAnimation}>
            <div className="mobile-menu-header">
              <button className="mobile-menu-close" onClick={toggleMenu}>
                <X size={20} />
                <span className="sr-only">Cerrar menú</span>
              </button>
            </div>
            <nav className="mobile-menu-content">
              <ul className="mobile-menu-list">
                <li>
                  <NavLink to="/" onClick={toggleMenu}>
                    <Home size={16} />
                    <span>Inicio</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/noticias" onClick={toggleMenu}>
                    <Newspaper size={16} />
                    <span>Noticias</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/componentes" onClick={toggleMenu}>
                    <Grid size={16} />
                    <span>Componentes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/modulos" onClick={toggleMenu}>
                    <Layers size={16} />
                    <span>Módulos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/herramientas" onClick={toggleMenu}>
                    <PenTool size={16} />
                    <span>Herramientas</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/herramientas/generador-qr" onClick={toggleMenu}>
                    <Code size={16} />
                    <span>Generador QR</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/herramientas/generador-plantillas" onClick={toggleMenu}>
                    <Package size={16} />
                    <span>Generador de Plantillas</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default MobileNav
