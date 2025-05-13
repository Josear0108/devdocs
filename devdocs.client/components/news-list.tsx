"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileCode, Newspaper, Zap } from "lucide-react"

// Datos de ejemplo para noticias
const newsData = [
  {
    id: "nueva-version-componentes",
    title: "Nueva versión de la biblioteca de componentes",
    excerpt:
      "Lanzamos la versión 2.0 de nuestra biblioteca de componentes con mejoras significativas en rendimiento y accesibilidad.",
    date: "2025-05-10",
    category: "Lanzamiento",
    author: "Equipo de UI",
    image: "/placeholder.svg?height=200&width=400",
    icon: <FileCode className="h-10 w-10 text-primary" />,
    gradient: "gradient-purple",
  },
  {
    id: "mejoras-rendimiento-plataforma",
    title: "Mejoras de rendimiento en la plataforma",
    excerpt:
      "Hemos implementado optimizaciones que mejoran el tiempo de carga en un 40% y reducen el consumo de recursos.",
    date: "2025-05-05",
    category: "Actualización",
    author: "Equipo de Infraestructura",
    image: "/placeholder.svg?height=200&width=400",
    icon: <Zap className="h-10 w-10 text-primary" />,
    gradient: "gradient-blue",
  },
  {
    id: "documentacion-api-actualizada",
    title: "Documentación de API actualizada",
    excerpt:
      "La documentación de nuestra API REST ha sido completamente revisada y actualizada con nuevos ejemplos y guías.",
    date: "2025-04-28",
    category: "Documentación",
    author: "Equipo de Documentación",
    image: "/placeholder.svg?height=200&width=400",
    icon: <Newspaper className="h-10 w-10 text-primary" />,
    gradient: "gradient-teal",
  },
  {
    id: "evento-tech-talk-mayo",
    title: "Tech Talk: El futuro de la documentación técnica",
    excerpt:
      "Únete a nuestro próximo Tech Talk donde discutiremos las tendencias y el futuro de la documentación técnica.",
    date: "2025-04-20",
    category: "Evento",
    author: "Equipo de Eventos",
    image: "/placeholder.svg?height=200&width=400",
    icon: <Calendar className="h-10 w-10 text-primary" />,
    gradient: "gradient-purple",
  },
  {
    id: "integracion-herramientas-ia",
    title: "Nuevas integraciones con herramientas de IA",
    excerpt:
      "Hemos añadido integraciones con las principales herramientas de IA para mejorar la generación de documentación.",
    date: "2025-04-15",
    category: "Característica",
    author: "Equipo de Producto",
    image: "/placeholder.svg?height=200&width=400",
    icon: <Zap className="h-10 w-10 text-primary" />,
    gradient: "gradient-blue",
  },
  {
    id: "encuesta-satisfaccion-usuarios",
    title: "Resultados de la encuesta de satisfacción",
    excerpt:
      "Compartimos los resultados de nuestra encuesta anual de satisfacción y los próximos pasos basados en su feedback.",
    date: "2025-04-10",
    category: "Comunidad",
    author: "Equipo de Experiencia",
    image: "/placeholder.svg?height=200&width=400",
    icon: <Newspaper className="h-10 w-10 text-primary" />,
    gradient: "gradient-teal",
  },
]

export function NewsList() {
  const [news] = useState(newsData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {news.map((item, index) => (
        <Link href={`/noticias/${item.id}`} key={item.id} className="group">
          <Card
            className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Badge variant="outline" className={`absolute top-4 right-4 ${item.gradient} text-white border-0`}>
                {item.category}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/50 pt-4">
              <div className="text-xs text-muted-foreground">
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{item.author}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Leer <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
