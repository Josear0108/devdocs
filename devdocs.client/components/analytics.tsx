"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // En una implementación real, aquí enviarías los datos de analytics
      console.log(`Página visitada: ${pathname}`)
    }
  }, [pathname, searchParams])

  return null
}
