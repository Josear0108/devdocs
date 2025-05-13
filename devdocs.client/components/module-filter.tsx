"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function ModuleFilter() {
  const [category, setCategory] = useState("all")

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar módulos..." className="pl-9" />
      </div>
      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="seguridad">Seguridad</SelectItem>
            <SelectItem value="datos">Datos</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="desarrollo">Desarrollo</SelectItem>
            <SelectItem value="infraestructura">Infraestructura</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filtrar</Button>
      </div>
    </div>
  )
}
