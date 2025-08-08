# DevDocs - Instrucciones de GitHub Copilot

## Descripción del Proyecto

DevDocs es una plataforma integral de documentación técnica construida con **React + TypeScript + Vite** en el frontend y **ASP.NET Core 8** en el backend. La aplicación sirve como centro de documentación para componentes, módulos, herramientas y noticias técnicas, con énfasis en la librería de componentes `edesk-components`.

## Arquitectura del Proyecto

### Frontend (devdocs.client)
- **Framework**: React 19.1.0 + TypeScript + Vite 6.3.5
- **Enrutamiento**: React Router DOM 7.6.0
- **Animaciones**: Framer Motion 12.11.0
- **Gestión de Estado**: Zustand 5.0.6
- **Iconos**: Lucide React, React Feather
- **Herramientas Especiales**: 
  - QR Code Styling para generación de códigos QR
  - React Syntax Highlighter para resaltado de código
- **Componentes UI**: Librería personalizada `edesk-components` v0.0.8

### Backend (DevDocs.Server)
- **Framework**: ASP.NET Core 8.0
- **API**: RESTful con Swagger/OpenAPI
- **Arquitectura**: SPA Proxy para integración con frontend
- **Documentación**: Swagger UI integrada

## Estructura de Carpetas

### Frontend (/devdocs.client/src/)
```
src/
├── components/
│   ├── layout/          # Componentes de layout principal
│   ├── news/           # Componentes relacionados con noticias
│   ├── sections/       # Secciones de páginas (PopularTools, FeaturedComponents)
│   └── ui/             # Sistema de componentes UI reutilizables
├── config/
│   └── menuConfig.ts   # Configuración de menús
├── context/
│   └── ThemeContext.tsx # Contexto de temas
├── data/               # Datos estáticos y configuraciones
│   ├── components.ts   # Definiciones de componentes de edesk-components
│   ├── modules.ts      # Datos de módulos
│   ├── news.ts         # Datos de noticias
│   ├── tools.ts        # Herramientas disponibles
│   └── plantilla-legacy.ts # Documentación de la plantilla legacy
├── hooks/              # Custom hooks
│   └── use-copy.ts     # Hook para funcionalidad de copiado
├── lib/                # Librerías y utilidades
├── pages/              # Páginas principales
│   ├── components/     # Páginas específicas de componentes (Page.tsx, DetailPage.tsx, PlaygroundControl.tsx)
│   └── plantilla-legacy/ # Documentación de plantilla legacy
├── styles/             # Archivos CSS organizados por funcionalidad
├── tools/              # Herramientas específicas (ej: qr-generator)
├── types/              # Definiciones de tipos TypeScript
└── Tools/              # Herramientas adicionales (con mayúscula)
```

### Hooks adicionales (/devdocs.client/hooks/)
```
hooks/
├── use-mobile.tsx      # Hook para detección de dispositivos móviles
└── use-toast.ts        # Hook para manejo de notificaciones toast
```

### Backend (/DevDocs.Server/)
```
DevDocs.Server/
├── Controllers/        # Controladores API
├── Properties/         # Configuraciones de aplicación
├── Program.cs         # Punto de entrada de la aplicación
├── appsettings.json   # Configuraciones
└── DevDocs.Server.csproj # Archivo de proyecto .NET
```

## Páginas Principales

1. **HomePage** (`/`): Página de inicio con secciones destacadas
2. **ComponentsPage** (`/componentes`): Catálogo de componentes de edesk-components
3. **ComponentDetailPage** (`/componentes/:slug`): Documentación detallada de cada componente
4. **ModulesPage** (`/modulos`): Catálogo de módulos del sistema
5. **ModuleDetailPage** (`/modulos/:slug`): Documentación detallada de módulos
6. **ToolsPage** (`/herramientas`): Herramientas disponibles
7. **QrGeneratorPage** (`/herramientas/generador-qr`): Generador de códigos QR
8. **NewsPage** (`/noticias`): Centro de noticias técnicas
9. **NewsDetailPage** (`/noticias/:slug`): Detalle de noticias
10. **PlantillaLegacy** (`/plantilla-legacy`): Documentación de plantilla legacy

### Estructura de Páginas de Componentes:
- **Page.tsx**: Lista principal de componentes con navegación
- **DetailPage.tsx**: Vista detallada de cada componente con documentación completa
- **PlaygroundControl.tsx**: Controles interactivos para testing de componentes

## Sistema de Componentes

### Librería edesk-components
El proyecto utiliza la librería `edesk-components` que incluye:

#### Componentes Principales:
1. **EdeskFileUpload**: Componente para carga de archivos con drag & drop
   - Tipos: 'Large', 'DragOff', 'Button'
   - Validación de archivos por tipo y tamaño
   - Soporte para selección múltiple
   - Variables CSS personalizables

2. **EdeskLayout**: Contenedor layout animado
   - Estados: abierto/cerrado
   - SVG de fondo personalizable
   - Variables CSS para theming

3. **EdeskViewerPDF**: Visor de PDFs completo y funcional
   - Renderizado de páginas PDF en canvas
   - Controles de zoom y navegación
   - Toolbar personalizable
   - Soporte para modo claro/oscuro
   - Variables CSS extensivas para personalización
   - Descarga de documentos

### Sistema de Documentación Interactiva

#### Estructura de Documentación (types/component.ts):
- **ComponentItem**: Definición completa de componente con tabs
- **Tab**: Pestañas de documentación (Playground, Instalación, API, etc.)
- **Section**: Secciones dentro de cada tab
- **Block**: Bloques de contenido (text, code, table, list, etc.)
- **Recipe**: Casos de uso predefinidos
- **PlaygroundControl**: Controles interactivos para testing
- **ArchNode**: Nodos de diagramas de arquitectura

