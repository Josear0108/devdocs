import type React from "react"
import { Calendar, Share2, ThumbsUp, MessageSquare, Bookmark } from "react-feather"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import type { NewsItem } from "../../types/news"
import "../../styles/news-article.css"

interface NewsArticleProps {
  news: NewsItem
}

export const NewsArticle: React.FC<NewsArticleProps> = ({ news }) => {
  return (
    <article className="news-article">
      <div className="news-article-header">
        <div className="news-article-image-container">
          <img
            src={news.image || `https://via.placeholder.com/800x300?text=${news.title}`}
            alt="Imagen de portada"
            className="news-article-image"
          />
        </div>
        <div className="news-article-tags">
          <Badge className="news-article-tag gradient-purple">{news.category}</Badge>
          <Badge className="news-article-tag">Componentes</Badge>
          <Badge className="news-article-tag">UI</Badge>
        </div>
      </div>

      <div className="news-article-meta">
        <Calendar size={16} />
        <span>{new Date(news.date).toLocaleDateString()}</span>
      </div>

      <div className="news-article-content">
        <p className="news-article-lead">
          Nos complace anunciar el lanzamiento de la versión 2.0 de nuestra biblioteca de componentes, con mejoras
          significativas en rendimiento, accesibilidad y experiencia de desarrollo.
        </p>

        <h2>Mejoras principales</h2>

        <p>
          La nueva versión 2.0 de nuestra biblioteca de componentes trae consigo una serie de mejoras importantes que
          beneficiarán tanto a desarrolladores como a usuarios finales. Hemos trabajado arduamente para optimizar el
          rendimiento, mejorar la accesibilidad y simplificar la experiencia de desarrollo.
        </p>

        <h3>Rendimiento optimizado</h3>

        <p>
          Hemos reescrito completamente el núcleo de la biblioteca para reducir el tamaño del bundle y mejorar los
          tiempos de carga. Los componentes ahora se cargan hasta un 40% más rápido y consumen menos recursos del
          navegador.
        </p>

        <ul>
          <li>Reducción del tamaño del bundle en un 35%</li>
          <li>Mejora en los tiempos de renderizado inicial</li>
          <li>Optimización de las animaciones y transiciones</li>
          <li>Implementación de técnicas de code-splitting avanzadas</li>
        </ul>

        <h3>Accesibilidad mejorada</h3>

        <p>
          La accesibilidad ha sido una prioridad en esta versión. Todos los componentes ahora cumplen con los estándares
          WCAG 2.1 nivel AA, y hemos implementado mejoras significativas en la navegación por teclado y la
          compatibilidad con lectores de pantalla.
        </p>

        <blockquote>
          <p>
            "La nueva versión de la biblioteca de componentes ha mejorado significativamente nuestra capacidad para
            crear interfaces accesibles. El soporte para ARIA y la navegación por teclado son excepcionales."
          </p>
          <cite>— María Rodríguez, Desarrolladora Frontend</cite>
        </blockquote>

        <h3>Experiencia de desarrollo simplificada</h3>

        <p>
          Hemos rediseñado la API de la biblioteca para hacerla más intuitiva y fácil de usar. La documentación ha sido
          completamente actualizada con nuevos ejemplos, guías y patrones de uso.
        </p>

        <h2>Próximos pasos</h2>

        <p>
          En las próximas semanas, estaremos publicando una serie de tutoriales y webinars para ayudar a los
          desarrolladores a migrar a la nueva versión y aprovechar al máximo las nuevas características.
        </p>

        <p>
          Agradecemos a toda la comunidad por su continuo apoyo y feedback, que ha sido fundamental para el desarrollo
          de esta versión. Estamos emocionados de ver lo que construirán con estas nuevas herramientas.
        </p>
      </div>

      <div className="news-article-actions">
        <Button className="news-article-action">
          <ThumbsUp size={16} />
          <span>Me gusta</span>
        </Button>
        <Button className="news-article-action">
          <MessageSquare size={16} />
          <span>Comentar</span>
        </Button>
        <Button className="news-article-action">
          <Share2 size={16} />
          <span>Compartir</span>
        </Button>
        <Button className="news-article-action">
          <Bookmark size={16} />
          <span>Guardar</span>
        </Button>
      </div>
    </article>
  )
}
