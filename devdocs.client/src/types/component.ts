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

/** Define un control para el Playground */
export interface PlaygroundControl {
  prop: string; // Nombre de la prop que controla
  label: string;
  type: 'radio' | 'text' | 'boolean' | 'number';
  options?: string[]; // Para 'radio'
  defaultValue: string | number | boolean;
  // Condiciones para mostrar/ocultar el control
  showWhen?: {
    prop: string; // Nombre de la prop que debe cumplir la condición
    value: string | number | boolean; // Valor que debe tener
  };
  // Condiciones para habilitar/deshabilitar el control
  enableWhen?: {
    prop: string;
    value: string | number | boolean;
  };
}

/** Define una receta para un caso de uso */
export interface Recipe {
  id: string;
  icon: string; // Podríamos usar un componente o un string para el ícono
  title: string;
  description: string;
  code: string;
  props: Record<string, string | number | boolean>; // Valores de las props para esta receta
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
  component: React.ComponentType<any>,
  category: string
  description: string
  lastUpdate: string
  tabs: Tab[],
  // Nuevas propiedades
  playground?: {
    controls: PlaygroundControl[];
  };
  recipes?: Recipe[];
  architecture?: {
    nodes: ArchNode[];
    connections: { from: string, to: string }[];
  };
}