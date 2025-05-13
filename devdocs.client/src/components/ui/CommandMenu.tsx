"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, X, Home, FileText, Grid, Layers, PenTool, Code, Package } from "react-feather"
import "../../styles/ui/command-menu.css"

const CommandMenu: React.FC = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsOpen(false)
    setSearchQuery("")
  }

  if (!isOpen) {
    return (
      <button className="command-button" onClick={() => setIsOpen(true)}>
        <Search size={16} />
        <span className="sr-only">Buscar</span>
      </button>
    )
  }

  return (
    <div className="command-overlay">
      <div className="command-modal">
        <div className="command-header">
          <div className="command-search">
            <Search size={16} className="command-search-icon" />
            <input
              type="text"
              placeholder="Buscar documentación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="command-input"
            />
          </div>
          <button className="command-close" onClick={() => setIsOpen(false)}>
            <X size={16} />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <div className="command-content">
          <div className="command-group">
            <div className="command-group-heading">Navegación</div>
            <div className="command-items">
              <button className="command-item" onClick={() => handleNavigate("/")}>
                <Home size={16} />
                <span>Inicio</span>
              </button>
              <button className="command-item" onClick={() => handleNavigate("/noticias")}>
                <FileText size={16} />
                <span>Noticias</span>
              </button>
              <button className="command-item" onClick={() => handleNavigate("/componentes")}>
                <Grid size={16} />
                <span>Componentes</span>
              </button>
              <button className="command-item" onClick={() => handleNavigate("/modulos")}>
                <Layers size={16} />
                <span>Módulos</span>
              </button>
              <button className="command-item" onClick={() => handleNavigate("/herramientas")}>
                <PenTool size={16} />
                <span>Herramientas</span>
              </button>
            </div>
          </div>
          <div className="command-separator"></div>
          <div className="command-group">
            <div className="command-group-heading">Herramientas</div>
            <div className="command-items">
              <button className="command-item" onClick={() => handleNavigate("/herramientas/generador-qr")}>
                <Code size={16} />
                <span>Generador de Códigos QR</span>
              </button>
              <button className="command-item" onClick={() => handleNavigate("/herramientas/generador-plantillas")}>
                <Package size={16} />
                <span>Generador de Plantillas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandMenu
