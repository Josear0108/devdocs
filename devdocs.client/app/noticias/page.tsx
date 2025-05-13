import { PageHeader } from "@/components/page-header"
import { NewsList } from "@/components/news-list"
import { NewsFilter } from "@/components/news-filter"

export default function NoticiasPage() {
  return (
    <div className="container px-4 md:px-6">
      <PageHeader
        title="Noticias y Actualizaciones"
        description="Mantente al día con las últimas noticias, actualizaciones y anuncios sobre nuestra plataforma y tecnologías."
      />

      <NewsFilter />

      <NewsList />
    </div>
  )
}
