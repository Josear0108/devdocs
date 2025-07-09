"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText } from "react-feather"
import ThemeToggle from "../ui/ThemeToggle"
import "../../styles/mobile-nav.css"
import { mainMenu, docMenu } from "../../config/menuConfig"

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
                {mainMenu.map(({ label, to, icon: Icon }) => (
                  <li key={to}>
                    <NavLink to={to} onClick={toggleMenu}>
                      <Icon size={16} />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
                {docMenu.map(({ label, to, icon: Icon, submenu }) =>
                  submenu ? (
                    <li key={to}>
                      <NavLink to={to} onClick={toggleMenu}>
                        <Icon size={16} />
                        <span>{label}</span>
                      </NavLink>
                      <ul className="mobile-submenu">
                        {submenu.map(({ label, to, icon: SubIcon }) => (
                          <li key={to}>
                            <NavLink to={to} onClick={toggleMenu}>
                              <SubIcon size={16} />
                              <span>{label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={to}>
                      <NavLink to={to} onClick={toggleMenu}>
                        <Icon size={16} />
                        <span>{label}</span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default MobileNav
