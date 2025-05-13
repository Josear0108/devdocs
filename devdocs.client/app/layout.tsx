import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Analytics } from "@/components/analytics"
import { CommandMenu } from "@/components/command-menu"
import { MobileNav } from "@/components/mobile-nav"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DevDocs - Plataforma de Documentación",
  description: "Documentación técnica, componentes, módulos y herramientas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <div className="relative flex min-h-screen flex-col">
              <MobileNav />
              <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
                <AppSidebar />
                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                  <div className="mx-auto w-full min-w-0">
                    <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
                  </div>
                </main>
              </div>
            </div>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <CommandMenu />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
