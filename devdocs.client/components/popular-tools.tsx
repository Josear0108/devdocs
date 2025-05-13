import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCode, QrCode, Palette } from "lucide-react"

export function PopularTools() {
  const popularTools = [
    {
      id: "generador-qr",
      name: "Generador de Códigos QR",
      description: "Crea códigos QR personalizados para enlaces, texto o información de contacto.",
      category: "Utilidad",
      icon: <QrCode className="h-10 w-10 text-white" />,
      gradient: "gradient-purple",
    },
    {
      id: "generador-plantillas",
      name: "Generador de Plantillas",
      description: "Crea plantillas de código para diferentes frameworks y lenguajes.",
      category: "Desarrollo",
      icon: <FileCode className="h-10 w-10 text-white" />,
      gradient: "gradient-blue",
    },
    {
      id: "generador-colores",
      name: "Generador de Paletas",
      description: "Crea paletas de colores accesibles y armoniosas para tus proyectos.",
      category: "Diseño",
      icon: <Palette className="h-10 w-10 text-white" />,
      gradient: "gradient-teal",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {popularTools.map((tool) => (
        <Link href={`/herramientas/${tool.id}`} key={tool.id} className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.gradient}`}>
                  {tool.icon}
                </div>
                <Badge variant="outline">{tool.category}</Badge>
              </div>
              <CardTitle className="mt-4">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border/50 pt-4">
              <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Usar Herramienta <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
