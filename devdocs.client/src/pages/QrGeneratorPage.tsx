"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/PageHeader"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Separator } from "../components/ui/Separator"
import "../styles/qr-generator.css"

const QrGeneratorPage = () => {
  const [url, setUrl] = useState("")
  const [size, setSize] = useState("200")
  const [qrCode, setQrCode] = useState("")

  const generateQR = () => {
    if (!url) return

    // Aquí iría la lógica para generar el código QR
    // Por ahora, solo mostraremos un placeholder
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`)
  }

  return (
    <motion.div
      className="qr-generator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Generador de Códigos QR"
        description="Crea códigos QR personalizados para tus URLs"
      />

      <div className="qr-generator-content">
        <Card className="qr-generator-card">
          <div className="qr-generator-form">
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <Input
                id="url"
                type="url"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Tamaño</label>
              <Select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="100">100x100</option>
                <option value="200">200x200</option>
                <option value="300">300x300</option>
                <option value="400">400x400</option>
              </Select>
            </div>

            <Button onClick={generateQR} className="generate-button">
              Generar QR
            </Button>
          </div>

          <Separator />

          <div className="qr-result">
            {qrCode ? (
              <div className="qr-code-container">
                <img src={qrCode} alt="Código QR generado" className="qr-code" />
                <Button
                  onClick={() => window.open(qrCode, "_blank")}
                  className="download-button"
                >
                  Descargar QR
                </Button>
              </div>
            ) : (
              <div className="qr-placeholder">
                <p>Ingresa una URL y haz clic en "Generar QR"</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default QrGeneratorPage 