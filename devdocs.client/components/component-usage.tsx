"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { Loader2 } from "lucide-react"

export function ComponentUsage({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del componente basado en el slug

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Casos de Uso</h2>
        <p>
          El componente Button se puede utilizar en una variedad de contextos, desde formularios hasta interfaces de
          navegación. A continuación se muestran algunos ejemplos comunes de uso.
        </p>
      </div>

      <Tabs defaultValue="basico">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="basico">Básico</TabsTrigger>
          <TabsTrigger value="variantes">Variantes</TabsTrigger>
          <TabsTrigger value="estados">Estados</TabsTrigger>
          <TabsTrigger value="iconos">Con Iconos</TabsTrigger>
        </TabsList>

        <TabsContent value="basico" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 flex flex-wrap gap-4">
              <Button>Botón Primario</Button>
              <Button variant="outline">Botón Outline</Button>
              <Button variant="ghost">Botón Ghost</Button>
              <Button variant="link">Botón Link</Button>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`<Button>Botón Primario</Button>
<Button variant="outline">Botón Outline</Button>
<Button variant="ghost">Botón Ghost</Button>
<Button variant="link">Botón Link</Button>`}
          />
        </TabsContent>

        <TabsContent value="variantes" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
          />
        </TabsContent>

        <TabsContent value="estados" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 flex flex-wrap gap-4">
              <Button disabled>Deshabilitado</Button>
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando
              </Button>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`<Button disabled>Deshabilitado</Button>
<Button>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Cargando
</Button>`}
          />
        </TabsContent>

        <TabsContent value="iconos" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 flex flex-wrap gap-4">
              <Button>
                <Loader2 className="mr-2 h-4 w-4" />
                Icono Izquierda
              </Button>
              <Button>
                Icono Derecha
                <Loader2 className="ml-2 h-4 w-4" />
              </Button>
              <Button size="icon">
                <Loader2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <CodeBlock
            language="tsx"
            code={`<Button>
  <Loader2 className="mr-2 h-4 w-4" />
  Icono Izquierda
</Button>
<Button>
  Icono Derecha
  <Loader2 className="ml-2 h-4 w-4" />
</Button>
<Button size="icon">
  <Loader2 className="h-4 w-4" />
</Button>`}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
