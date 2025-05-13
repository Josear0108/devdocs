"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react"

export function ModuleVersionHistory({ slug }: { slug: string }) {
  // En una implementación real, cargarías los datos del módulo basado en el slug

  const [selectedVersion, setSelectedVersion] = useState("2.1.0")

  const versions = [
    {
      version: "2.1.0",
      date: "2024-01-15",
      changes: [
        { type: "feature", description: "Añadido soporte para autenticación con WebAuthn" },
        { type: "improvement", description: "Mejorado el rendimiento del proceso de login" },
        { type: "fix", description: "Corregido problema con tokens de refresco" },
      ],
      breaking: false,
    },
    {
      version: "2.0.0",
      date: "2023-11-10",
      changes: [
        { type: "feature", description: "Rediseño completo de la API de autenticación" },
        { type: "feature", description: "Añadido soporte para OAuth 2.0 y OpenID Connect" },
        { type: "improvement", description: "Mejorada la seguridad con rotación automática de claves" },
      ],
      breaking: true,
    },
    {
      version: "1.5.2",
      date: "2023-09-05",
      changes: [
        { type: "fix", description: "Corregido problema de seguridad en la validación de tokens" },
        { type: "fix", description: "Solucionado error en la gestión de sesiones" },
      ],
      breaking: false,
    },
    {
      version: "1.5.0",
      date: "2023-08-01",
      changes: [
        { type: "feature", description: "Añadido soporte para autenticación multifactor" },
        { type: "improvement", description: "Mejorada la interfaz de usuario para el proceso de login" },
      ],
      breaking: false,
    },
  ]

  const migrationCode = `// Antes (v1.x)
import { Auth } from '@acme/auth-module';

const auth = new Auth({
  providers: ['local', 'google'],
});

// Después (v2.x)
import { createAuth } from '@acme/auth-module';

const auth = createAuth({
  providers: {
    local: { enabled: true },
    google: { enabled: true, clientId: 'xxx', clientSecret: 'xxx' },
  },
});`

  return (
    <div className="space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2>Historial de Versiones</h2>
        <p>
          A continuación se muestra el historial de versiones del módulo, incluyendo nuevas características, mejoras y
          correcciones.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {versions.map((version) => (
          <Button
            key={version.version}
            variant={selectedVersion === version.version ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedVersion(version.version)}
            className="relative"
          >
            v{version.version}
            {version.breaking && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
              </span>
            )}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="cambios">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="cambios">Cambios</TabsTrigger>
          <TabsTrigger value="migracion">Guía de Migración</TabsTrigger>
          <TabsTrigger value="compatibilidad">Compatibilidad</TabsTrigger>
        </TabsList>

        <TabsContent value="cambios" className="mt-4">
          {versions
            .filter((v) => v.version === selectedVersion)
            .map((version) => (
              <Card key={version.version}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Versión {version.version}</CardTitle>
                    <Badge variant={version.breaking ? "destructive" : "outline"}>
                      {version.breaking ? "Breaking Change" : "Compatible"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Publicado el {new Date(version.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-4">Cambios en esta versión</h3>
                  <ul className="space-y-3">
                    {version.changes.map((change, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div
                          className={`mt-0.5 rounded-full p-1 ${
                            change.type === "feature"
                              ? "bg-green-500/20 text-green-500"
                              : change.type === "improvement"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-amber-500/20 text-amber-500"
                          }`}
                        >
                          {change.type === "feature" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : change.type === "improvement" ? (
                            <ArrowRight className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p>{change.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {change.type === "feature"
                              ? "Nueva característica"
                              : change.type === "improvement"
                                ? "Mejora"
                                : "Corrección"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="migracion" className="mt-4 space-y-4">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3>Migración de v1.x a v2.x</h3>
            <p>
              La versión 2.0.0 introdujo cambios importantes en la API del módulo de autenticación. A continuación se
              detallan los cambios necesarios para migrar desde versiones anteriores.
            </p>

            <h4>Cambios en la API</h4>
            <ul>
              <li>
                El constructor <code>new Auth()</code> ha sido reemplazado por la función <code>createAuth()</code>.
              </li>
              <li>
                La configuración de proveedores ahora utiliza un objeto con opciones detalladas en lugar de un array.
              </li>
              <li>Se requieren credenciales explícitas para proveedores OAuth.</li>
            </ul>
          </div>

          <CodeBlock language="tsx" code={migrationCode} showLineNumbers />
        </TabsContent>

        <TabsContent value="compatibilidad" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Versión</TableHead>
                <TableHead>Node.js</TableHead>
                <TableHead>React</TableHead>
                <TableHead>Next.js</TableHead>
                <TableHead>Base de Datos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">v2.1.0</TableCell>
                <TableCell>≥ 16.x</TableCell>
                <TableCell>≥ 17.x</TableCell>
                <TableCell>≥ 12.x</TableCell>
                <TableCell>MongoDB ≥ 4.4, PostgreSQL ≥ 12</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">v2.0.0</TableCell>
                <TableCell>≥ 16.x</TableCell>
                <TableCell>≥ 17.x</TableCell>
                <TableCell>≥ 12.x</TableCell>
                <TableCell>MongoDB ≥ 4.4, PostgreSQL ≥ 12</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">v1.5.x</TableCell>
                <TableCell>≥ 14.x</TableCell>
                <TableCell>≥ 16.x</TableCell>
                <TableCell>≥ 11.x</TableCell>
                <TableCell>MongoDB ≥ 4.0, PostgreSQL ≥ 11</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">v1.0.x</TableCell>
                <TableCell>≥ 12.x</TableCell>
                <TableCell>≥ 16.x</TableCell>
                <TableCell>≥ 10.x</TableCell>
                <TableCell>MongoDB ≥ 4.0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}
