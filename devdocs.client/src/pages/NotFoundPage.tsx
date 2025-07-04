"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home } from "react-feather"
import { Button } from "../components/ui/button/Button"
import "../styles/not-found.css"

const NotFoundPage = () => {
  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página no encontrada</h2>
        <p className="not-found-description">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="not-found-button">
            <Home size={16} />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default NotFoundPage 