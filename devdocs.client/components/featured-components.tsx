import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, LayoutGrid, Menu, User } from "lucide-react"

export function FeaturedComponents() {
  const featuredComponents = [
    {
      id: "button",
      name: "Botón",
      description: "Componente de botón interactivo con múltiples variantes y estados.",
      category: "Básico",
      version: "1.2.0",
      icon: <LayoutGrid className="h-10 w-10 text-white" />,
      gradient: "gradient-purple",
    },
    {
      id: "dropdown",
      name: "Menú Desplegable",
      description: "Menú contextual que se muestra al hacer clic en un elemento desencadenante.",
      category: "Navegación",
      version: "1.0.5",
      icon: <Menu className="h-10 w-10 text-white" />,
      gradient: "gradient-blue",
    },
    {
      id: "avatar",
      name: "Avatar",
      description: "Representación visual de un usuario o entidad.",
      category: "Datos",
      version: "1.0.2",
      icon: <User className="h-10 w-10 text-white" />,
      gradient: "gradient-teal",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredComponents.map((component) => (
        <Link href={`/componentes/${component.id}`} key={component.id} className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${component.gradient}`}>
                  {component.icon}
                </div>
                <Badge variant="outline">{component.category}</Badge>
              </div>
              <CardTitle className="mt-4">{component.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{component.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/50 pt-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">v{component.version}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Ver <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
