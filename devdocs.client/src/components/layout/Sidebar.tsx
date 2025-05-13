"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Home,
  FileText,
  Grid,
  Layers,
  PenTool,
  Package,
  Code,
  Settings,
  HelpCircle,
  GitHub,
  Search,
} from "react-feather"
import ThemeToggle from "../ui/ThemeToggle"
import "../../styles/sidebar.css"

const sidebarAnimation = {
  hidden: { x: -280 },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
}

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.aside className="sidebar" initial="hidden" animate="visible" variants={sidebarAnimation}>
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <FileText size={18} />
          </div>
          <span>DevDocs</span>
        </NavLink>
        <div className="sidebar-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <Home size={16} />
              <span>Inicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/noticias" className={({ isActive }) => (isActive ? "active" : "")}>
              <FileText size={16} />
              <span>Noticias</span>
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-group">
          <h3 className="sidebar-group-title">Documentación</h3>
          <ul className="sidebar-nav-list">
            <li>
              <NavLink to="/componentes" className={({ isActive }) => (isActive ? "active" : "")}>
                <Grid size={16} />
                <span>Componentes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/modulos" className={({ isActive }) => (isActive ? "active" : "")}>
                <Layers size={16} />
                <span>Módulos</span>
              </NavLink>
            </li>
            <li className="has-submenu">
              <NavLink to="/herramientas" className={({ isActive }) => (isActive ? "active" : "")}>
                <PenTool size={16} />
                <span>Herramientas</span>
              </NavLink>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/herramientas/generador-qr" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Code size={14} />
                    <span>Generador QR</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/herramientas/generador-plantillas"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <Package size={14} />
                    <span>Generador de Plantillas</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="sidebar-icon-button">
          <GitHub size={16} />
        </a>
        <button className="sidebar-icon-button">
          <HelpCircle size={16} />
        </button>
        <button className="sidebar-icon-button">
          <Settings size={16} />
        </button>
        <ThemeToggle />
      </div>
    </motion.aside>
  )
}

export default Sidebar
