import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function NewsNavigation() {
  return (
    <div className="flex justify-between">
      <Button variant="ghost" size="sm" className="gap-2" asChild>
        <Link href="/noticias/mejoras-rendimiento-plataforma">
          <ArrowLeft className="h-4 w-4" />
          <span>Artículo anterior</span>
        </Link>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2" asChild>
        <Link href="/noticias/documentacion-api-actualizada">
          <span>Artículo siguiente</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
