// src/features/qr-generator/components/vcard/VCardForm.tsx
import React from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import type { VCardData } from '../../types';
import { INITIAL_REQUIRED_FIELDS } from '../../config/constants';

export const VCardForm = () => {
    const vcardData = useQRCodeStore(state => state.vcardData);
    const setVcardData = useQRCodeStore(state => state.setVcardData);
    const isLoading = useQRCodeStore(state => state.isLoading);
    const vcardFieldErrors = useQRCodeStore(state => state.vcardFieldErrors);

    const handleInputChange = (field: keyof VCardData, value: string) => {
        // Validación para solo números y máximo 10 dígitos
        if ((field === 'mobile' || field === 'landline') && !/^\d*$/.test(value)) {
            return; // No actualiza si no es número
        }
        if ((field === 'mobile' || field === 'landline') && value.length > 10) {
            return; // No actualiza si supera 10 dígitos
        }
        setVcardData({ ...vcardData, [field]: value });
    };

    // Helper para saber si un campo es requerido y está vacío
    const isFieldError = (field: keyof VCardData) =>
        (INITIAL_REQUIRED_FIELDS as Record<keyof VCardData, boolean>)[field] && (!vcardData[field] || vcardFieldErrors[field]);

    return (
        <div className="qr-form__vcard-container">
            {/* Nombre */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-firstName"
                    value={vcardData.firstName}
                    onChange={e => handleInputChange('firstName', e.target.value)}
                    placeholder=" "
                    className={`qr-form__input${isFieldError('firstName') ? ' qr-form__input--error' : ''}`}
                    disabled={isLoading}
                />
                <label htmlFor="vcard-firstName" className={`qr-form__label ${vcardData.firstName ? "qr-form__label--active" : ""}`}>
                    Nombre{INITIAL_REQUIRED_FIELDS.firstName && <span style={{ color: 'red' }}> *</span>}
                </label>
            </div>

            {/* Apellido */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-lastName"
                    value={vcardData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                    placeholder=" "
                    className={`qr-form__input${isFieldError('lastName') ? ' qr-form__input--error' : ''}`}
                    disabled={isLoading}
                />
                <label htmlFor="vcard-lastName" className={`qr-form__label ${vcardData.lastName ? "qr-form__label--active" : ""}`}>
                    Apellido{INITIAL_REQUIRED_FIELDS.lastName && <span style={{ color: 'red' }}> *</span>}
                </label>
            </div>

            {/* Empresa */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-company"
                    value={vcardData.company}
                    onChange={e => handleInputChange('company', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                />
                <label htmlFor="vcard-company" className={`qr-form__label ${vcardData.company ? "qr-form__label--active" : ""}`}>
                    Empresa
                </label>
            </div>

            {/* Email */}
            <div className="qr-form__field-group">
                <input
                    type="email"
                    id="vcard-email"
                    value={vcardData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder=" "
                    className={`qr-form__input${isFieldError('email') ? ' qr-form__input--error' : ''}`}
                    disabled={isLoading}
                />
                <label htmlFor="vcard-email" className={`qr-form__label ${vcardData.email ? "qr-form__label--active" : ""}`}>
                    Email{INITIAL_REQUIRED_FIELDS.email && <span style={{ color: 'red' }}> *</span>}
                </label>
            </div>

            {/* Teléfono móvil */}
            <div className="qr-form__field-group">
                <input
                    type="tel"
                    id="vcard-mobile"
                    value={vcardData.mobile}
                    onChange={e => handleInputChange('mobile', e.target.value)}
                    placeholder=" "
                    className={`qr-form__input${isFieldError('mobile') ? ' qr-form__input--error' : ''}`}
                    disabled={isLoading}
                    maxLength={10}
                />
                <label htmlFor="vcard-mobile" className={`qr-form__label ${vcardData.mobile ? "qr-form__label--active" : ""}`}>
                    Teléfono móvil{INITIAL_REQUIRED_FIELDS.mobile && <span style={{ color: 'red' }}> *</span>}
                </label>
            </div>

            {/* Teléfono fijo */}
            <div className="qr-form__field-group">
                <input
                    type="tel"
                    id="vcard-landline"
                    value={vcardData.landline}
                    onChange={e => handleInputChange('landline', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                    maxLength={10}
                />
                <label htmlFor="vcard-landline" className={`qr-form__label ${vcardData.landline ? "qr-form__label--active" : ""}`}>
                    Teléfono fijo
                </label>
            </div>

            {/* Dirección */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-address"
                    value={vcardData.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                />
                <label htmlFor="vcard-address" className={`qr-form__label ${vcardData.address ? "qr-form__label--active" : ""}`}>
                    Dirección
                </label>
            </div>

            {/* Ciudad */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-city"
                    value={vcardData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                />
                <label htmlFor="vcard-city" className={`qr-form__label ${vcardData.city ? "qr-form__label--active" : ""}`}>
                    Ciudad
                </label>
            </div>

            {/* País */}
            <div className="qr-form__field-group">
                <input
                    type="text"
                    id="vcard-country"
                    value={vcardData.country}
                    onChange={e => handleInputChange('country', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                />
                <label htmlFor="vcard-country" className={`qr-form__label ${vcardData.country ? "qr-form__label--active" : ""}`}>
                    País
                </label>
            </div>

            {/* Sitio Web */}
            <div className="qr-form__field-group">
                <input
                    type="url"
                    id="vcard-website"
                    value={vcardData.website}
                    onChange={e => handleInputChange('website', e.target.value)}
                    placeholder=" "
                    className="qr-form__input"
                    disabled={isLoading}
                />
                <label htmlFor="vcard-website" className={`qr-form__label ${vcardData.website ? "qr-form__label--active" : ""}`}>
                    Sitio Web
                </label>
            </div>
        </div>
    );
};