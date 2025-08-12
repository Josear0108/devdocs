"use client"

import type React from "react"
import { useParams } from "react-router-dom"
import { NewsArticle } from "../components/news/NewsArticle"
import { NewsNavigation } from "../components/news/NewsNavigation"
import { NewsRelated } from "../components/news/NewsRelated"
import { PageHeader } from "../components/ui/PageHeader"
import { Separator } from "../components/ui/Separator"
import { newsData } from "../data/news"
import "../styles/news/news-detail.css"

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  // Encontrar la noticia actual
  const currentNews = newsData.find((news) => news.id === slug)

  if (!currentNews) {
    return <div className="container">Noticia no encontrada</div>
  }

  return (
    <div className="container">
      <PageHeader
        title={currentNews.title}
        description={`Publicado el ${new Date(currentNews.date).toLocaleDateString()} • Por ${currentNews.author}`}
      />

      <div className="news-detail-layout">
        <div className="news-detail-main">
          <NewsArticle news={currentNews} />
          <Separator className="news-separator" />
          <NewsNavigation currentSlug={slug || ""} />
        </div>
        <div className="news-detail-sidebar">
          <NewsRelated currentSlug={slug || ""} />
        </div>
      </div>
    </div>
  )
}

export default NewsDetailPage
