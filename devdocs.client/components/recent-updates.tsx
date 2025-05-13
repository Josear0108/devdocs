import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileCode, Newspaper, Zap } from "lucide-react"

export function RecentUpdates() {
  const updates = [
    {
      id: "nueva-version-componentes",
      title: "Nueva versión de la biblioteca de componentes",
      excerpt:
        "Lanzamos la versión 2.0 de nuestra biblioteca de componentes con mejoras significativas en rendimiento y accesibilidad.",
      date: "2025-05-10",
      category: "Lanzamiento",
      icon: <FileCode className="h-5 w-5 text-white" />,
      link: "/noticias/nueva-version-componentes",
      gradient: "gradient-purple",
    },
    {
      id: "mejoras-rendimiento-plataforma",
      title: "Mejoras de rendimiento en la plataforma",
      excerpt:
        "Hemos implementado optimizaciones que mejoran el tiempo de carga en un 40% y reducen el consumo de recursos.",
      date: "2025-05-05",
      category: "Actualización",
      icon: <Zap className="h-5 w-5 text-white" />,
      link: "/noticias/mejoras-rendimiento-plataforma",
      gradient: "gradient-blue",
    },
    {
      id: "documentacion-api-actualizada",
      title: "Documentación de API actualizada",
      excerpt:
        "La documentación de nuestra API REST ha sido completamente revisada y actualizada con nuevos ejemplos y guías.",
      date: "2025-04-28",
      category: "Documentación",
      icon: <Newspaper className="h-5 w-5 text-white" />,
      link: "/noticias/documentacion-api-actualizada",
      gradient: "gradient-teal",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actualizaciones recientes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {updates.map((update, index) => (
            <Link
              key={update.id}
              href={update.link}
              className="block p-4 hover:bg-muted/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${update.gradient}`}>
                  {update.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{update.title}</h3>
                    <Badge className={`${update.gradient} border-0 text-white`}>{update.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{update.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(update.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
