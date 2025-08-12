"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Settings,
  HelpCircle,
  GitHub,
  Search,
} from "react-feather"
import ThemeToggle from "../../ui/ThemeToggle"
import "../../../components/layout/sideBar/sidebar.css"
import { docMenu, mainMenu } from "../../../config/menuConfig"
import { Badge } from "../../ui/Badge"
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
  const TEAMS_LINK = 'https://teams.microsoft.com/l/channel/19%3Adba96811f6294111bc98f6888b21c6c7%40thread.tacv2/General?groupId=8764bf80-eb87-433b-bc3f-62d32bd83223&tenantId=6966a3f2-5bcd-4b61-8466-99780e489b42';

  return (
    <motion.aside className="sidebar" initial="hidden" animate="visible" variants={sidebarAnimation}>
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-logo">
          <div className="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="icon-svg">
              <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
              <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
              <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
            </svg>
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
            {docMenu.map(({ label, to, icon: Icon, badge, submenu }) =>
              submenu ? (
                <li className="has-submenu" key={to}>
                  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                    <Icon size={16} />
                    <div className="sidebar-label">
                      <span>
                        {label}
                      </span>
                      {badge && <Badge>{badge.toUpperCase()}</Badge>}
                    </div>
                  </NavLink>
                  <ul className="sidebar-submenu">
                    {submenu.map(({ label, to, icon: SubIcon }) => (
                      <li key={to}>
                        <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                          <SubIcon size={14} />
                          <div className="sidebar-label">
                            <span>
                              {label}
                            </span>
                            {badge && <Badge>{badge.toUpperCase()}</Badge>}
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
                    <Icon size={16} />
                    <div className="sidebar-label">
                      <span>
                        {label}
                      </span>
                      {badge && <Badge>{badge.toUpperCase()}</Badge>}
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <a target="_blank" rel="noopener noreferrer" className="sidebar-icon-button">
          <GitHub size={16} />
        </a>
        <button className="sidebar-icon-button" onClick={() => {
          window.open(TEAMS_LINK, '_blank', 'noopener,noreferrer');
        }}>
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
