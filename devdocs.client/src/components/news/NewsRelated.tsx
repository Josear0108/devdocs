import type React from "react"
import { Link } from "react-router-dom"
import { Card } from "../ui/card/Card"
import { newsData } from "../../data/news"
import "../../styles/news-related.css"

interface NewsRelatedProps {
  currentSlug: string
}

export const NewsRelated: React.FC<NewsRelatedProps> = ({ currentSlug }) => {
  // Filtrar la noticia actual y obtener 3 noticias relacionadas
  const relatedArticles = newsData.filter((news) => news.id !== currentSlug).slice(0, 3)

  const popularTags = [
    "Componentes",
    "Actualizaciones",
    "Rendimiento",
    "Accesibilidad",
    "API",
    "Documentación",
    "Eventos",
    "Tutoriales",
  ]

  return (
    <div className="news-related">
      <Card className="related-articles-card">
        <div className="related-card-header">
          <h3>Artículos relacionados</h3>
        </div>
        <ul className="related-articles-list">
          {relatedArticles.map((article) => (
            <li key={article.id} className="related-article-item">
              <Link to={`/noticias/${article.id}`} className="related-article-link">
                <h4 className="related-article-title">{article.title}</h4>
                <p className="related-article-date">{new Date(article.date).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="popular-tags-card">
        <div className="related-card-header">
          <h3>Categorías populares</h3>
        </div>
        <div className="popular-tags-container">
          {popularTags.map((tag) => (
            <Link key={tag} to={`/noticias?tag=${tag.toLowerCase()}`} className="popular-tag">
              {tag}
            </Link>
          ))}
        </div>
      </Card>

      <Card className="subscribe-card">
        <div className="related-card-header">
          <h3>Suscríbete a las noticias</h3>
        </div>
        <div className="subscribe-content">
          <p>Recibe las últimas actualizaciones y noticias directamente en tu correo electrónico.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="tu@email.com" className="subscribe-input" />
            <button type="submit" className="subscribe-button">
              Suscribirse
            </button>
          </form>
        </div>
      </Card>
    </div>
  )
}
