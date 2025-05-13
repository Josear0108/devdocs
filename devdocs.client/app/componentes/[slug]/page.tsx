import { ComponentDoc } from "@/components/component-doc"
import { ComponentUsage } from "@/components/component-usage"
import { ComponentCode } from "@/components/component-code"
import { ComponentVersions } from "@/components/component-versions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"

export default function ComponentDetailPage({ params }: { params: { slug: string } }) {
  // En una implementación real, aquí cargarías los datos del componente basado en el slug
  const componentName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, " ")

  return (
    <div className="container px-4 md:px-6">
      <PageHeader title={componentName} description={`Documentación completa del componente ${componentName}`} />

      <Tabs defaultValue="documentacion" className="w-full mt-6">
        <TabsList className="w-full max-w-md mb-8">
          <TabsTrigger value="documentacion" className="flex-1">
            Documentación
          </TabsTrigger>
          <TabsTrigger value="uso" className="flex-1">
            Casos de Uso
          </TabsTrigger>
          <TabsTrigger value="codigo" className="flex-1">
            Código
          </TabsTrigger>
          <TabsTrigger value="versiones" className="flex-1">
            Versiones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentacion" className="space-y-4">
          <ComponentDoc slug={params.slug} />
        </TabsContent>

        <TabsContent value="uso" className="space-y-4">
          <ComponentUsage slug={params.slug} />
        </TabsContent>

        <TabsContent value="codigo" className="space-y-4">
          <ComponentCode slug={params.slug} />
        </TabsContent>

        <TabsContent value="versiones" className="space-y-4">
          <ComponentVersions slug={params.slug} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
