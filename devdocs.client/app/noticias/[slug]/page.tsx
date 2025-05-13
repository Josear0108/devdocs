import { NewsArticle } from "@/components/news-article"
import { NewsNavigation } from "@/components/news-navigation"
import { NewsRelated } from "@/components/news-related"
import { PageHeader } from "@/components/page-header"
import { Separator } from "@/components/ui/separator"

export default function NoticiaDetailPage({ params }: { params: { slug: string } }) {
  // En una implementación real, aquí cargarías los datos de la noticia basado en el slug
  const newsTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container px-4 md:px-6">
      <PageHeader title={newsTitle} description="Publicado el 12 de mayo de 2025 • Por Equipo de Desarrollo" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <NewsArticle slug={params.slug} />
          <Separator className="my-8" />
          <NewsNavigation />
        </div>
        <div className="space-y-8">
          <NewsRelated />
        </div>
      </div>
    </div>
  )
}
