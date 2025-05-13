"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FileCode, Menu, Newspaper } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNavContent />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <FileCode className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>DevDocs</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function MobileNavContent() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href="/" className="flex items-center gap-2 px-2 py-1 text-foreground hover:underline">
        Inicio
      </Link>
      <Link href="/noticias" className="flex items-center gap-2 px-2 py-1 text-foreground hover:underline">
        <Newspaper className="h-4 w-4" />
        Noticias
      </Link>
      <div className="px-2 py-1">
        <h3 className="mb-2 text-sm font-semibold">Documentación</h3>
        <div className="grid gap-1 pl-2">
          <Link href="/componentes" className="text-muted-foreground hover:text-foreground hover:underline">
            Componentes
          </Link>
          <Link href="/modulos" className="text-muted-foreground hover:text-foreground hover:underline">
            Módulos
          </Link>
          <Link href="/herramientas" className="text-muted-foreground hover:text-foreground hover:underline">
            Herramientas
          </Link>
        </div>
      </div>
      <div className="px-2 py-1">
        <h3 className="mb-2 text-sm font-semibold">Herramientas</h3>
        <div className="grid gap-1 pl-2">
          <Link
            href="/herramientas/generador-qr"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Generador QR
          </Link>
          <Link
            href="/herramientas/generador-plantillas"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Generador de Plantillas
          </Link>
        </div>
      </div>
    </div>
  )
}
