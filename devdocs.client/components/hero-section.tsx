import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCode, LayoutGrid, Layers, PenToolIcon as Tool } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-white/10 bg-[size:var(--grid-size)_var(--grid-size)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-white/[0.05]"
        style={{ "--grid-size": "30px" } as React.CSSProperties}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] bg-primary/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
          <span className="text-primary font-medium">Documentación Técnica</span>
          <span className="mx-1 text-muted-foreground">•</span>
          <span className="text-muted-foreground">v1.0 Beta</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            <span className="gradient-text">Documenta. Implementa. Crea.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Una plataforma minimalista para documentar módulos, implementar componentes y utilizar herramientas de
            desarrollo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in animate-delay-200">
          <Button size="lg" className="gap-2 gradient-purple">
            Explorar Documentación
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            Ver Componentes
            <FileCode className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 animate-fade-in animate-delay-300">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-purple">
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <span className="mt-2 text-sm font-medium">Componentes</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-blue">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="mt-2 text-sm font-medium">Módulos</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-teal">
              <Tool className="h-6 w-6 text-white" />
            </div>
            <span className="mt-2 text-sm font-medium">Herramientas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
