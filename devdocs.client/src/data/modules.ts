import type { ModuleItem } from "../types/module"

export const modulesData: ModuleItem[] = [
  {
    id: "auth",
    name: "Autenticación",
    description: "Sistema de autenticación y autorización con múltiples proveedores.",
    category: "Seguridad",
    version: "2.1.0",
    lastUpdate: "2024-01-15",
    icon: "lock",
    slug: "auth"
  },
  {
    id: "database",
    name: "Base de Datos",
    description: "Módulo de acceso y gestión de bases de datos relacionales y NoSQL.",
    category: "Datos",
    version: "1.8.0",
    lastUpdate: "2023-12-10",
    icon: "database",
    slug: "database"
  },
  {
    id: "api",
    name: "API REST",
    description: "Creación y gestión de APIs RESTful con validación y documentación automática.",
    category: "Backend",
    version: "3.0.2",
    lastUpdate: "2024-02-05",
    icon: "api",
    slug: "api"
  },
  {
    id: "ui",
    name: "UI Framework",
    description: "Framework de interfaz de usuario con componentes accesibles y personalizables.",
    category: "Frontend",
    version: "4.2.1",
    lastUpdate: "2024-01-28",
    icon: "ui",
    slug: "ui"
  },
  {
    id: "code-generator",
    name: "Generador de Código",
    description: "Herramienta para generar código boilerplate y estructuras de proyecto.",
    category: "Desarrollo",
    version: "1.5.0",
    lastUpdate: "2023-11-20",
    icon: "code",
    slug: "code-generator"
  },
  {
    id: "performance",
    name: "Optimización",
    description: "Módulo para monitoreo y optimización del rendimiento de aplicaciones.",
    category: "Infraestructura",
    version: "2.0.1",
    lastUpdate: "2024-02-15",
    icon: "performance",
    slug: "performance"
  },
]
