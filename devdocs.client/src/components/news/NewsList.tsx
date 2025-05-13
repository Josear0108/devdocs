"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "react-feather"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { newsData } from "../../data/news"
import "../../styles/news-list.css"

// Animaciones para la lista de noticias
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const NewsList = () => {
  const [news] = useState(newsData)

  const getGradientClass = (index: number) => {
    const gradients = ["gradient-purple", "gradient-blue", "gradient-teal"]
    return gradients[index % gradients.length]
  }

  return (
    <motion.div className="news-list" variants={containerAnimation} initial="hidden" animate="visible">
      {news.map((item, index) => (
        <motion.div key={item.id} variants={itemAnimation}>
          <Link to={`/noticias/${item.id}`} className="news-card-link">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="news-card">
                <div className="news-image-container">
                  <img
                    src={item.image || `https://via.placeholder.com/400x200?text=${item.title}`}
                    alt={item.title}
                    className="news-image"
                  />
                  <div className="news-image-overlay"></div>
                  <Badge className={`news-badge ${getGradientClass(index)}`}>{item.category}</Badge>
                </div>
                <div className="news-content">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
                </div>
                <div className="news-footer">
                  <div className="news-meta">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span className="news-meta-separator">•</span>
                    <span>{item.author}</span>
                  </div>
                  <Button className="news-button">
                    Leer <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
