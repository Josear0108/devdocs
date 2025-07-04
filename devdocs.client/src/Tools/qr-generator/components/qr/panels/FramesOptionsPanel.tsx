
import React from 'react';
import { motion } from "framer-motion";
import { useQRCodeStore } from '../../../store/useQRCodeStore';
import { QR_ERROR_CORRECTION_LEVELS } from '../../../config/qrConfig';
import type { ErrorCorrectionLevel } from 'qr-code-styling';
import styles from './FramesOptionsPanel.module.css';

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export const FramesOptionsPanel = () => {
    // 1. Conectamos el componente al store, igual que el panel de diseño
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);

    // 2. Traemos los mismos manejadores que usábamos antes
    const handleSubOptionChange = (section: 'qrOptions', key: string, value: string | number) => {
        setStyleOption({ [section]: { ...styleOptions[section], [key]: value } });
    };

    const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) { setStyleOption({ margin: value }); }
    };

    return (
        <motion.div className={styles.panelGrid} variants={itemAnimation}>
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Opciones Generales</h4>
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
                        type="number" id="qrMargin" min="0" step="1"
                        value={styleOptions.margin ?? 10}
                        onChange={handleMarginChange}
                        className={styles.input}
                    />
                </div>
            </div>
            {/* Podemos dejar un espacio para el futuro */}
            <div className={styles.section}>
                 <h4 className={styles.sectionTitle}>Marcos (Próximamente)</h4>
            </div>
        </motion.div>
    );
};