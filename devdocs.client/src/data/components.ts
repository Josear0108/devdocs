
import type { ComponentItem } from "../types/component"

export const componentsData: ComponentItem[] = [
  //card componente carga de archivos
  {
    id: "button",
    name: "Cargue de archivos",
    category: "Básico",
    description: "Componente React ligero y personalizable para subir archivos con validación, drag & drop y feedback visual, ideal para flujos documentales empresariales.",
    lastUpdate: "2023-12-15",
    tabs: [
      // Inicio de pestaña Documentación
      {
        id: "documentation",
        label: "Documentación",
        sections: [
          {
            title: "Descripción",
            blocks: [
              {
                type: "text",
                content:
                  "FileUploadContainer es un componente React reutilizable para la carga de archivos, con soporte para validación, drag & drop, feedback visual y personalización. Está diseñado para integrarse fácilmente en flujos de carga documental en aplicaciones empresariales."
              }
            ]
          },
          {
            title: "Instalación y dependencias",
            blocks: [
              {
                type: "list",
                items: [
                  "React 17+ o 18+",
                  "Material UI Icons",
                  "El hook useFileUpload y los estilos CSS del proyecto"
                ]
              }
            ]
          },
          {
            title: "Instalación",
            blocks: [
              {
                type: "code",
                language: "bash",
                code: "npm install edesk-components@0.0.0"
              }
            ]
          }
        ]
      },
// Inicio de pestaña Casos de Uso
      {
        id: "useCases",
        label: "Casos de Uso",
        sections: [
          {
            title: "Ejemplos comunes",
            blocks: [
              {
                type: "text",
                content:
                  "El componente Cargue de Archivos se puede utilizar en múltiples contextos."
              }
            ]
          }
        ]
      },
//Inicio de pestaña Código
      {
        id: "code",
        label: "Código",
        sections: [
          {
            title: "Código Fuente",
            blocks: [
              {
                type: "tabs",
                tabs: [
                  // Sub-Pestaña de Código del Componente
                  {
                    id: "component",
                    label: "Componente",
                    blocks: [
                      {
                        type: "code",
                        language: "tsx",
                        code: `import * as React from "react"
export const Button = ({ children }) => (
  <button className="btn">{children}</button>
)`
                      }
                    ]
                  },
                  // Sub-Pestaña de Código de Uso 
                  {
                    id: "usage",
                    label: "Uso",
                    blocks: [
                      {
                        type: "code",
                        language: "tsx",
                        code: `<Button>Botón Primario</Button>
<Button variant="outline">Botón Outline</Button>
<Button variant="ghost">Botón Ghost</Button>
<Button variant="link">Botón Link</Button>`
                      }
                    ]
                  },
                  //Sub-Pestaña de Código de Pruebas 
                  {
                    id: "tests",
                    label: "Pruebas",
                    blocks: [
                      {
                        type: "code",
                        language: "ts",
                        code: `import { render } from "@testing-library/react"
it("renderiza el botón", () => {
  const { getByText } = render(<Button>Click</Button>)
  expect(getByText("Click")).toBeTruthy()
})`
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
// Inicio de pestaña Versiones
      {
        id: "versions",
        label: "Versiones",
        sections: [
          {
            title: "Historial de Versiones",
            blocks: [
              {
                type: "tabs",
                tabs: [
                  // Sub-Pestaña de Historial
                  {
                    id: "historial",
                    label: "Historial",
                    blocks: [
                      {
                        type: "table",
                        columns: ["Versión", "Fecha", "Cambios", "Tipo"],
                        rows: [
                          [
                            "v1.2.0",
                            "14/12/2023",
                            [
                              { text: "Añadido tamaño `xl` …", badge: { label: "Nueva Característica", color: "#28a745" } },
                              { text: "Mejora ARIA", badge: { label: "Mejora", color: "#007bff" } },
                              { text: "Corrección iconos", badge: { label: "Corrección", color: "#fd7e14" } }
                            ],            // 👉 es ChangeItem[], ahora aceptado
                            { label: "Compatible", color: "#28a745" }  // 👉 es Badge
                          ],
                          // …
                        ]
                      }
                    ]
                  },
                  // Sub-Pestaña de Migración
                  {
                    id: "migration",
                    label: "Guía de Migración",
                    blocks: [
                      {
                        type: "list",
                        items: [
                          "Renombrar `variant='danger'` a `variant='destructive'`",
                          "Reemplazar `size='icon'` por `<IconButton />`"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  // — aquí tus demás componentes —
]
