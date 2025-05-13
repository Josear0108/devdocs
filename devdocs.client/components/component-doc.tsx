"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { InfoIcon as InfoCircled, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ComponentDoc({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del componente basado en el slug

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Descripción</h2>
        <p>
          El componente Button proporciona una forma estandarizada de crear botones interactivos en la interfaz de
          usuario. Está diseñado para ser accesible, personalizable y compatible con diferentes estados y variantes.
        </p>

        <h2>Características</h2>
        <ul>
          <li>Múltiples variantes: default, outline, ghost, link</li>
          <li>Diferentes tamaños: sm, md, lg</li>
          <li>Estados: loading, disabled</li>
          <li>Soporte para iconos</li>
          <li>Totalmente accesible (WAI-ARIA)</li>
        </ul>

        <h2>Instalación</h2>
        <CodeBlock language="bash" code="npm install @acme/ui-components" />

        <h2>Importación</h2>
        <CodeBlock language="typescript" code="import { Button } from '@acme/ui-components';" />
      </div>

      <div className="grid gap-4">
        <Callout icon={<InfoCircled className="h-4 w-4" />}>
          <div className="font-medium">Nota</div>
          <div className="text-sm text-muted-foreground">
            Este componente utiliza Radix UI internamente para garantizar la accesibilidad y la consistencia en
            diferentes navegadores.
          </div>
        </Callout>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Advertencia</AlertTitle>
          <AlertDescription>
            A partir de la versión 1.2.0, la prop <code>variant="secondary"</code> ha sido deprecada. Use{" "}
            <code>variant="outline"</code> en su lugar.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Compatibilidad</AlertTitle>
          <AlertDescription>Este componente es compatible con React 18 y versiones posteriores.</AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
