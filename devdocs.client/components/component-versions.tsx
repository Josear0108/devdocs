"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"

export function ComponentVersions({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del componente basado en el slug

  const versions = [
    {
      version: "1.2.0",
      date: "2023-12-15",
      changes: [
        { type: "feature", description: "Añadido nuevo tamaño 'xl' para botones grandes" },
        { type: "improvement", description: "Mejorada la accesibilidad con soporte para ARIA" },
        { type: "fix", description: "Corregido problema de alineación en botones con iconos" },
      ],
      breaking: false,
    },
    {
      version: "1.1.0",
      date: "2023-10-20",
      changes: [
        { type: "feature", description: "Añadida variante 'destructive'" },
        { type: "improvement", description: "Optimizado el rendimiento en renderizados múltiples" },
      ],
      breaking: false,
    },
    {
      version: "1.0.5",
      date: "2023-09-05",
      changes: [
        { type: "fix", description: "Corregido problema de estilo en modo oscuro" },
        { type: "fix", description: "Solucionado error de tipado en TypeScript" },
      ],
      breaking: false,
    },
    {
      version: "1.0.0",
      date: "2023-08-01",
      changes: [
        { type: "feature", description: "Lanzamiento inicial del componente Button" },
        { type: "feature", description: "Soporte para variantes: default, outline, ghost, link" },
        { type: "feature", description: "Soporte para tamaños: sm, md, lg, icon" },
      ],
      breaking: true,
    },
  ]

  const migrationCode = `// Antes (v0.9.0)
import { Button } from '@acme/ui-components';

<Button type="secondary">Botón Secundario</Button>

// Después (v1.0.0)
import { Button } from '@acme/ui-components';

<Button variant="secondary">Botón Secundario</Button>`

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Historial de Versiones</h2>
        <p>
          A continuación se muestra el historial de versiones del componente, incluyendo nuevas características, mejoras
          y correcciones.
        </p>
      </div>

      <Tabs defaultValue="historial">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="migracion">Guía de Migración</TabsTrigger>
        </TabsList>

        <TabsContent value="historial" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Versión</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cambios</TableHead>
                <TableHead className="text-right">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => (
                <TableRow key={version.version}>
                  <TableCell className="font-medium">v{version.version}</TableCell>
                  <TableCell>{new Date(version.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {version.changes.map((change, index) => (
                        <li key={index}>
                          {change.description}
                          {change.type === "feature" && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500"
                            >
                              Nueva Característica
                            </Badge>
                          )}
                          {change.type === "improvement" && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-500"
                            >
                              Mejora
                            </Badge>
                          )}
                          {change.type === "fix" && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 hover:text-amber-500"
                            >
                              Corrección
                            </Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right">
                    {version.breaking ? (
                      <Badge variant="destructive">Breaking Change</Badge>
                    ) : (
                      <Badge variant="outline">Compatible</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="migracion" className="mt-4 space-y-4">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3>Migración de v0.9.0 a v1.0.0</h3>
            <p>
              La versión 1.0.0 introdujo cambios importantes en la API del componente Button. A continuación se detallan
              los cambios necesarios para migrar desde versiones anteriores.
            </p>

            <h4>Cambios en la API</h4>
            <ul>
              <li>
                La prop <code>type</code> ha sido renombrada a <code>variant</code> para evitar confusión con el
                atributo HTML <code>type</code>.
              </li>
              <li>
                Se ha añadido soporte para el prop <code>asChild</code> que permite usar el componente con Radix UI
                Slot.
              </li>
              <li>Los estilos internos ahora utilizan CSS Variables para facilitar la personalización.</li>
            </ul>
          </div>

          <CodeBlock language="tsx" code={migrationCode} showLineNumbers />
        </TabsContent>
      </Tabs>
    </div>
  )
}
