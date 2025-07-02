import React from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import type { VCardData } from '../../types';
import { INITIAL_REQUIRED_FIELDS } from '../../config/constants';

import styles from './VCardForm.module.css';

export const VCardForm = () => {
    // Obtenemos el nuevo estado del store, usando shallow para evitar renders infinitos
    const vcardData = useQRCodeStore(state => state.vcardData);
    const setVcardData = useQRCodeStore(state => state.setVcardData);
    const isLoading = useQRCodeStore(state => state.isLoading);
    const vcardFieldErrors = useQRCodeStore(state => state.vcardFieldErrors);
    const hasAttemptedGeneration = useQRCodeStore(state => state.hasAttemptedGeneration);

    if (!vcardData) {
        return <div>Cargando...</div>;
    }

    const handleInputChange = (field: keyof VCardData, value: string) => {
        if ((field === 'mobile' || field === 'landline') && (value.length > 10 || !/^\d*$/.test(value))) {
            return;
        }
        setVcardData({ ...vcardData, [field]: value });
    };

    // Solo muestra errores si el usuario ya intentó generar el QR
    const isFieldError = (field: keyof VCardData) => {
        if (!hasAttemptedGeneration) {
            return false;
        }
        return (INITIAL_REQUIRED_FIELDS as Record<keyof VCardData, boolean>)[field] && (!vcardData[field] || vcardFieldErrors[field]);
    };

    // Helper para renderizar cada campo, simplificado para reflejar tu estructura original
    const renderFormField = (field: keyof VCardData, label: string, type: string = 'text', isRequired: boolean = false) => (
        <div className={styles.fieldGroup}>
            <label htmlFor={`vcard-${field}`} className={styles.label}>
                {label}
                {isRequired && <span className={styles.labelAsterisk}>*</span>}
            </label>
            <input
                id={`vcard-${field}`}
                name={field}
                type={type}
                className={`${styles.input} ${isFieldError(field) ? styles.inputError : ''}`}
                value={vcardData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={label}
                disabled={isLoading}
            />
        </div>
    );

    return (
        <div className={styles.vcardContainer}>
            {renderFormField('firstName', 'Nombre', 'text', true)}
            {renderFormField('lastName', 'Apellido', 'text', true)}
            {renderFormField('company', 'Empresa')}
            {renderFormField('email', 'Email', 'email', true)}
            {renderFormField('mobile', 'Teléfono móvil', 'tel', true)}
            {renderFormField('landline', 'Teléfono fijo', 'tel')}
            {renderFormField('address', 'Dirección')}
            {renderFormField('city', 'Ciudad')}
            {renderFormField('country', 'País')}
            {renderFormField('website', 'Sitio Web', 'url')}
        </div>
    );
};