import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroSection } from "@/components/hero-section"
import { FeaturedComponents } from "@/components/featured-components"
import { RecentUpdates } from "@/components/recent-updates"
import { PopularTools } from "@/components/popular-tools"
import { Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container px-4 md:px-6">
      <HeroSection />

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Explorar Plataforma</h2>
          <div className="relative w-full max-w-sm lg:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar en la documentación..."
              className="w-full bg-background py-2 pl-8 pr-4 text-sm ring-1 ring-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Tabs defaultValue="destacados" className="w-full">
          <TabsList className="w-full max-w-md mb-8">
            <TabsTrigger value="destacados" className="flex-1">
              Destacados
            </TabsTrigger>
            <TabsTrigger value="recientes" className="flex-1">
              Actualizaciones
            </TabsTrigger>
            <TabsTrigger value="herramientas" className="flex-1">
              Herramientas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="destacados" className="space-y-4">
            <FeaturedComponents />
          </TabsContent>

          <TabsContent value="recientes" className="space-y-4">
            <RecentUpdates />
          </TabsContent>

          <TabsContent value="herramientas" className="space-y-4">
            <PopularTools />
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle>Componentes</CardTitle>
            <CardDescription>Biblioteca de componentes reutilizables con documentación detallada</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explora nuestra colección de componentes UI con ejemplos, código y guías de implementación.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full gradient-purple">
              Ver Componentes
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle>Módulos</CardTitle>
            <CardDescription>Módulos funcionales con historial de versiones y actualizaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Accede a la documentación de módulos con historial de cambios, correcciones y nuevas características.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full gradient-blue">
              Ver Módulos
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-teal-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle>Herramientas</CardTitle>
            <CardDescription>Utilidades y generadores para optimizar tu flujo de trabajo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Utiliza nuestras herramientas como generadores de QR, plantillas y más para agilizar tu desarrollo.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full gradient-teal">
              Ver Herramientas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
