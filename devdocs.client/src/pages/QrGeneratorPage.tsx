import { useQRCodeStore } from '../tools/qr-generator/store/useQRCodeStore';
import { QRForm } from '../tools/qr-generator/components/qr/QRForm';
import { QRCodeDisplay } from '../tools/qr-generator/components/qr/QRCodeDisplay';
import { Dropdown } from '../tools/qr-generator/components/common/Dropdown';
import { QRCustomizationMenu } from '../tools/qr-generator/components/qr/QRCustomizationMenu';
import { Edit, Settings, Download, ArrowLeft } from 'react-feather';
import '../styles/qr-generator.css';
import styles from "../tools/qr-generator/components/qr/QRCodeDisplay.module.css";

/* Agregar las animaciones de entrada y salida a los componentes de la página QR Generator */
import { motion } from "framer-motion"
import type { FileExtension } from 'qr-code-styling';
import { useState } from 'react';
// Animación para la entrada de la página
const pageAnimation = {
    hidden: { opacity: 0, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}
// Animación para los elementos hijos
const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

export const QrGeneratorPage = () => {
    // Obtenemos el estado y la acción del store
    const activeView = useQRCodeStore(state => state.activeView);
    const setActiveView = useQRCodeStore(state => state.setActiveView);
    const qrCodeAdapter = useQRCodeStore(state => state.qrCodeAdapter);
    const isGenerated = useQRCodeStore(state => state.isGenerated);
    const [downloadFormat, setDownloadFormat] = useState<FileExtension>('svg');
    const download = useQRCodeStore(state => state.download);

    type QRCodeAdapterConstructor = {
        supportedFormats?: FileExtension[];
    };


    const supportedFormats: FileExtension[] =
        (qrCodeAdapter && (qrCodeAdapter.constructor as QRCodeAdapterConstructor).supportedFormats)
            ? (qrCodeAdapter.constructor as QRCodeAdapterConstructor).supportedFormats!
            : ['svg', 'png', 'jpeg', 'webp'];

    const handleDownloadClick = () => {
        download(downloadFormat);
    };

    return (
        <motion.div className="qr-generator-page" initial="hidden" animate="visible" variants={pageAnimation}>

            <header className="qr-page-header">
                <h1>Generador QR</h1>
                <p>Crea códigos QR personalizados para contactos, URLs, texto y más con opciones de personalización avanzadas.</p>
            </header>

            {/* --- STEPPER (Siempre visible, con lógica de estado activo) --- */}
            <nav className="qr-stepper">
                <div
                    className={`step ${activeView === 'informacion' ? 'active' : ''}`}
                    onClick={() => setActiveView('informacion')}
                >
                    <div className="step-icon"><Edit size={20} /></div>
                    <span>Información</span>
                </div>
                <div
                    className={`step ${activeView === 'personalizacion' ? 'active' : ''} ${!isGenerated ? 'disabled' : ''}`}
                    onClick={() => isGenerated && setActiveView('personalizacion')}
                >
                    <div className="step-icon"><Settings size={20} /></div>
                    <span>Personalización</span>
                </div>
                <div
                    className={`step ${activeView === 'preview' ? 'active' : ''} ${!isGenerated ? 'disabled' : ''}`}
                >
                    <div className="step-icon"><Download size={20} /></div>
                    <span>Descarga</span>
                </div>
            </nav>

            {/* --- ÁREA DE CONTENIDO DINÁMICO --- */}
            <motion.div className="qr-content-area" variants={itemAnimation}>
                {activeView === 'preview' ? (
                    // --- VISTA DE PREVISUALIZACIÓN ---
                    <motion.div className="qr-preview-layout" variants={itemAnimation}>
                        <div className="qr-preview-header">
                            <h3>Previsualización final</h3>
                            <p>Su código QR está listo para descargar</p>
                        </div>

                        <QRCodeDisplay />

                        <div className="qr-preview-actions">
                            <button
                                className="action-button secondary-button"
                                onClick={() => setActiveView('personalizacion')}
                            >
                                <ArrowLeft size={16} />
                                Volver a personalizar
                            </button>
                        </div>
                        <div className={styles.downloadControls}>
                            <select
                                id="downloadFormatSelect"
                                className={styles.formatSelect}
                                value={downloadFormat}
                                onChange={(e) => setDownloadFormat(e.target.value as FileExtension)}
                                disabled={!isGenerated}
                            >
                                {supportedFormats.map((fmt) => (
                                    <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
                                ))}
                            </select>
                            <button
                                className={styles.downloadButton}
                                onClick={handleDownloadClick}
                                disabled={!isGenerated}
                            >
                                Descargar QR
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    // --- VISTA DE INFORMACIÓN Y PERSONALIZACIÓN (2 columnas) ---
                    <div className="qr-generator-layout">
                        <motion.div className="qr-layout-card" variants={itemAnimation}>
                            {activeView === 'informacion' ? (
                                <>
                                    <Dropdown />
                                    <QRForm />
                                </>
                            ) : (
                                <QRCustomizationMenu />
                            )}
                        </motion.div>
                        <motion.div className="qr-layout-card" variants={itemAnimation}>
                            <QRCodeDisplay />
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default QrGeneratorPage;