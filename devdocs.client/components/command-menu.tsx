"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { LayoutGrid, Layers, Search, PenToolIcon as Tool, Newspaper } from "lucide-react"
import React from "react"

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <Button
        variant="outline"
        className="fixed right-4 top-4 h-8 w-8 rounded-full md:right-8 md:top-8"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Buscar</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar documentación..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Navegación">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <span>Inicio</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/noticias"))}>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Noticias</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/componentes"))}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              <span>Componentes</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/modulos"))}>
              <Layers className="mr-2 h-4 w-4" />
              <span>Módulos</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/herramientas"))}>
              <Tool className="mr-2 h-4 w-4" />
              <span>Herramientas</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Herramientas">
            <CommandItem onSelect={() => runCommand(() => router.push("/herramientas/generador-qr"))}>
              <span>Generador de Códigos QR</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/herramientas/generador-plantillas"))}>
              <span>Generador de Plantillas</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Noticias">
            <CommandItem onSelect={() => runCommand(() => router.push("/noticias/nueva-version-componentes"))}>
              <span>Nueva versión de componentes</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/noticias/mejoras-rendimiento-plataforma"))}>
              <span>Mejoras de rendimiento</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
