import type { ReactNode } from "react"

export interface ModuleItem {
  icon: ReactNode
  slug: unknown
  id: string
  name: string
  description: string
  category: string
  version: string
  lastUpdate: string
}
