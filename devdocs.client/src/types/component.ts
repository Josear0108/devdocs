// src/types/component.ts

/** Un bloque cualquiera de contenido */
export type Block =
  | TextBlock
  | ListBlock
  | CodeBlock
  | TabsBlock
  | TableBlock
  | LiveExampleBlock;

/** Bloque de ejemplo interactivo */
export interface LiveExampleBlock {
  type: "live-example";
}
/** Bloque de párrafo simple */
export interface TextBlock {
  type: "text"
  content: string
}

/** Bloque de lista */
export interface ListBlock {
  type: "list"
  items: string[]
}

/** Bloque de código */
export interface CodeBlock {
  type: "code"
  language: string       // "tsx", "bash", …
  code: string           // el código
}

/** Bloque de tabs internas */
export interface TabsBlock {
  type: "tabs"
  tabs: {
    id: string
    label: string
    blocks: Block[]      // cada sub‐pestaña también despliega blocks
  }[]
}

/** Bloque de tabla */
export interface Badge {
  label: string
  color: string
}

/** Un cambio dentro de la tabla */
export interface ChangeItem {
  text: string
  badge: Badge
}

/** Una celda de tabla puede ser texto, un badge suelto, o un array de cambios */
export type TableCell = string | Badge | ChangeItem[]

/** Bloque de tabla */
export interface TableBlock {
  type: "table"
  columns: string[]
  rows: TableCell[][]
}

/** Una sección con título y un array de blocks */
export interface Section {
  title: string
  blocks: Block[]
}

/** Una pestaña superior */
export interface Tab {
  id: string
  label: string
  sections: Section[]
}

// --- Nuevos Tipos para la Documentación Interactiva ---

/** Tipos de valores permitidos para controles */
export type ControlValue = string | number | boolean | string[];

/** Define un control para el Playground */
export interface PlaygroundControl {
  prop: string; // Nombre de la prop que controla
  label: string;
  type: 'radio' | 'text' | 'boolean' | 'switch' | 'number' | 'select' | 'select-check' | 'textarea' | 'color' | 'range';
  options?: string[] | number[]; // Para 'radio' y 'select'
  defaultValue: ControlValue | null;
  min?: number; // Para 'number' y 'range'
  max?: number; // Para 'number' y 'range'
  step?: number; // Para 'number' y 'range'
  group?: string; // Para agrupar controles
  description?: string; // Descripción del control
  required?: boolean; // Si es requerido
  // Condiciones para mostrar/ocultar el control
  showWhen?: {
    prop: string; // Nombre de la prop que debe cumplir la condición
    value: ControlValue; // Valor que debe tener
  } | Array<{
    prop: string;
    value: ControlValue;
  }>;
  // Condiciones para habilitar/deshabilitar el control
  enableWhen?: {
    prop: string;
    value: ControlValue;
  } | Array<{
    prop: string;
    value: ControlValue;
  }>;
}

/** Define un control para variables CSS */
export interface CSSControl {
  variable: string; // Nombre de la variable CSS (ej: '--edeskFileUpload-accent')
  label: string;
  type: 'color' | 'text' | 'range' | 'select';
  defaultValue: string;
  description?: string;
  min?: number; // Para 'range'
  max?: number; // Para 'range'
  step?: number; // Para 'range'
  unit?: string; // Para 'range' (px, rem, %, etc.)
  options?: string[]; // Para 'select'
  group?: string; // Para agrupar variables CSS
  // Condiciones para mostrar/ocultar el control CSS
  showWhen?: {
    prop: string; // Nombre de la prop que debe cumplir la condición
    value: ControlValue; // Valor que debe tener
  } | Array<{
    prop: string;
    value: ControlValue;
  }>;
}

/** Define un grupo de controles para el Playground */
export interface PlaygroundGroup {
  id: string;
  label: string;
  description?: string;
  controls: PlaygroundControl[];
}

/** Define un grupo de controles CSS */
export interface CSSGroup {
  id: string;
  label: string;
  description?: string;
  controls: CSSControl[];
}

/** Configuración de enum para conversión automática */
export interface EnumConfig {
  prop: string; // Nombre de la prop
  enumObject: Record<string, unknown>; // El objeto enum
  conversionMap?: Record<string, string>; // Mapeo personalizado de string a valor enum
}

/** Configurador específico para formateo de props en código generado */
export interface PropFormatter {
  prop: string;
  formatter: (value: unknown, allProps: Record<string, unknown>) => string;
}

/** Configurador específico para procesamiento de props */
export interface PropProcessor {
  prop: string;
  processor: (value: unknown, allProps: Record<string, unknown>) => unknown;
}

/** Configurador específico para CSS variables dependientes */
export interface CSSVariableDependency {
  sourceVariables: string[]; // Variables que activan el cálculo
  calculator: (variables: Record<string, string>) => Record<string, string>; // Función que calcula las variables dependientes
}

/** Configuración específica por componente */
export interface ComponentSpecificConfig {
  componentName: string;
  propFormatters?: PropFormatter[]; // Formateadores específicos para props
  propProcessors?: PropProcessor[]; // Procesadores específicos para props
  cssVariableDependencies?: CSSVariableDependency[]; // Dependencias de CSS variables
  childrenProcessor?: (children: unknown, componentName: string) => React.ReactNode; // Procesador de children
  renderStrategy?: 'standard' | 'children-as-prop' | 'custom'; // Estrategia de renderizado
  customRenderer?: (Component: React.ComponentType<Record<string, unknown>>, props: Record<string, unknown>, key: string) => React.ReactNode; // Renderizador customizado
}

/** Configuración completa del Playground */
export interface PlaygroundConfig {
  component: React.ComponentType<Record<string, unknown>>;
  componentName?: string; // Nombre del componente para el código generado
  groups?: PlaygroundGroup[]; // Si no se especifica, se agrupará automáticamente
  mockData?: Record<string, unknown>; // Datos mock para props técnicas
  excludeProps?: string[]; // Props a excluir del playground
  customControls?: Record<string, Partial<PlaygroundControl>>; // Configuraciones personalizadas
  cssControls?: CSSGroup[]; // Grupos de variables CSS (nueva propiedad)
  customCSSControls?: Record<string, Partial<CSSControl>>; // Configuraciones CSS personalizadas
  enumConfigs?: EnumConfig[]; // Configuración de enums para conversión automática
  componentSpecificConfig?: ComponentSpecificConfig; // Configuración específica por componente
}

/** Define una receta para un caso de uso */
export interface Recipe {
  id: string;
  icon: string; // Podríamos usar un componente o un string para el ícono
  title: string;
  description: string;
  code: string;
  props: Record<string, string | number | boolean | string[]>; // Valores de las props para esta receta
}

/** Define un nodo para el diagrama de arquitectura */
export interface ArchNode {
  id: string;
  label: string;
  type: 'Caso de Uso' | 'UI' | 'Lógica central';
  description: string;
}

/** Tu componente ahora con pestañas y secciones de blocks */
export interface ComponentItem {
  id: string
  name: string,
  component?: React.ComponentType<Record<string, unknown>>,
  category: string
  description: string
  lastUpdate: string
  type?: 'component' | 'guide' // Nueva propiedad para determinar orientación
  tabs: Tab[],
  // Nuevas propiedades
  playground?: {
    controls: PlaygroundControl[];
  };
  playgroundConfig?: Omit<PlaygroundConfig, 'component'>; // Nueva configuración transversal sin component
  recipes?: Recipe[];
  architecture?: {
    nodes: ArchNode[];
    connections: { from: string, to: string }[];
  };
}