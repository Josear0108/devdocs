import { useRef, useEffect } from 'react';
import { RotateCcw } from 'react-feather';
import styles from './QRCodeDisplay.module.css';
import { useQRCodeStore } from '../../store/useQRCodeStore';

export const QRCodeDisplay = () => {
    // Solo muestra el QR generado o el placeholder
    const isGenerated = useQRCodeStore(state => state.isGenerated);
    const qrCodeAdapter = useQRCodeStore(state => state.qrCodeAdapter);
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const resetStyleOptions = useQRCodeStore(state => state.resetStyleOptions);
    const activeView = useQRCodeStore(state => state.activeView);
    const qrCodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = qrCodeRef.current;
        if (isGenerated && qrCodeAdapter && node) {
            node.innerHTML = '';
            qrCodeAdapter.append(node);
        }
    }, [qrCodeAdapter, isGenerated]);

    useEffect(() => {
        if (qrCodeAdapter && isGenerated) {
            qrCodeAdapter.update(styleOptions);
        }
    }, [styleOptions, qrCodeAdapter, isGenerated]);

    // Función para manejar el reset de estilos
    const handleResetStyles = async () => {
        await resetStyleOptions();
    };

    return (
        <div className={styles.displayWrapper}>
            <div className={styles.qrSection}>
                <div className={`${styles.qrContainer} ${isGenerated ? styles.qrContainerActive : ''}`}>
                    {isGenerated && (
                        <div ref={qrCodeRef} className={styles.qrCanvas} />
                    )}
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
                
                {/* Botón de reset justo debajo del QR container */}
                {isGenerated && activeView === 'personalizacion' && (
                    <button
                        className={styles.resetButton}
                        onClick={handleResetStyles}
                        title="Restablecer personalización"
                    >
                        <RotateCcw size={14} />
                        Restaurar
                    </button>
                )}
            </div>
        </div>
    );
};