#### Tipos de Bloques de Contenido:
- `TextBlock`: Párrafos de texto
- `CodeBlock`: Bloques de código con syntax highlighting
- `TableBlock`: Tablas con datos tabulares
- `ListBlock`: Listas con bullets
- `TabsBlock`: Tabs anidadas
- `LiveExampleBlock`: Ejemplos interactivos

## Herramientas Especiales

### Generador de Códigos QR
Ubicado en `/tools/qr-generator/`, implementa:
- **Arquitectura Hexagonal** con adaptadores
- **Zustand Store** para gestión de estado
- **Paneles de Configuración**:
  - DesignOptionsPanel: Personalización visual
  - FramesOptionsPanel: Marcos y bordes
- **Adaptadores**:
  - ClientQRCodeAdapter: Generación en cliente
  - ApiQRCodeAdapter: Generación por API (comentado)

## Patrones de Desarrollo

### Gestión de Estado
- **Zustand** para estado global (ej: QR Generator)
- **React State** para estado local de componentes
- **Context API** para temas

### Animaciones
- **Framer Motion** para animaciones fluidas
- Configuraciones predefinidas en `lib/animations.ts`
- Patrones: containerAnimation, itemAnimation para listas

### Enrutamiento
- **React Router DOM v7** con Routes anidadas
- Layout principal con Outlet para contenido dinámico
- AnimatePresence para transiciones entre páginas

### Estilos
- **CSS Modules** para componentes específicos
- **CSS Variables** para theming y personalización
- **Archivos CSS organizados** por funcionalidad en `/styles/`

## Configuración de Desarrollo

### Variables de Entorno
- **ASPNETCORE_HTTPS_PORT**: Puerto HTTPS del backend
- **ASPNETCORE_URLS**: URLs del backend

### SPA Proxy
- **ServerUrl**: https://localhost:50233
- **LaunchCommand**: npm run dev
- **MaxTimeoutInSeconds**: 120
- **WorkingDirectory**: ./devdocs.client

### GitHub Actions
- Workflow de deployment configurado en `.github/workflows/deploy-pages.yml`
- Deploy automático a GitHub Pages desde rama main
- Node.js 18 para build y deployment

### Certificados HTTPS
- Generación automática de certificados de desarrollo
- Configuración en `vite.config.ts`
- Puerto configurado: 50233

### Alias de Importación
```typescript
'@': './src'
'edesk-components': './node_modules/edesk-components/dist/index.es.js'
```

## Datos y Content Management

### Estructura de Datos:
- **componentsData**: Definiciones completas de componentes con documentación
- **modulesData**: Información de módulos del sistema
- **newsData**: Artículos y noticias técnicas
- **toolsData**: Herramientas disponibles

### Gestión de Contenido:
- Datos estáticos en archivos TypeScript
- Estructura tipada para consistencia
- Sistema de slugs para enrutamiento

## Estándares de Código

### TypeScript
- **Strict mode** habilitado
- Interfaces para todas las estructuras de datos
- Tipos importados desde archivos dedicados

### Componentes React
- **Functional Components** con hooks
- **Props interfaces** tipadas
- **Default exports** para componentes principales

### CSS
- **Variables CSS** para theming consistente
- **Media queries** para responsividad
- **Nombres de clases** descriptivos y consistentes

## Comandos de Desarrollo

### Frontend:
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linting con ESLint
npm run preview  # Preview del build
```

### Backend:
- Ejecución automática mediante SPA Proxy
- Swagger UI disponible en desarrollo

## Integraciones y Dependencias Clave

### Dependencias Principales:
- **React 19.1.0**: Framework base
- **TypeScript ~5.8.3**: Tipado estático
- **Vite 6.3.5**: Build tool y dev server
- **edesk-components ^0.0.8**: Librería de componentes principal
- **React Router DOM 7.6.0**: Enrutamiento
- **Framer Motion 12.11.0**: Animaciones
- **Zustand 5.0.6**: Gestión de estado

### Herramientas de Desarrollo:
- **ESLint**: Linting de código
- **TypeScript ESLint 8.30.1**: Reglas de linting específicas para TypeScript
- **React Syntax Highlighter**: Highlighting de código
- **QR Code Styling**: Generación de códigos QR
- **Lucide React**: Iconos modernos

## Notas Especiales para GitHub Copilot

1. **Componentes edesk-components**: Siempre importar desde 'edesk-components' y seguir las interfaces definidas en data/components.ts. Los tres componentes principales son EdeskFileUpload, EdeskLayout y EdeskViewerPDF

2. **Estructura de Documentación**: Usar el sistema de tabs/sections/blocks para nueva documentación

3. **Animaciones**: Utilizar los patrones establecidos de Framer Motion para consistencia

4. **Tipado**: Mantener tipado estricto y usar las interfaces existentes

5. **CSS Variables**: Aprovechar el sistema de variables CSS para theming personalizable, especialmente para los componentes de edesk-components

6. **Arquitectura de Herramientas**: Seguir el patrón hexagonal para nuevas herramientas

7. **Rutas**: Mantener la estructura de rutas existente y usar slugs descriptivos

8. **Responsive**: Considerar diseño móvil en todos los componentes nuevos usando el hook useIsMobile

9. **Hooks**: Utilizar los hooks personalizados existentes (use-copy, use-mobile, use-toast) para funcionalidades comunes

10. **Estructura de Páginas**: Para nuevas páginas de documentación, seguir el patrón de Page.tsx y DetailPage.tsx en la carpeta components/

11. **SPA Proxy**: El proyecto usa SPA Proxy de ASP.NET Core para integración frontend-backend

Este proyecto es una plataforma de documentación moderna con enfoque en componentes reutilizables, herramientas interactivas y experiencia de usuario fluida.
