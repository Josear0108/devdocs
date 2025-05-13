import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Share2, ThumbsUp, MessageSquare, Bookmark } from "lucide-react"

export function NewsArticle({ slug }: { slug: string }) {
  // En una implementación real, aquí cargarías los datos de la noticia basado en el slug

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <div className="not-prose mb-8">
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <img
            src="/placeholder.svg?height=300&width=800"
            alt="Imagen de portada"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline">Lanzamiento</Badge>
          <Badge variant="outline">Componentes</Badge>
          <Badge variant="outline">UI</Badge>
        </div>
      </div>

      <h1>Nueva versión de la biblioteca de componentes</h1>

      <div className="flex items-center gap-2 text-muted-foreground not-prose">
        <Calendar className="h-4 w-4" />
        <span>12 de mayo de 2025</span>
      </div>

      <p className="lead">
        Nos complace anunciar el lanzamiento de la versión 2.0 de nuestra biblioteca de componentes, con mejoras
        significativas en rendimiento, accesibilidad y experiencia de desarrollo.
      </p>

      <h2>Mejoras principales</h2>

      <p>
        La nueva versión 2.0 de nuestra biblioteca de componentes trae consigo una serie de mejoras importantes que
        beneficiarán tanto a desarrolladores como a usuarios finales. Hemos trabajado arduamente para optimizar el
        rendimiento, mejorar la accesibilidad y simplificar la experiencia de desarrollo.
      </p>

      <h3>Rendimiento optimizado</h3>

      <p>
        Hemos reescrito completamente el núcleo de la biblioteca para reducir el tamaño del bundle y mejorar los tiempos
        de carga. Los componentes ahora se cargan hasta un 40% más rápido y consumen menos recursos del navegador.
      </p>

      <ul>
        <li>Reducción del tamaño del bundle en un 35%</li>
        <li>Mejora en los tiempos de renderizado inicial</li>
        <li>Optimización de las animaciones y transiciones</li>
        <li>Implementación de técnicas de code-splitting avanzadas</li>
      </ul>

      <h3>Accesibilidad mejorada</h3>

      <p>
        La accesibilidad ha sido una prioridad en esta versión. Todos los componentes ahora cumplen con los estándares
        WCAG 2.1 nivel AA, y hemos implementado mejoras significativas en la navegación por teclado y la compatibilidad
        con lectores de pantalla.
      </p>

      <blockquote>
        <p>
          "La nueva versión de la biblioteca de componentes ha mejorado significativamente nuestra capacidad para crear
          interfaces accesibles. El soporte para ARIA y la navegación por teclado son excepcionales."
        </p>
        <cite>— María Rodríguez, Desarrolladora Frontend</cite>
      </blockquote>

      <h3>Experiencia de desarrollo simplificada</h3>

      <p>
        Hemos rediseñado la API de la biblioteca para hacerla más intuitiva y fácil de usar. La documentación ha sido
        completamente actualizada con nuevos ejemplos, guías y patrones de uso.
      </p>

      <h2>Próximos pasos</h2>

      <p>
        En las próximas semanas, estaremos publicando una serie de tutoriales y webinars para ayudar a los
        desarrolladores a migrar a la nueva versión y aprovechar al máximo las nuevas características.
      </p>

      <p>
        Agradecemos a toda la comunidad por su continuo apoyo y feedback, que ha sido fundamental para el desarrollo de
        esta versión. Estamos emocionados de ver lo que construirán con estas nuevas herramientas.
      </p>

      <div className="not-prose mt-8 flex flex-wrap gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span>Me gusta</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>Comentar</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          <span>Compartir</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Bookmark className="h-4 w-4" />
          <span>Guardar</span>
        </Button>
      </div>
    </article>
  )
}
