import React from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import { VCardForm } from '../vcard/VCardForm';
import styles from './QRForm.module.css';

export const QRForm = () => {
    // Obtenemos todo lo que necesitamos del store
    const option = useQRCodeStore(state => state.option);
    const text = useQRCodeStore(state => state.text);
    const setText = useQRCodeStore(state => state.setText);
    const generateQRCode = useQRCodeStore(state => state.generateQRCode);
    const isLoading = useQRCodeStore(state => state.isLoading);
    const error = useQRCodeStore(state => state.error);

    return (
        <div className={styles.qrForm}>
            <h2 className={styles.qrFormTitle}>
                {option === 'URL' ? 'Ingrese la URL' : 'Ingrese los datos de contacto'}
            </h2>

            {option === 'URL' ? (
                <div className={styles.qrFormUrlGroup}>
                    <div className={styles.qrFormFieldGroup}>
                        <input
                            type="url"
                            id="qr-input-url"
                            className={styles.qrFormInput}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="https://www.ejemplo.com"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            ) : (
                <VCardForm /> // VCardForm ahora también usa el store
            )}

            <button
                className={styles.qrFormSubmit}
                onClick={generateQRCode}
                disabled={isLoading}
            >
                {isLoading ? 'Generando...' : 'Generar QR'}
            </button>

            {error && <p className={styles.qrFormError}>{error}</p>}
        </div>
    );
};