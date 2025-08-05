"use client"
import { motion } from "framer-motion"
import { Search } from "react-feather"
import HeroSection from "../components/sections/HeroSection"
import FeaturedComponents from "../components/sections/FeaturedComponents"
import { Tabs } from "../components/ui/TabsEdesk"
import "../styles/home-page.css"

// Animación para la entrada de la página
const pageAnimation = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

// Animación para los elementos hijos
const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  }
}

const HomePage = () => {
  return (
    <motion.div className="container" initial="hidden" animate="visible" variants={pageAnimation}>
      <HeroSection />

      <motion.div className="explore-section" variants={itemAnimation}>
        <div className="explore-header">
          <h2>Explorar Plataforma</h2>
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input type="search" placeholder="Buscar en la documentación..." className="search-input" />
          </div>
        </div>

        {/* 2. ESTRUCTURA DE TABS ACTUALIZADA */}
        <Tabs defaultActiveId="destacados" orientation="horizontal">
          <Tabs.List>
            <Tabs.Trigger tabId="destacados">Destacados</Tabs.Trigger>
            {/* <Tabs.Trigger tabId="recientes">Actualizaciones</Tabs.Trigger>
            <Tabs.Trigger tabId="herramientas">Herramientas</Tabs.Trigger> */}
          </Tabs.List>

          <Tabs.Panels>
            <Tabs.Panel tabId="destacados">
              <FeaturedComponents />
            </Tabs.Panel>
            {/* <Tabs.Panel tabId="recientes">
              <RecentUpdates />
            </Tabs.Panel>
            <Tabs.Panel tabId="herramientas">
              <PopularTools />
            </Tabs.Panel> */}
          </Tabs.Panels>
        </Tabs>
      </motion.div>

      {/* <motion.div className="cards-grid" variants={itemAnimation}>
        <Card className="card card-purple">
          <div className="card-header">
            <h3>Componentes</h3>
            <p>Biblioteca de componentes reutilizables con documentación detallada</p>
          </div>
          <div className="card-content">
            <p>Explora nuestra colección de componentes UI con ejemplos, código y guías de implementación.</p>
          </div>
          <div className="card-footer">
            <Link to="/componentes">
              <Button className="button-purple">Ver Componentes</Button>
            </Link>
          </div>
        </Card>

        <Card className="card card-blue">
          <div className="card-header">
            <h3>Módulos</h3>
            <p>Módulos funcionales con historial de versiones y actualizaciones</p>
          </div>
          <div className="card-content">
            <p>Accede a la documentación de módulos con historial de cambios, correcciones y nuevas características.</p>
          </div>
          <div className="card-footer">
            <Link to="/modulos">
              <Button className="button-blue">Ver Módulos</Button>
            </Link>
          </div>
        </Card>

        <Card className="card card-teal">
          <div className="card-header">
            <h3>Herramientas</h3>
            <p>Utilidades y generadores para optimizar tu flujo de trabajo</p>
          </div>
          <div className="card-content">
            <p>Utiliza nuestras herramientas como generadores de QR, plantillas y más para agilizar tu desarrollo.</p>
          </div>
          <div className="card-footer">
            <Link to="/herramientas">
              <Button className="button-teal">Ver Herramientas</Button>
            </Link>
          </div>
        </Card>
      </motion.div> */}
    </motion.div>
  )
}

export default HomePage
