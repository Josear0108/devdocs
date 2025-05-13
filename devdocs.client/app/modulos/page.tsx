import { ModuleGrid } from "@/components/module-grid"
import { ModuleFilter } from "@/components/module-filter"
import { PageHeader } from "@/components/page-header"

export default function ModulosPage() {
  return (
    <div className="container px-4 md:px-6">
      <PageHeader
        title="Módulos"
        description="Explora nuestros módulos funcionales con documentación detallada e historial de versiones."
      />

      <ModuleFilter />

      <ModuleGrid />
    </div>
  )
}
