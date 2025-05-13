import type { ReactNode } from "react"

export interface ToolItem {
  version: ReactNode
  lastUpdate: string | number | Date
  icon: ReactNode
  id: string
  name: string
  description: string
  category: string
}
