import { ComponentGrid } from "@/components/component-grid"
import { ComponentFilter } from "@/components/component-filter"
import { PageHeader } from "@/components/page-header"

export default function ComponentesPage() {
  return (
    <div className="container px-4 md:px-6">
      <PageHeader
        title="Componentes"
        description="Explora nuestra biblioteca de componentes con documentación detallada, ejemplos de uso y código implementable."
      />

      <ComponentFilter />

      <ComponentGrid />
    </div>
  )
}
