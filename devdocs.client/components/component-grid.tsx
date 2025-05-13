"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, LayoutGrid, Menu, MessageSquare, User } from "lucide-react"

// Datos de ejemplo para componentes
const componentsData = [
  {
    id: "button",
    name: "Botón",
    description: "Componente de botón interactivo con múltiples variantes y estados.",
    category: "Básico",
    version: "1.2.0",
    lastUpdate: "2023-12-15",
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
  },
  {
    id: "card",
    name: "Tarjeta",
    description: "Contenedor versátil para mostrar contenido relacionado y acciones.",
    category: "Layout",
    version: "1.1.0",
    lastUpdate: "2023-11-20",
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
  },
  {
    id: "dropdown",
    name: "Menú Desplegable",
    description: "Menú contextual que se muestra al hacer clic en un elemento desencadenante.",
    category: "Navegación",
    version: "1.0.5",
    lastUpdate: "2023-10-05",
    icon: <Menu className="h-10 w-10 text-primary" />,
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Representación visual de un usuario o entidad.",
    category: "Datos",
    version: "1.0.2",
    lastUpdate: "2023-09-18",
    icon: <User className="h-10 w-10 text-primary" />,
  },
  {
    id: "calendar",
    name: "Calendario",
    description: "Componente para seleccionar fechas y visualizar eventos.",
    category: "Datos",
    version: "1.3.0",
    lastUpdate: "2024-01-10",
    icon: <Calendar className="h-10 w-10 text-primary" />,
  },
  {
    id: "chat",
    name: "Chat",
    description: "Interfaz para conversaciones y mensajería en tiempo real.",
    category: "Comunicación",
    version: "1.1.1",
    lastUpdate: "2023-12-28",
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
  },
]

export function ComponentGrid() {
  const [components] = useState(componentsData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {components.map((component) => (
        <Link href={`/componentes/${component.id}`} key={component.id} className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
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
                <span className="mx-2">•</span>
                <span>Actualizado: {new Date(component.lastUpdate).toLocaleDateString()}</span>
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
