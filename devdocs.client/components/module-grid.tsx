"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, FileCode, LayoutGrid, Lock, Server, Zap } from "lucide-react"

// Datos de ejemplo para módulos
const modulesData = [
  {
    id: "auth",
    name: "Autenticación",
    description: "Sistema de autenticación y autorización con múltiples proveedores.",
    category: "Seguridad",
    version: "2.1.0",
    lastUpdate: "2024-01-15",
    icon: <Lock className="h-10 w-10 text-primary" />,
  },
  {
    id: "database",
    name: "Base de Datos",
    description: "Módulo de acceso y gestión de bases de datos relacionales y NoSQL.",
    category: "Datos",
    version: "1.8.0",
    lastUpdate: "2023-12-10",
    icon: <Database className="h-10 w-10 text-primary" />,
  },
  {
    id: "api",
    name: "API REST",
    description: "Creación y gestión de APIs RESTful con validación y documentación automática.",
    category: "Backend",
    version: "3.0.2",
    lastUpdate: "2024-02-05",
    icon: <Server className="h-10 w-10 text-primary" />,
  },
  {
    id: "ui",
    name: "UI Framework",
    description: "Framework de interfaz de usuario con componentes accesibles y personalizables.",
    category: "Frontend",
    version: "4.2.1",
    lastUpdate: "2024-01-28",
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
  },
  {
    id: "code-generator",
    name: "Generador de Código",
    description: "Herramienta para generar código boilerplate y estructuras de proyecto.",
    category: "Desarrollo",
    version: "1.5.0",
    lastUpdate: "2023-11-20",
    icon: <FileCode className="h-10 w-10 text-primary" />,
  },
  {
    id: "performance",
    name: "Optimización",
    description: "Módulo para monitoreo y optimización del rendimiento de aplicaciones.",
    category: "Infraestructura",
    version: "2.0.1",
    lastUpdate: "2024-02-15",
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
]

export function ModuleGrid() {
  const [modules] = useState(modulesData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {modules.map((module) => (
        <Link href={`/modulos/${module.id}`} key={module.id} className="group">
          <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{module.icon}</div>
                <Badge variant="outline">{module.category}</Badge>
              </div>
              <CardTitle className="mt-4">{module.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/50 pt-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">v{module.version}</span>
                <span className="mx-2">•</span>
                <span>Actualizado: {new Date(module.lastUpdate).toLocaleDateString()}</span>
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
