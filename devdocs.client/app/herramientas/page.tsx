import { ToolGrid } from "@/components/tool-grid"
import { ToolFilter } from "@/components/tool-filter"
import { PageHeader } from "@/components/page-header"

export default function HerramientasPage() {
  return (
    <div className="container px-4 md:px-6">
      <PageHeader
        title="Herramientas"
        description="Utiliza nuestras herramientas para optimizar tu flujo de trabajo y aumentar tu productividad."
      />

      <ToolFilter />

      <ToolGrid />
    </div>
  )
}
