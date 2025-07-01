import React, { useRef, useEffect, useState } from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import type { FileExtension } from '../../config/qrConfig';

export const QRCodeDisplay = () => {
    const isGenerated = useQRCodeStore(state => state.isGenerated);
    const download = useQRCodeStore(state => state.download);
    const qrCodeAdapter = useQRCodeStore(state => state.qrCodeAdapter);

    const [downloadFormat, setDownloadFormat] = useState<FileExtension>('svg');
    const qrCodeRef = useRef<HTMLDivElement>(null);

    // Define a type for the QR code adapter constructor with supportedFormats
    type QRCodeAdapterConstructor = {
        supportedFormats?: FileExtension[];
    };

    // Determina los formatos soportados dinámicamente
    const supportedFormats: FileExtension[] =
        (qrCodeAdapter && (qrCodeAdapter.constructor as QRCodeAdapterConstructor).supportedFormats)
            ? (qrCodeAdapter.constructor as QRCodeAdapterConstructor).supportedFormats!
            : ['svg', 'png', 'jpeg', 'webp'];

    useEffect(() => {
        if (qrCodeAdapter && qrCodeRef.current) {
            qrCodeAdapter.append(qrCodeRef.current);
        }
        return () => {
            if (qrCodeAdapter) {
                qrCodeAdapter.clear();
            }
        };
    }, [qrCodeAdapter]);

    const handleDownloadClick = () => {
        download(downloadFormat);
    };

    return (
        <section className="qr-display">
            <div className={`qr-display__container ${!isGenerated ? 'qr-display__container--placeholder-active' : ''}`}>
                <div
                    ref={qrCodeRef}
                    className={`qr-display__canvas${!isGenerated ? ' qr-display__canvas--hidden' : ''}`}
                ></div>
                {!isGenerated && (
                    <img
                        src="/src/assets/QR-Gris.svg"
                        alt="QR Placeholder"
                        className="qr-display__placeholder-img"
                    />
                )}
            </div>

            <div className="download-controls">
                <select
                    id="downloadFormatSelect"
                    className="dropdown download-format-select"
                    value={downloadFormat}
                    onChange={(e) => setDownloadFormat(e.target.value as FileExtension)}
                    disabled={!isGenerated}
                >
                    {supportedFormats.map((fmt) => (
                        <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
                    ))}
                </select>
                <button
                    className="button button--primary qr-display__button"
                    onClick={handleDownloadClick}
                    disabled={!isGenerated}
                >
                    Descargar QR
                </button>
            </div>
        </section>
    );
};