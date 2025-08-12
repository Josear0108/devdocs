"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, AlertCircle, Mail } from "react-feather"
import { Button } from "../components/ui/Button"
import { useState, useEffect } from "react"
import "../styles/not-found.css"

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSupportClick = () => {
    window.open('https://teams.microsoft.com/l/channel/19%3Adba96811f6294111bc98f6888b21c6c7%40thread.tacv2/General?groupId=8764bf80-eb87-433b-bc3f-62d32bd83223&tenantId=6966a3f2-5bcd-4b61-8466-99780e489b42', '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating background elements */}
      <div 
        className="floating-element floating-element-1"
        style={{
          transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * 10 - 5}px)`
        }}
      />
      <div 
        className="floating-element floating-element-2"
        style={{
          transform: `translate(${mousePosition.x * -8 + 4}px, ${mousePosition.y * -8 + 4}px)`
        }}
      />

      <div className="not-found-content">
        {/* Edesk branding */}
        <motion.div 
          className="edesk-branding"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="brand-badge">
            <div className="brand-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="icon-svg">
                <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
              </svg>
            </div>
            <span className="brand-text">Edesk</span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="main-content">
          {/* Animated icon */}
          <motion.div 
            className="error-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AlertCircle size={120} className="alert-icon" />
          </motion.div>
          
          <motion.h1 
            className="not-found-title gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="not-found-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Oops! Página no encontrada
          </motion.h2>
          
          <motion.p 
            className="not-found-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            La página que buscas no existe o ha sido movida. Quizás esté perdida en el mundo digital o tomando un café.
          </motion.p>
          
          <motion.div 
            className="action-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Link to="/">
              <Button className="primary-button">
                <Home size={16} />
                Ir al inicio
              </Button>
            </Link>
            <Button className="secondary-button" onClick={handleSupportClick}>
              <Mail size={16} />
              Contactar soporte
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFoundPage 