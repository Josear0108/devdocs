"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { InfoIcon as InfoCircled, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ModuleDoc({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del módulo basado en el slug

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Descripción</h2>
        <p>
          El módulo de Autenticación proporciona un sistema completo para gestionar la autenticación y autorización de
          usuarios en aplicaciones web y móviles. Soporta múltiples proveedores y métodos de autenticación.
        </p>

        <h2>Características</h2>
        <ul>
          <li>Autenticación con email/contraseña</li>
          <li>Integración con proveedores OAuth (Google, GitHub, etc.)</li>
          <li>Autenticación multifactor (MFA)</li>
          <li>Gestión de sesiones y tokens</li>
          <li>Control de acceso basado en roles (RBAC)</li>
        </ul>

        <h2>Instalación</h2>
        <CodeBlock language="bash" code="npm install @acme/auth-module" />

        <h2>Importación</h2>
        <CodeBlock language="typescript" code="import { createAuth } from '@acme/auth-module';" />
      </div>

      <div className="grid gap-4">
        <Callout icon={<InfoCircled className="h-4 w-4" />}>
          <div className="font-medium">Nota</div>
          <div className="text-sm text-muted-foreground">
            Este módulo requiere Node.js 16 o superior y es compatible con React 17+ y Next.js 12+.
          </div>
        </Callout>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Advertencia</AlertTitle>
          <AlertDescription>
            A partir de la versión 2.0.0, la API ha cambiado significativamente. Consulta la guía de migración para
            actualizar desde versiones anteriores.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Seguridad</AlertTitle>
          <AlertDescription>
            Este módulo implementa las mejores prácticas de seguridad y es auditado regularmente.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
