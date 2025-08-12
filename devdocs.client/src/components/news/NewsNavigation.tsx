import type React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "react-feather"
import { Button } from "../ui/Button"
import { newsData } from "../../data/news"
import "../../styles/news/news-navigation.css"

interface NewsNavigationProps {
  currentSlug: string
}

export const NewsNavigation: React.FC<NewsNavigationProps> = ({ currentSlug }) => {
  // Encontrar el índice de la noticia actual
  const currentIndex = newsData.findIndex((news) => news.id === currentSlug)

  // Determinar la noticia anterior y siguiente
  const prevNews = currentIndex > 0 ? newsData[currentIndex - 1] : null
  const nextNews = currentIndex < newsData.length - 1 ? newsData[currentIndex + 1] : null

  return (
    <div className="news-navigation">
      {prevNews ? (
        <Link to={`/noticias/${prevNews.id}`}>
          <Button className="news-nav-button news-prev-button">
            <ArrowLeft size={16} />
            <span>Artículo anterior</span>
          </Button>
        </Link>
      ) : (
        <div></div> // Espacio vacío para mantener el layout
      )}

      {nextNews ? (
        <Link to={`/noticias/${nextNews.id}`}>
          <Button className="news-nav-button news-next-button">
            <span>Artículo siguiente</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      ) : (
        <div></div> // Espacio vacío para mantener el layout
      )}
    </div>
  )
}
