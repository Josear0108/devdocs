import { ModuleDoc } from "@/components/module-doc"
import { ModuleImplementation } from "@/components/module-implementation"
import { ModuleVersionHistory } from "@/components/module-version-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"

export default function ModuleDetailPage({ params }: { params: { slug: string } }) {
  // En una implementación real, aquí cargarías los datos del módulo basado en el slug
  const moduleName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, " ")

  return (
    <div className="container px-4 md:px-6">
      <PageHeader title={moduleName} description={`Documentación completa del módulo ${moduleName}`} />

      <Tabs defaultValue="documentacion" className="w-full mt-6">
        <TabsList className="w-full max-w-md mb-8">
          <TabsTrigger value="documentacion" className="flex-1">
            Documentación
          </TabsTrigger>
          <TabsTrigger value="implementacion" className="flex-1">
            Implementación
          </TabsTrigger>
          <TabsTrigger value="versiones" className="flex-1">
            Historial de Versiones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentacion" className="space-y-4">
          <ModuleDoc slug={params.slug} />
        </TabsContent>

        <TabsContent value="implementacion" className="space-y-4">
          <ModuleImplementation slug={params.slug} />
        </TabsContent>

        <TabsContent value="versiones" className="space-y-4">
          <ModuleVersionHistory slug={params.slug} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
