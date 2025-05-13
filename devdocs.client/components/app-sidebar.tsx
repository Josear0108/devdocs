"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LayoutGrid,
  Layers,
  PenToolIcon as Tool,
  Search,
  Home,
  Package,
  QrCode,
  FileCode,
  Settings,
  HelpCircle,
  Github,
  Newspaper,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-purple">
              <FileCode className="h-4 w-4 text-white" />
            </div>
            <span>DevDocs</span>
          </Link>
        </div>
        <div className="px-2 relative">
          <Search className="absolute left-4 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-8 h-9" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname?.startsWith("/noticias")}>
              <Link href="/noticias">
                <Newspaper className="h-4 w-4" />
                <span>Noticias</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Documentación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/componentes")}>
                  <Link href="/componentes">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Componentes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/modulos")}>
                  <Link href="/modulos">
                    <Layers className="h-4 w-4" />
                    <span>Módulos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname?.startsWith("/herramientas")}>
                  <Link href="/herramientas">
                    <Tool className="h-4 w-4" />
                    <span>Herramientas</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/herramientas/generador-qr"}>
                      <Link href="/herramientas/generador-qr">
                        <QrCode className="h-3 w-3 mr-2" />
                        Generador QR
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/herramientas/generador-plantillas">
                        <Package className="h-3 w-3 mr-2" />
                        Generador de Plantillas
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Ayuda</span>
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configuración</span>
          </Button>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
