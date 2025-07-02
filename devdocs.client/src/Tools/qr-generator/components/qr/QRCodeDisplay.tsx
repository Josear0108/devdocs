import React, { useRef, useEffect, useState } from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import type { FileExtension } from '../../config/qrConfig';
import styles from './QRCodeDisplay.module.css';

export const QRCodeDisplay = () => {
    // --- Lógica existente (SIN CAMBIOS) ---
    const isGenerated = useQRCodeStore(state => state.isGenerated);
    const download = useQRCodeStore(state => state.download);
    const qrCodeAdapter = useQRCodeStore(state => state.qrCodeAdapter);
    const [downloadFormat, setDownloadFormat] = useState<FileExtension>('svg');
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const supportedFormats: FileExtension[] = qrCodeAdapter?.supportedFormats ?? ['svg', 'png', 'jpeg', 'webp'];

    useEffect(() => {
        const node = qrCodeRef.current;
        if (isGenerated && qrCodeAdapter && node) {
            // Limpiamos antes de añadir el nuevo QR para evitar duplicados
            node.innerHTML = '';
            qrCodeAdapter.append(node);
        }
    }, [qrCodeAdapter, isGenerated]);

    const handleDownloadClick = () => {
        download(downloadFormat);
    };
    // --- Fin de la lógica ---

    return (
        <div className={styles.displayWrapper}>
            {/* Contenedor del QR y placeholder */}
            <div className={`${styles.qrContainer} ${isGenerated ? styles.qrContainerActive : ''}`}>
                {/* Solo mostramos el div del QR si está generado */}
                {isGenerated && (
                    <div ref={qrCodeRef} className={styles.qrCanvas} />
                )}

                {/* Mostramos el placeholder si NO está generado */}
                {!isGenerated && (
                    <>
                        <img
                            src="/src/assets/QR-Gris.svg"
                            alt="QR Placeholder"
                            className={styles.placeholderImage}
                        />
                        <p className={styles.placeholderText}>
                            Complete la información para generar el QR básico
                        </p>
                    </>
                )}
            </div>

            {/* Controles de descarga (usando la lógica y componentes que ya tenías) */}
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
        </div>
    );
};