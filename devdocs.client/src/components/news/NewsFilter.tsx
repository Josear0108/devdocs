"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "react-feather"
import { Button } from "../ui/Button"
import { Select } from "../ui/Select"
import "../../styles/news-filter.css"

export const NewsFilter = () => {
  const [category, setCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilter = () => {
    // Implementar lógica de filtrado
    console.log("Filtrar por:", { category, searchQuery })
  }

  return (
    <motion.div
      className="news-filter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="news-search-container">
        <Search className="news-search-icon" size={16} />
        <input
          type="search"
          placeholder="Buscar noticias..."
          className="news-search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="news-filter-controls">
        <Select value={category} onChange={handleCategoryChange} className="news-category-select">
          <option value="all">Todas las categorías</option>
          <option value="lanzamiento">Lanzamiento</option>
          <option value="actualizacion">Actualización</option>
          <option value="documentacion">Documentación</option>
          <option value="evento">Evento</option>
          <option value="caracteristica">Característica</option>
          <option value="comunidad">Comunidad</option>
        </Select>
        <Button onClick={handleFilter} className="news-filter-button">
          Filtrar
        </Button>
      </div>
    </motion.div>
  )
}
