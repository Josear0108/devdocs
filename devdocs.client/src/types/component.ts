// types/component.ts

/** Un bloque cualquiera de contenido */
export type Block =
  | TextBlock
  | ListBlock
  | CodeBlock
  | TabsBlock
  | TableBlock

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

/** Tu componente ahora con pestañas y secciones de blocks */
export interface ComponentItem {
  id: string
  name: string
  category: string
  description: string
  lastUpdate: string
  tabs: Tab[]
}
