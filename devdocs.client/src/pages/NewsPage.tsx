"use client"

import { motion } from "framer-motion"
import { NewsFilter } from "../components/news/NewsFilter"
import { NewsList } from "../components/news/NewsList"
import { PageHeader } from "../components/ui/PageHeader"
import "../styles/news-page.css"

// Animaciones para la página
const pageAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const NewsPage = () => {
  return (
    <motion.div className="container" initial="hidden" animate="visible" variants={pageAnimation}>
      <motion.div variants={itemAnimation}>
        <PageHeader
          title="Noticias y Actualizaciones"
          description="Mantente al día con las últimas noticias, actualizaciones y anuncios sobre nuestra plataforma y tecnologías."
        />
      </motion.div>

      <motion.div variants={itemAnimation}>
        <NewsFilter />
      </motion.div>

      <motion.div variants={itemAnimation}>
        <NewsList />
      </motion.div>
    </motion.div>
  )
}

export default NewsPage
