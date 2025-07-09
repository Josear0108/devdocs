"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FileText,
  Settings,
  HelpCircle,
  GitHub,
  Search,
} from "react-feather"
import ThemeToggle from "../ui/ThemeToggle"
import "../../styles/sidebar.css"
import { docMenu, mainMenu } from "../../config/menuConfig"

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
          {mainMenu.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-group">
          <h3 className="sidebar-group-title">Documentación</h3>
          <ul className="sidebar-nav-list">
            {docMenu.map(({ label, to, icon: Icon, submenu }) =>
              submenu ? (
                <li className="has-submenu" key={to}>
                  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                    <Icon size={16} />
                    <span>{label}</span>
                  </NavLink>
                  <ul className="sidebar-submenu">
                    {submenu.map(({ label, to, icon: SubIcon }) => (
                      <li key={to}>
                        <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                          <SubIcon size={14} />
                          <span>{label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                    <Icon size={16} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
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
