﻿import { motion } from "framer-motion"
import { ArrowRight } from 'react-feather';
// Importamos el nuevo módulo de estilos
import styles from './QRForm.module.css';
import { useQRCodeStore } from "../../store/useQRCodeStore";
import { VCardForm } from "../vcard/VCardForm";


export const QRForm = () => {
    // Tu lógica del store permanece intacta
    const option = useQRCodeStore(state => state.option);
    const text = useQRCodeStore(state => state.text);
    const setText = useQRCodeStore(state => state.setText);
    const generateQRCode = useQRCodeStore(state => state.generateQRCode);
    const isLoading = useQRCodeStore(state => state.isLoading);
    const error = useQRCodeStore(state => state.error);
    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }
    return (
        <motion.div className={styles.qrForm} variants={itemAnimation}>
            <h2 className={styles.title}>
                {option === 'URL' ? 'Información del QR' : 'Información del QR'}
            </h2>

            {option === 'URL' ? (
                <motion.div className={styles.formGroup} variants={itemAnimation}>
                    <label htmlFor="qr-input-url" className={styles.label}>
                        URL<span className={styles.labelAsterisk}>*</span>
                    </label>
                    <input
                        type="url"
                        id="qr-input-url"
                        className={styles.input}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://www.ejemplo.com"
                        disabled={isLoading}
                    />
                </motion.div>
            ) : (
                <VCardForm />
            )}

            <button
                className={styles.submitButton}
                onClick={generateQRCode}
                disabled={isLoading}
            >
                {isLoading ? 'Generando...' : 'Generar QR básico'}
                {!isLoading && <ArrowRight size={16} />}
            </button>

            {error && <p className={styles.error}>{error}</p>}
        </motion.div>
    );
};