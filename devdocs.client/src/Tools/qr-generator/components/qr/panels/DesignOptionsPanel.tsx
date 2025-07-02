import React from 'react';
import { useQRCodeStore } from '../../../store/useQRCodeStore';
import {
    QR_DOTS_TYPES_ARRAY,
    QR_CORNER_SQUARE_TYPES_ARRAY,
    QR_CORNER_DOT_TYPES_ARRAY,
    QR_ERROR_CORRECTION_LEVELS
} from '../../../config/qrConfig';
import type { DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from 'qr-code-styling';
// Importamos el nuevo módulo de estilos dedicado
import styles from './DesignOptionsPanel.module.css';

export const DesignOptionsPanel = () => {
    // La lógica para obtener datos del store no cambia
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);
    // Tus manejadores de eventos no cambian
    const handleSubOptionChange = (
        section: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions' | 'qrOptions',
        key: string,
        value: string | number | boolean
    ) => {
        setStyleOption({
            [section]: {
                ...styleOptions[section],
                [key]: value
            }
        });
    };
    const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setStyleOption({ margin: value });
        }
    };
    return (
        <div className={styles.panelGrid}>
            {/* --- Puntos (Dots) --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Puntos</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="dotsColor" className={styles.label}>Color:</label>
                    <input
                        type="color"
                        id="dotsColor"
                        value={styleOptions.dotsOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('dotsOptions', 'color', e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dotsType" className={styles.label}>Tipo:</label>
                    <select
                        id="dotsType"
                        value={styleOptions.dotsOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('dotsOptions', 'type', e.target.value as DotType)}
                        className={styles.select}
                    >
                        {QR_DOTS_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Esquinas Cuadradas (Corners Square) --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Esquinas Externas</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="csColor" className={styles.label}>Color:</label>
                    <input
                        type="color"
                        id="csColor"
                        value={styleOptions.cornersSquareOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('cornersSquareOptions', 'color', e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="csType" className={styles.label}>Tipo:</label>
                    <select
                        id="csType"
                        value={styleOptions.cornersSquareOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('cornersSquareOptions', 'type', e.target.value as CornerSquareType)}
                        className={styles.select}
                    >
                        {QR_CORNER_SQUARE_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Esquinas Puntos (Corners Dot) --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Esquinas Internas</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="cdColor" className={styles.label}>Color:</label>
                    <input
                        type="color"
                        id="cdColor"
                        value={styleOptions.cornersDotOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('cornersDotOptions', 'color', e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cdType" className={styles.label}>Tipo:</label>
                    <select
                        id="cdType"
                        value={styleOptions.cornersDotOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('cornersDotOptions', 'type', e.target.value as CornerDotType)}
                        className={styles.select}
                    >
                        {QR_CORNER_DOT_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Fondo (Background) --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Fondo</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="bgColor" className={styles.label}>Color:</label>
                    <input
                        type="color"
                        id="bgColor"
                        value={styleOptions.backgroundOptions?.color ?? '#ffffff'}
                        onChange={(e) => handleSubOptionChange('backgroundOptions', 'color', e.target.value)}
                        className={styles.input}
                    />
                </div>
            </div>

            {/* --- Opciones Generales del QR --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Generales</h4>
                <div className={styles.formGroup}>
                    <label htmlFor="errorCorrectionLevel" className={styles.label}>Nivel de Corrección:</label>
                    <select
                        id="errorCorrectionLevel"
                        value={styleOptions.qrOptions?.errorCorrectionLevel ?? 'M'}
                        onChange={(e) => handleSubOptionChange('qrOptions', 'errorCorrectionLevel', e.target.value as ErrorCorrectionLevel)}
                        className={styles.select}
                    >
                        {QR_ERROR_CORRECTION_LEVELS.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="qrMargin" className={styles.label}>Margen (px):</label>
                    <input
                        type="number"
                        id="qrMargin"
                        min="0"
                        step="1"
                        value={styleOptions.margin ?? 10}
                        onChange={handleMarginChange}
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
    );
};