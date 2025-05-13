"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { QrCode, Download, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GeneradorQRPage() {
  const [qrValue, setQrValue] = useState("https://ejemplo.com")
  const [qrSize, setQrSize] = useState(200)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#FFFFFF")
  const [qrFormat, setQrFormat] = useState("png")

  // En una implementación real, aquí generarías el QR con una biblioteca como qrcode.react
  const qrCodeUrl = `/placeholder.svg?height=${qrSize}&width=${qrSize}`

  return (
    <div className="container px-4 md:px-6">
      <PageHeader
        title="Generador de Códigos QR"
        description="Crea códigos QR personalizados para enlaces, texto o información de contacto."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <label htmlFor="qr-value" className="text-sm font-medium">
                  Contenido del QR
                </label>
                <Input
                  id="qr-value"
                  value={qrValue}
                  onChange={(e) => setQrValue(e.target.value)}
                  placeholder="Ingresa URL, texto o información"
                />
              </div>

              <Tabs defaultValue="basico" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="basico">Básico</TabsTrigger>
                  <TabsTrigger value="avanzado">Avanzado</TabsTrigger>
                </TabsList>

                <TabsContent value="basico" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tamaño</label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[qrSize]}
                        min={100}
                        max={500}
                        step={10}
                        onValueChange={(value) => setQrSize(value[0])}
                        className="flex-1"
                      />
                      <span className="text-sm w-12 text-right">{qrSize}px</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="avanzado" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Color</label>
                      <div className="flex">
                        <Input
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                          className="w-full h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fondo</label>
                      <div className="flex">
                        <Input
                          type="color"
                          value={qrBgColor}
                          onChange={(e) => setQrBgColor(e.target.value)}
                          className="w-full h-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Formato</label>
                    <Select value={qrFormat} onValueChange={setQrFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
                <Button variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-center">
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg flex items-center justify-center"
            style={{ width: `${qrSize + 32}px`, height: `${qrSize + 32}px`, backgroundColor: qrBgColor }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <QrCode size={qrSize * 1.5} />
            </div>
            <img
              src={qrCodeUrl || "/placeholder.svg"}
              alt="Código QR generado"
              width={qrSize}
              height={qrSize}
              className="relative z-10"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Vista previa del código QR</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs truncate">{qrValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
