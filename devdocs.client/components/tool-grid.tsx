"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCode, QrCode, Palette, Terminal, FileJson, Wand2 } from "lucide-react"

// Datos de ejemplo para herramientas
const toolsData = [
  {
    id: "generador-qr",
    name: "Generador de Códigos QR",
    description: "Crea códigos QR personalizados para enlaces, texto o información de contacto.",
    category: "Utilidad",
    icon: <QrCode className="h-10 w-10 text-primary" />,
  },
  {
    id: "generador-plantillas",
    name: "Generador de Plantillas",
    description: "Crea plantillas de código para diferentes frameworks y lenguajes.",
    category: "Desarrollo",
    icon: <FileCode className="h-10 w-10 text-primary" />,
  },
  {
    id: "generador-colores",
    name: "Generador de Paletas",
    description: "Crea paletas de colores accesibles y armoniosas para tus proyectos.",
    category: "Diseño",
    icon: <Palette className="h-10 w-10 text-primary" />,
  },
  {
    id: "terminal-interactiva",
    name: "Terminal Interactiva",
    description: "Ejecuta comandos y scripts en un entorno seguro y controlado.",
    category: "Desarrollo",
    icon: <Terminal className="h-10 w-10 text-primary" />,
  },
  {
    id: "formateador-json",
    name: "Formateador JSON",
    description: "Formatea, valida y visualiza datos JSON de forma interactiva.",
    category: "Utilidad",
    icon: <FileJson className="h-10 w-10 text-primary" />,
  },
  {
    id: "generador-ui",
    name: "Generador de UI",
    description: "Crea interfaces de usuario con componentes predefinidos y personalizables.",
    category: "Diseño",
    icon: <Wand2 className="h-10 w-10 text-primary" />,
  },
]

export function ToolGrid() {
  const [tools] = useState(toolsData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {tools.map((tool) => (
        <Link href={`/herramientas/${tool.id}`} key={tool.id} className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{tool.icon}</div>
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
