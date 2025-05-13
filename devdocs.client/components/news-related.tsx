import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsRelated() {
  const relatedArticles = [
    {
      id: "documentacion-api-actualizada",
      title: "Documentación de API actualizada",
      date: "2025-04-28",
    },
    {
      id: "integracion-herramientas-ia",
      title: "Nuevas integraciones con herramientas de IA",
      date: "2025-04-15",
    },
    {
      id: "mejoras-rendimiento-plataforma",
      title: "Mejoras de rendimiento en la plataforma",
      date: "2025-05-05",
    },
  ]

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
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Artículos relacionados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {relatedArticles.map((article) => (
              <li key={article.id}>
                <Link href={`/noticias/${article.id}`} className="block px-6 py-3 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(article.date).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categorías populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/noticias?tag=${tag.toLowerCase()}`}
                className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suscríbete a las noticias</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Recibe las últimas actualizaciones y noticias directamente en tu correo electrónico.
          </p>
          <form className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full"
            >
              Suscribirse
            </button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
