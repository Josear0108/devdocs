import React, { useRef } from 'react';
import { useQRCodeStore } from '../../../store/useQRCodeStore';
import type { QRCodeStylingOptions } from '../../../config/qrConfig';
import { Upload } from 'react-feather';
// Importamos ambos módulos de estilos
import designStyles from './DesignOptionsPanel.module.css'; // Para reutilizar la estructura
import logoStyles from './LogoOptionsPanel.module.css'; // Para estilos propios

export const LogoOptionsPanel = () => {
    // La lógica para obtener datos del store no cambia
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);
    const isLoading = useQRCodeStore(state => state.isLoading);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tus manejadores de eventos no cambian
    const handleImageOptionChange = (key: keyof NonNullable<QRCodeStylingOptions['imageOptions']>, value: string | number | boolean) => {
        setStyleOption({ imageOptions: { ...styleOptions.imageOptions, [key]: value } });
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setStyleOption({ image: reader.result as string }); };
            reader.readAsDataURL(file);
        } else {
            setStyleOption({ image: undefined });
        }
    };

    return (
        // Usamos .panelGrid del módulo de diseño para mantener la misma estructura de columnas
        <div className={designStyles.panelGrid}>
            <div className={designStyles.section}>
                <h4 className={designStyles.sectionTitle}>Logo</h4>

                {/* Botón para subir archivo */}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    className={logoStyles.hiddenInput}
                    disabled={isLoading}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={logoStyles.uploadButton}
                    disabled={isLoading}
                >
                    <Upload size={16} />
                    {styleOptions.image ? 'Cambiar logo' : 'Subir logo'}
                </button>

                {/* Vista previa del logo */}
                {styleOptions.image && (
                    <div className={logoStyles.previewContainer}>
                        <img src={styleOptions.image} alt="Vista previa del logo" className={logoStyles.previewImage} />
                    </div>
                )}
            </div>

            <div className={designStyles.section}>
                <h4 className={designStyles.sectionTitle}>Opciones del Logo</h4>
                
                {/* Controles de tamaño y margen */}
                <div className={designStyles.formGroup}>
                    <label htmlFor="logo-size" className={designStyles.label}>Tamaño:</label>
                    <input
                        type="number" id="logo-size" min="0" max="1" step="0.05"
                        value={styleOptions.imageOptions?.imageSize ?? 0.3}
                        onChange={(e) => handleImageOptionChange('imageSize', parseFloat(e.target.value))}
                        className={designStyles.input} disabled={isLoading}
                    />
                </div>
                <div className={designStyles.formGroup}>
                    <label htmlFor="logo-margin" className={designStyles.label}>Margen (px):</label>
                    <input
                        type="number" id="logo-margin" min="0" step="1"
                        value={styleOptions.imageOptions?.margin ?? 0}
                        onChange={(e) => handleImageOptionChange('margin', parseInt(e.target.value, 10))}
                        className={designStyles.input} disabled={isLoading}
                    />
                </div>
                
                {/* Checkbox */}
                <div className={logoStyles.checkboxGroup}>
                    <input
                        type="checkbox" id="logo-hideBackgroundDots"
                        checked={styleOptions.imageOptions?.hideBackgroundDots ?? true}
                        onChange={(e) => handleImageOptionChange('hideBackgroundDots', e.target.checked)}
                        disabled={isLoading}
                    />
                    <label htmlFor="logo-hideBackgroundDots" className={designStyles.label}>Ocultar puntos detrás del logo</label>
                </div>
            </div>
        </div>
    );
};
